const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHTTP)
const User = require('../../models/models.api.users')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.load()
const jwt = require('jsonwebtoken')
const passport = require('passport')

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//  test model database users
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/*
  * end point : /api/auth/signup
  * email verification end point : /api/auth/verification/:token
*/
describe('Register new user', () => {
  it('should create new user in database and send email verification with token', (done) => {
    var token = jwt.sign({
                  userId: 1,
                  email: "kenduigraha@yahoo.com",
                  photo_URL: 'test_photo.png',
                  verify: false
              }, process.env.SECRET_TOKEN, { expiresIn: 60*60 }) // expire in 1 hour

    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.EMAIL_GMAIL,
          pass: process.env.PASS_GMAIL
      },
      logger: false, // log to console
      debug: false // include SMTP traffic in the logs
    });

    var mailOptions = {
        from: '"Ken Duigraha Putra ?" <kendui94@yahoo.com>', // sender address
        to: `kenduigraha@yahoo.com`, // list of receivers
        subject: 'Test Subject Register', // Subject line
        text: 'Please click this link to verify your email', // plaintext body
        html: `<a href="http://localhost:3000/api/auth/verification/${token}" alt="_target">click this link to verify</a>` // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          // return res.json(error)
          expect(error).to.be.an('error')
          done()
      }
      console.log('Message sent: ' + info.response);

      Users.register({
        userId: 1,
        email: "kenduigraha@yahoo.com",
        photo_URL: 'test_photo.png',
        verify: false
      },'123', (err, new_user) => {

        if(err){
          console.log(err);
          // res.status(400).json(err)
          expect(err).to.be.an('error')
          done()
        }else {
          // console.log(new_user.dataValues);
          // res.json(new_user)
          res.should.be.json
          res.should.have.status(200)

          expect(new_user).to.be.an('object')
          expect(new_user).to.have.ownProperty('userId')
          expect(new_user).to.have.ownProperty('myhash')
          expect(new_user).to.have.ownProperty('mysalt')
          expect(new_user).to.have.ownProperty('email')
          expect(new_user).to.have.ownProperty('photo_URL')
          expect(new_user).to.have.ownProperty('verify')

          new_user.userId.should.equal(1)
          new_user.email.should.equal("kenduigraha@yahoo.com")
          new_user.photo_URL.should.equal("test_photo.png")
          new_user.verify.should.equal(false)

          done()
        }
      })
  });

  })
})

/*
  * End Point : /api/users/login
*/
describe('Login a user', () => {
  it('should login a user and generate token with user\'s information',(done) => {
    passport.authenticate('local', {}, (err, user, info) => {
      if(err){
        // return res.status(400).json(err)
        done()
      }else{
        if(user != false){
          // console.log(user);
          var token = {
            token: jwt.sign({
              sub: user.userId,
              email: user.email,
              photo_URL: user.photo_URL,
              verify: user.verify
            }, process.env.SECRET_TOKEN, { expiresIn: 60*60 })
          }

          res.should.be.json
          res.should.have.status(200)

          expect(new_user).to.be.an('object')
          expect(new_user).to.have.ownProperty('userId')
          expect(new_user).to.have.ownProperty('myhash')
          expect(new_user).to.have.ownProperty('mysalt')
          expect(new_user).to.have.ownProperty('email')
          expect(new_user).to.have.ownProperty('photo_URL')
          expect(new_user).to.have.ownProperty('verify')

          new_user.userId.should.equal(1)
          new_user.email.should.equal("kenduigraha@yahoo.com")
          new_user.photo_URL.should.equal("test_photo.png")
          new_user.verify.should.equal(false)

          done()
          // return res.status(200).json()
        }else{
          // return res.status(400).json(info)

          done()
        }
      }
    })
  })
})
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//  test end point user
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
