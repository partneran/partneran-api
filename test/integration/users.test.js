/*
  * testing
*/
const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHTTP)

/*
  * email
*/
const nodemailer = require('nodemailer')

/*
  * .env
*/
const dotenv = require('dotenv')
dotenv.load()

/*
  * auth
*/
const jwt = require('jsonwebtoken')
const passport = require('passport')
const decode = require('jwt-decode')

/*
  * Models
*/
const models = require ('../../models')
const Users = models.Users

/*
  * URL
*/
const URL = 'http://localhost:8080'

/* ================================================ */
/*                     Testing                       */
/* ================================================ */

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//  test model database users
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/*
  * test create a user
*/
describe('Register new user', () => {
  it('should create new user in database with hardcode data', (done) => {
    Users.register({
      userId: 1,
      email: "kenduigraha@yahoo.com",
      photo_URL: 'test_photo.png',
      verify: false
    },'123', (err, new_user) => {
      if(err){
        console.log(err);
        // res.status(400).json(err)
        // expect(err).to.throw('error')
        done()
      }else {
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
  })
})

/*
  * test get a user
  * end point : /api/users/:id
*/
describe('Get one user', () => {
  it('should show one user\'s data', (done) => {
    Users
      .findAll()
      .then((all_users, err) => {
        if(err){
          console.log(err)
          done()
        }else{
          Users
            .findOne({
              where: {
                id: all_users[0].id
              }
            })
            .then((one_user, err) => {
              if(err){
                console.log(err)
                done()
              }else{
                expect(one_user.dataValues).to.be.an('object')
                expect(one_user.dataValues).to.have.ownProperty('userId')
                expect(one_user.dataValues).to.have.ownProperty('myhash')
                expect(one_user.dataValues).to.have.ownProperty('mysalt')
                expect(one_user.dataValues).to.have.ownProperty('email')
                expect(one_user.dataValues).to.have.ownProperty('photo_URL')
                expect(one_user.dataValues).to.have.ownProperty('verify')

                one_user.userId.should.equal(all_users[0].userId)
                one_user.email.should.equal(all_users[0].email)
                one_user.photo_URL.should.equal(all_users[0].photo_URL)
                one_user.verify.should.equal(all_users[0].verify)

                done()
              }
            })
        }
      })
  })
})

/*
  * test edit a user
  * end point : /api/users/:id
*/
describe.only('Edit one user', () => {
  it('should update one user\'s data', (done) => {
    Users
      .findAll()
      .then((all_users) => {

        Users
          .findOne({
              where: {
                id: all_users[0].id
              }
          })
          .then((one_data, err) => {
            if(err){
              console.log("err", err);
              done()
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

              expect(one_data.dataValues).to.be.an('object')
              expect(one_data.dataValues).to.have.ownProperty('userId')
              expect(one_data.dataValues).to.have.ownProperty('myhash')
              expect(one_data.dataValues).to.have.ownProperty('mysalt')
              expect(one_data.dataValues).to.have.ownProperty('email')
              expect(one_data.dataValues).to.have.ownProperty('photo_URL')
              expect(one_data.dataValues).to.have.ownProperty('verify')

              one_data.userId.should.equal(all_users[0].userId)
              one_data.email.should.equal(new_data.email)
              one_data.photo_URL.should.equal(new_data.photo_URL)
              one_data.verify.should.equal(new_data.verify)

              done()
            }
          })

      })
  })
})

/*
  * test change a user's password
  * end point : /api/auth/forgot/:token
*/
describe('Change Password', () => {
  it('should change one user\'s password', (done) => {
    Users
      .findAll()
      .then((all_users) => {
        Users
          .setResetPasswordKey(all_users[0].email, (err, data) => {
            if(err){
              console.log(err);
              done()
            }else{
              // console.log(data);

            Users
              .resetPassword(all_users[0].email, "test_new_password", data.key, (err, user_new_password) => {
                if(err){
                  console.log("error",err);
                  done()
                }else{
                  // console.log(user_new_password.dataValues);

                  expect(user_new_password.dataValues).to.be.an('object')
                  expect(user_new_password.dataValues).to.have.ownProperty('userId')
                  expect(user_new_password.dataValues).to.have.ownProperty('myhash')
                  expect(user_new_password.dataValues).to.have.ownProperty('mysalt')
                  expect(user_new_password.dataValues).to.have.ownProperty('email')
                  expect(user_new_password.dataValues).to.have.ownProperty('photo_URL')
                  expect(user_new_password.dataValues).to.have.ownProperty('verify')

                  user_new_password.userId.should.equal(all_users[0].userId)
                  user_new_password.email.should.equal(all_users[0].email)
                  user_new_password.photo_URL.should.equal(all_users[0].photo_URL)
                  user_new_password.verify.should.equal(all_users[0].verify)

                  done()
                }
              })
            }
          })

      })
  })
})

/*
  * test delete a user
  * end point : /api/users/:id
*/
describe('Delete one user', () => {
  it('should delete one user', (done) => {
    Users
      .findAll()
      .then((all_users, err) => {
        if(err){
          console.log(err)
          done()
        }else{
          Users
            .destroy({
              where: {
                id: all_users[0].id
              }
            })
            .then((deleted_data, err) => {
              if(err){
                console.log(err)
                done()
              }else{
                expect(deleted_data).to.be.equal(1)

                done()
              }
            })
        }
      })
  })
})


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//  test end point user
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/*
  * testing signup a user
  * method : POST
  * End Point : /api/auth/signup
*/
describe('Register new user using API End Point', () => {
  it('should register a user, generate token with user\'s information and send email verification',(done) => {
    var new_user = {
      email: "email_testing@yahoo.com",
      password: "password",
      photo_URL: 'test_photo.png'
    }
    chai
      .request(URL)
      .post('/api/auth/signup')
      .send(new_user)
      .end((err, res) => {
        if(err){
          // console.log(err)
          done()
        }else{
          res.should.be.json
          res.should.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body).to.have.ownProperty('token')

          done()
        }
      })
  })
})

/*
  * testing email verification email a user
  * method : POST
  * End Point : /api/auth/verification/:token
*/
describe('Email verification user', () => {
  it('should get a new registered user\'s token', (done) => {
    chai
      .request(URL)
      .get('/api/auth/verification')
      .end((err, res) => {
        if(err){
          console.log(err);
          done()
        }else{
          res.should.be.json
          res.should.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body).to.have.ownProperty('token')
          done()
        }
      })
  })
})

/*
  * testing login a user
  * End Point : /api/auth/login
*/
describe('Login a user', () => {
  it('should login a user, generate token with user\'s information',(done) => {
    var login_user = {
      email: "email_testing@yahoo.com",
      password: "password"
    }
    chai
      .request(URL)
      .post('/api/auth/login')
      .send(login_user)
      .end((err, res) => {
        if(err){
          // console.log(err)
          done()
        }else{
          res.should.be.json
          res.should.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body).to.have.ownProperty('token')

          done()
        }
      })
  })
})

