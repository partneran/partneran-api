/*
  * auth
*/
const jwt = require('jsonwebtoken')
const passport = require('passport')
const jwt_decode = require('jwt-decode')

/*
  * email
*/
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');
// const ses = require('nodemailer-ses-transport')
/*
  * Models
*/
const models = require ('../models')
const Users = models.Users

const dotenv = require('dotenv')
dotenv.load()

/*
  * testing register enw user without send email
*/
let testingSignUp = (req, res, next) => {
  Users.register({
    userId: req.body.userId,
    email: req.body.email,
    photo_URL: req.body.photo_URL,
    verify: false,
    name: req.body.name
  },req.body.password, (err, new_user) => {
    if(err){
      console.log('err', err);
      res.status(400).json(err)
    }else {
      res.json(new_user)
    }
  })
}

/*
  * end point : /api/auth/signup
  * method : POST
*/
let signUpUser = (req, res, next) => {
  var token = jwt.sign({
                sub: user.id,
                name: req.body.name,
                email: req.body.email,
                photo_URL: req.body.photo_URL,
                verify: false
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
    subject: 'New User registration verification', // Subject line
    // text: 'Hello world', // plaintext body
    html: `<a href="http://localhost:8080/api/auth/verification/${token}" target="_blank"></a>` // html body
  };

transport.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  }
  else{
    console.log('Message sent: ' + info.response);
    Users.register({
      userId: req.body.userId,
      email: req.body.email,
      name: req.body.name,
      photo_URL: req.body.photoURL,
      verify: false
    },req.body.password, (err, new_user) => {
      if(err){
        console.log(err);
        res.status(400).json(err)
      }else {
        // res.json(new_user)
        passport.authenticate('local', {}, (err, user, info) => {
          if(err){
            console.log(`error`);
            console.log(err);
            return res.status(400).json(err)
          }else{
            if(user != false){
              // console.log(user);
              return res.status(200).json({
                token: jwt.sign({
                  sub: user.id,
                  name: user.name,
                  email: user.email,
                  photo_URL: user.photo_URL
                }, process.env.SECRET_TOKEN, { expiresIn: 60*60 })
              })
            }else{
              console.log(`info`);
              return res.status(400).json(info)
            }
          }
        })(req, res, next)
      }
    })
  }
});
}

/*
  * end point : /api/auth/login
  * method : POST
*/
let loginUser = (req, res, next) => {
  passport.authenticate('local', {}, (err, user, info) => {
    if(err){
      console.log(`error`);
      console.log(err);
      return res.status(400).json(err)
    }else{
      if(user != false){
        // console.log(user);
        return res.status(200).json({
          token: jwt.sign({
            sub: user.id,
            email: user.email,
            photo_URL: user.photo_URL
          }, process.env.SECRET_TOKEN, { expiresIn: 60*60 })
        })
      }else{
        console.log(`info`);
        return res.status(400).json(info)
      }
    }
  })(req, res, next)
}

/*
  * end point : /api/auth/verification/:token
  * method : getOneUser
*/
let verificationNewUser = (req, res) => {
  var decoded = jwt_decode(req.params.token)
  // console.log(decoded);

  Users
    .findOne({
      where: {
        id: decoded.sub
      }
    })
    .then((one_data, err) => {
      if(err){
        console.log("err", err);
        res.json(err)
      }else{
        // console.log(one_data);
        one_data.verify= true
        one_data.save()
        res.json(one_data)
      }
    })
}

/*
  * end point : /api/auth/verification/forgot/:token
  * method : GET
*/
let verificationForgotPassword = (req, res) => {
  var decoded = jwt_decode(req.params.token)
  // console.log(decoded);
  Users
    .findOne({
      where: {
        id: decoded.sub
      }
    })
    .then((one_data, err) => {
      if(err){
        console.log("err", err);
        res.json(err)
      }else{
        // console.log(one_data);
        res.json(one_data)
      }
    })
}

module.exports = {
  loginUser,
  signUpUser,
  verificationNewUser,
  verificationForgotPassword,
  testingSignUp
}
