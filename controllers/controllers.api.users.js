/*
  * auth
*/
const jwt = require('jsonwebtoken')
const passport = require('passport')
const decode = require('jwt-decode')

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
  * end point : /api/users/:id
  * method : PUT
*/
let editOneUser = (req, res) => {
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
          email: "test_new_update@gmail.com",
          photo_URL: "new_test_photo.png",
          verify: true
        }

        one_data.email= new_data.email
        one_data.password= new_data.password
        one_data.photo_URL= new_data.photo_URL
        one_data.verify= new_data.verify
        one_data.save()

        res.json(one_data)
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
                      verify: user_forgot.verify
                  }, process.env.SECRET_TOKEN, { expiresIn: 60*60 }) // expire in 1 hour

          var transport = nodemailer.createTransport(smtpTransport({
            host: 'email-smtp.us-east-1.amazonaws.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.AWS_SES_USERNAME,
              pass: process.env.AWS_SES_PASSWORD
            }
          }));

        var mailOptions = {
          from: 'admin <kenduigraha@yahoo.com>', // sender address
          to: req.body.email, // list of receivers
          subject: 'Forgot password verification', // Subject line
          // text: 'Hello world', // plaintext body
          html: `<a href="http://localhost:8080/api/auth/verification/forgot/${token}" target="_blank"></a>` // html body
        };

        transport.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          }
          else{
            console.log('Message sent: ' + info.response);
            res.json(user_forgot)
          }
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
  deleteOneUser
}
