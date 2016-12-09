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

/*
  * Models
*/
const models = require ('../../models')
const Users = models.Users

/* ================================================ */
/*                     Testing                       */
/* ================================================ */

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//  test model database users
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/*
  * test create a user
  * end point : /api/auth/signup
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
  * test update a user
  * end point : /api/users/:id
*/
describe('Update one user', () => {
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
              console.log(err);
              done()
            }else{
              var new_data = {
                email: "kendui94@gmail.com",
                photo_URL: "new_test_photo.png",
                verify: true
              }

              one_data.email= new_data.email
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
  * End Point : /api/users/login
*/
describe.skip('Login a user', () => {
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



/*

buat controller regis uservar token = jwt.sign({
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
