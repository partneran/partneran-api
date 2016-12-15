/*
  * auth
*/
const jwt = require('jsonwebtoken')
const passport = require('passport')
const decode = require('jwt-decode')
const ImgUpload = require('../helpers/ImgUploader')

/*
  * Models
*/
const models = require ('../models')
const Users = models.Users

/*
  * email
*/
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');

/*
  * upload photo using multer
*/
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, `public/photos`)
  },
  filename: function (req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage }).single('photo_URL')

/*
  * end point : /api/users/:id
  * method : GET
*/
let getOneUser = (req, res) => {
  Users
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then((one_user, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        res.json(one_user)
      }
    })
}

/*
  * end point : /api/users/testedit/:id
  * method : PUT
*/
let testingEditOneUser = (req, res) => {
  Users
    .findOne({
        where: {
          id: req.params.id
        }
    })
    .then((one_data, err) => {
      if(err){
        console.log("err", err);
        res.json(err)
      }else{
        var new_data = {
          name: req.body.name,
          email: req.body.email,
          photo_URL: req.body.photo_URL,
          short_bio: req.body.short_bio
        }

        one_data.name = new_data.name
        one_data.email = new_data.email
        one_data.photo_URL = new_data.photo_URL
        one_data.short_bio = new_data.short_bio
        one_data.save()


        res.json(one_data)
      }
    })
}

/*
  * end point : /api/users/:id
  * method : PUT
  * add field photo_URL & short_bio, edit name, email
*/
let editOneUser = (req, res) => {
  console.log('ini ----> ' + JSON.stringify(req.body));
  upload(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.json('Error uploading file!', err)
      }else if (req.body) {
        Users
          .findOne({
              where: {
                id: req.params.id
              }
          })
          .then((one_data, err) => {
            if(err){
              console.log("err", err);
              res.json(err)
            }else{
              var new_data = {
                name: req.body.name,
                email: req.body.email,
                photo_URL: req.body.photo_URL,
                short_bio: req.body.short_bio
              }

              one_data.name = new_data.name
              one_data.email = new_data.email
              one_data.photo_URL = new_data.photo_URL
              one_data.short_bio = new_data.short_bio
              one_data.save()
              console.log(one_data);

              var token = jwt.sign({
                            sub: one_data.id,
                            name: one_data.name,
                            email: one_data.email,
                            photo_URL: one_data.photo_URL,
                            short_bio: one_data.short_bio,
                            verify: one_data.verify,
                            isSuper: one_data.isSuper,
                            status: one_data.status
                        }, process.env.SECRET_TOKEN, { expiresIn: 60*60 })
                        console.log('token: ', token);
              res.json(token)
            }
          })
      }else {
        res.send('Error no file!')
      }
    })
}

/*
  * end point : /api/users/:id
  * method : DELETE
*/
let deleteOneUser = (req, res) => {
  Users
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then((deleted_data, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        res.json(deleted_data)
      }
    })
}

/*
  * end point : /api/users/forgot
  * method : POST
*/
let submitEmailForgotPassword = (req, res) => {
  Users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user_forgot, err) => {
      if(err) {
        console.log('error', err);
        res.json(err)
      }else{
        // console.log(user_forgot);
        // res.json(user_forgot)
        var token = jwt.sign({
                      sub: user_forgot.id,
                      name: user_forgot.name,
                      email: user_forgot.email,
                      photo_URL: user_forgot.photo_URL,
                      verify: user_forgot.verify,
                      isSuper: user_forgot.isSuper,
                      status: user_forgot.status
                  }, process.env.SECRET_TOKEN, { expiresIn: 60*60 }) // expire in 1 hour
        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: {
            personalizations: [
              {
                to: [
                  {
                    email: req.body.email,
                  },
                ],
                subject: 'Hello '+user_forgot.name+'.Email Verification to Change Your Password',
              },
            ],
            from: {
              email: 'no-reply@partneran.net',
            },
            content: [
              {
                type: 'text/html',
                value: `Hello ${user_forgot.name}, This email was sent from <a href="http://partneran.net" target="_blank">partneran.net</a><br /><br />
                Click this link below to change new password:<br /> <a href="http://localhost:3000/verify-password/${token}" target="_blank">Change Your Password</a>`
              },
            ],
          },
        });
        sg.API(request)
        .then(response => {
          // console.log(response.statusCode);
          // console.log(response.body);
          // console.log(response.headers);
          res.json(response)
        })
        .catch(error => {
          //error is an instance of SendGridError
          //The full response is attached to error.response
          // console.log(error.response.statusCode);
          res.json(error)
        });

      }
    })
}

/*
  * testing submit new password withuot send email
*/
let testSubmitNewPasswordForgotPassword = (req, res) => {
  Users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user_forgot, err) => {
      if(err) {
        console.log(err);
        res.json(err)
      }else{
        // console.log(user_forgot);
        res.json(user_forgot)
      }
    })
}

/*
  * end point : /api/users/password
  * method : POST
*/
let submitNewPasswordForgotPassword = (req, res) => {
  Users
    .setResetPasswordKey(req.body.email, (err, data) => {
      if(err){
        console.log(err);
        done()
      }else{
        Users
          .resetPassword(req.body.email, req.body.new_password, data.key, (err, user_new_password) => {
            if(err){
              console.log("error",err);
              res.json(err)
            }else{
              res.json(user_new_password)
            }
          })
      }
    })
}

module.exports = {
  getOneUser,
  editOneUser,
  deleteOneUser,
  submitEmailForgotPassword,
  submitNewPasswordForgotPassword,
  testSubmitNewPasswordForgotPassword,
  deleteOneUser,
  testingEditOneUser
}