/*
  * testing forgot password, user submit email
  * End Point : /api/users/forgot
*/
describe('Submit form email in forgot password', () => {
  it('should get forgoten data users by email', (done) => {
    chai
      .request(URL)
      .get('/api/users/forgot')
      .end((err, res) => {
        if(err){
          console.log(err);
          done()
        }else{
          res.should.be.json
          res.should.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body).to.have.ownProperty('token')
          done()
        }
      })
  })
})

/*
  * testing forgot password, user click email verification
  * End Point : /api/auth/verification/forgot/:token
*/
describe('User verification from their email', () => {
  it('should get forgoten data user\'s token', (done) => {
    chai
      .request(URL)
      .get('/api/auth/verification/forgot/')
      .end((err, res) => {
        if(err){
          console.log(err);
          done()
        }else{
          res.should.be.json
          res.should.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body).to.have.ownProperty('token')
          done()
        }
      })
  })
})

/*
  * testing forgot password, user submit email
  * End Point : /api/users/password
*/
describe('Submit form new password', () => {
  it('should update password & get data user', (done) => {
    chai
      .request(URL)
      .get('/api/users/forgot')
      .end((err, res) => {
        if(err){
          console.log(err);
          done()
        }else{
          res.should.be.json
          res.should.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body).to.have.ownProperty('token')
          done()
        }
      })
  })
})

/*

buat controller regis user
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
    html: `<a href="http://localhost:8080/api/auth/verification/${token}" alt="_target">click this link to verify</a>` // html body
};

transporter.sendMail(mailOptions, function(error, info){
  if(error){
      console.log(`error`);
      console.log(error);
      // return res.json(error)
      // expect(error).to.be.an('error')
      return done()
  }else{
    console.log('Message sent: ' + info.response);
    done()
  }

});

*/
