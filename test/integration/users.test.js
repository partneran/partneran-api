/*
  * testing
*/
const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHTTP)

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


before('should delete all users from database', (done) => {
  Users
    .destroy({
      where: {}
    })
    .then((data) => {
      done()
    })
})

after('should delete all users from database', (done) => {
  Users
    .destroy({
      where: {}
    })
    .then((data) => {
      done()
    })
})

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
      name: "Ken Duigraha Putra",
      email: "kenduigraha@yahoo.com",
      // photo_URL: 'test_photo.png',
      verify: false
    },'123', (err, new_user) => {
      expect(new_user.dataValues).to.be.an('object')
      expect(new_user.dataValues).to.have.ownProperty('userId')
      expect(new_user.dataValues).to.have.ownProperty('myhash')
      expect(new_user.dataValues).to.have.ownProperty('mysalt')
      expect(new_user.dataValues).to.have.ownProperty('email')
      expect(new_user.dataValues).to.have.ownProperty('name')
      expect(new_user.dataValues).to.have.ownProperty('photo_URL')
      expect(new_user.dataValues).to.have.ownProperty('short_bio')
      expect(new_user.dataValues).to.have.ownProperty('verify')

      new_user.userId.should.equal(1)
      new_user.name.should.equal("Ken Duigraha Putra")
      new_user.email.should.equal("kenduigraha@yahoo.com")
      // new_user.photo_URL.should.equal("test_photo.png")
      new_user.verify.should.equal(false)

      done()
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
        Users
          .findOne({
            where: {
              id: all_users[0].id
            }
          })
          .then((one_user, err) => {
            expect(one_user.dataValues).to.be.an('object')
            expect(one_user.dataValues).to.have.ownProperty('userId')
            expect(one_user.dataValues).to.have.ownProperty('myhash')
            expect(one_user.dataValues).to.have.ownProperty('mysalt')
            expect(one_user.dataValues).to.have.ownProperty('email')
            expect(one_user.dataValues).to.have.ownProperty('photo_URL')
            expect(one_user.dataValues).to.have.ownProperty('short_bio')
            expect(one_user.dataValues).to.have.ownProperty('verify')

            one_user.userId.should.equal(all_users[0].userId)
            one_user.email.should.equal(all_users[0].email)
            // one_user.photo_URL.should.equal(all_users[0].photo_URL)
            one_user.verify.should.equal(all_users[0].verify)

            done()
          })
      })
  })
})

/*
  * test edit a user
  * end point : /api/users/:id
*/
describe('Edit one user', () => {
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
            var new_data = {
              email: "test_new_update@gmail.com",
              photo_URL: "new_test_photo.png",
              name: "new name",
              short_bio: "I've cool idea, let's be my partner",
              verify: true
            }

            one_data.email = new_data.email
            one_data.photo_URL = new_data.photo_URL
            one_data.name = new_data.name
            one_data.short_bio = new_data.short_bio
            one_data.verify = new_data.verify
            one_data.save()

            expect(one_data.dataValues).to.be.an('object')
            expect(one_data.dataValues).to.have.ownProperty('userId')
            expect(one_data.dataValues).to.have.ownProperty('myhash')
            expect(one_data.dataValues).to.have.ownProperty('mysalt')
            expect(one_data.dataValues).to.have.ownProperty('email')
            expect(one_data.dataValues).to.have.ownProperty('photo_URL')
            expect(one_data.dataValues).to.have.ownProperty('short_bio')
            expect(one_data.dataValues).to.have.ownProperty('verify')

            one_data.userId.should.equal(all_users[0].userId)
            one_data.email.should.equal(new_data.email)
            one_data.photo_URL.should.equal(new_data.photo_URL)
            one_data.name.should.equal(new_data.name)
            one_data.short_bio.should.equal(new_data.short_bio)
            one_data.verify.should.equal(new_data.verify)

            done()
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
            Users
              .resetPassword(all_users[0].email, "test_new_password", data.key, (err, user_new_password) => {
                expect(user_new_password.dataValues).to.be.an('object')
                expect(user_new_password.dataValues).to.have.ownProperty('userId')
                expect(user_new_password.dataValues).to.have.ownProperty('myhash')
                expect(user_new_password.dataValues).to.have.ownProperty('mysalt')
                expect(user_new_password.dataValues).to.have.ownProperty('email')
                expect(user_new_password.dataValues).to.have.ownProperty('photo_URL')
                expect(user_new_password.dataValues).to.have.ownProperty('short_bio')
                expect(user_new_password.dataValues).to.have.ownProperty('verify')

                user_new_password.userId.should.equal(all_users[0].userId)
                user_new_password.name.should.equal(all_users[0].name)
                user_new_password.email.should.equal(all_users[0].email)
                user_new_password.photo_URL.should.equal(all_users[0].photo_URL)
                user_new_password.short_bio.should.equal(all_users[0].short_bio)
                user_new_password.verify.should.equal(all_users[0].verify)

                done()
              })
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
        Users
          .destroy({
            where: {
              id: all_users[0].id
            }
          })
          .then((deleted_data, err) => {
            expect(deleted_data).to.be.equal(1)

            done()
          })
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
  beforeEach('should delete all users from database', (done) => {
    Users
      .destroy({
        where: {}
      })
      .then((data) => {
        done()
      })
  })

  it('should register a user, generate token with user\'s information and send email verification', (done) => {
    var new_user = {
      userId: 1,
      name: "Ken Duigraha Putra",
      email: "kenduigraha@yahoo.com",
      password: "password",
      // photo_URL: 'test_photo.png'
    }
    chai.request(URL)
      .post('/api/auth/test/signup')
      .send(new_user)
      .end((err, res) => {
        res.should.be.json
        res.should.have.status(200)

        expect(res.body).to.be.an('object')
        expect(res.body).to.have.ownProperty('userId')
        expect(res.body).to.have.ownProperty('myhash')
        expect(res.body).to.have.ownProperty('mysalt')
        expect(res.body).to.have.ownProperty('email')
        expect(res.body).to.have.ownProperty('name')
        expect(res.body).to.have.ownProperty('photo_URL')
        expect(res.body).to.have.ownProperty('short_bio')
        expect(res.body).to.have.ownProperty('verify')

        res.body.userId.should.equal(new_user.userId)
        res.body.name.should.equal(new_user.name)
        res.body.email.should.equal(new_user.email)
        // res.body.photo_URL.should.equal(new_user.photo_URL)
        res.body.verify.should.equal(false)

        done()
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
    Users
      .findAll()
      .then((all_users) => {
        var token = jwt.sign({
                      sub: all_users[0].id,
                      email: all_users[0].email,
                      photo_URL: all_users[0].photo_URL,
                      verify: false
                  }, process.env.SECRET_TOKEN, { expiresIn: 60*60 })

        chai
          .request(URL)
          .get('/api/auth/verification/'+token)
          .end((err, res) => {
            // console.log(res.body);
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.an('object')
            expect(res.body).to.have.ownProperty('userId')
            expect(res.body).to.have.ownProperty('myhash')
            expect(res.body).to.have.ownProperty('mysalt')
            expect(res.body).to.have.ownProperty('email')
            expect(res.body).to.have.ownProperty('name')
            expect(res.body).to.have.ownProperty('photo_URL')
            expect(res.body).to.have.ownProperty('short_bio')
            expect(res.body).to.have.ownProperty('verify')

            res.body.userId.should.equal(all_users[0].userId)
            res.body.name.should.equal(all_users[0].name)
            res.body.email.should.equal(all_users[0].email)
            // res.body.photo_URL.should.equal(all_users[0].photo_URL)
            res.body.verify.should.equal(true)

            done()
          })
      })
  })
})

/*
  * testing login a user
  * End Point : /api/auth/login
*/
describe('Login a user', () => {
  it('should login a user, generate token with user\'s information',(done) => {
    Users
      .findAll()
      .then((all_users) => {
        chai
          .request(URL)
          .post('/api/auth/login')
          .send({
            email: all_users[0].email,
            password: "password"
          })
          .end((err, res) => {
            // console.log(res.body);
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.an('object')
            expect(res.body).to.have.ownProperty('token')

            done()
          })
      })
  })
})

/*
  * testing forgot password, user submit email
  * End Point : /api/users/test/forgot
*/
describe('Submit form email in forgot password', () => {
  it('should get forgoten data users by email', (done) => {
    Users
      .findAll()
      .then((all_users) => {
        chai
          .request(URL)
          .post('/api/users/test/forgot')
          .send({
            email: all_users[0].email
          })
          .end((err, res) => {
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.an('object')
            expect(res.body).to.have.ownProperty('userId')
            expect(res.body).to.have.ownProperty('myhash')
            expect(res.body).to.have.ownProperty('mysalt')
            expect(res.body).to.have.ownProperty('email')
            expect(res.body).to.have.ownProperty('name')
            expect(res.body).to.have.ownProperty('photo_URL')
            expect(res.body).to.have.ownProperty('short_bio')
            expect(res.body).to.have.ownProperty('verify')

            res.body.userId.should.equal(all_users[0].userId)
            res.body.name.should.equal(all_users[0].name)
            res.body.email.should.equal(all_users[0].email)
            // res.body.photo_URL.should.equal(all_users[0].photo_URL)
            res.body.verify.should.equal(all_users[0].verify)

            done()
          })
      })
  })
})

/*
  * testing forgot password, user click email verification
  * End Point : /api/auth/verification/forgot/:token
*/
describe('User verification from their email', () => {
  it('should get forgoten data user\'s token', (done) => {
    Users
      .findAll()
      .then((all_users) => {
        var token = jwt.sign({
                      sub: all_users[0].id,
                      email: all_users[0].email,
                      photo_URL: all_users[0].photo_URL,
                      verify: false
                  }, process.env.SECRET_TOKEN, { expiresIn: 60*60 })

        chai
          .request(URL)
          .get('/api/auth/verification/forgot/'+token)
          .end((err, res) => {
            // console.log(res.body);
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.an('object')
            expect(res.body).to.have.ownProperty('userId')
            expect(res.body).to.have.ownProperty('myhash')
            expect(res.body).to.have.ownProperty('mysalt')
            expect(res.body).to.have.ownProperty('email')
            expect(res.body).to.have.ownProperty('name')
            expect(res.body).to.have.ownProperty('photo_URL')
            expect(res.body).to.have.ownProperty('short_bio')
            expect(res.body).to.have.ownProperty('verify')

            res.body.userId.should.equal(all_users[0].userId)
            res.body.name.should.equal(all_users[0].name)
            res.body.email.should.equal(all_users[0].email)
            // res.body.photo_URL.should.equal(all_users[0].photo_URL)
            res.body.verify.should.equal(all_users[0].verify)

            done()
          })
      })
  })
})

/*
  * testing forgot password, user submit email
  * End Point : /api/users/password
*/
describe('Submit form new password', () => {
  it('should update password & get data user', (done) => {
    Users
      .findAll()
      .then((all_users) => {
        chai
          .request(URL)
          .post('/api/users/password')
          .send({
            email: all_users[0].email,
            new_password: "new_password"
          })
          .end((err, res) => {
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.an('object')
            expect(res.body).to.have.ownProperty('userId')
            expect(res.body).to.have.ownProperty('myhash')
            expect(res.body).to.have.ownProperty('mysalt')
            expect(res.body).to.have.ownProperty('email')
            expect(res.body).to.have.ownProperty('name')
            expect(res.body).to.have.ownProperty('photo_URL')
            expect(res.body).to.have.ownProperty('short_bio')
            expect(res.body).to.have.ownProperty('verify')

            res.body.userId.should.equal(all_users[0].userId)
            res.body.name.should.equal(all_users[0].name)
            res.body.email.should.equal(all_users[0].email)
            // res.body.photo_URL.should.equal(all_users[0].photo_URL)
            res.body.verify.should.equal(all_users[0].verify)

            done()
          })
      })
  })
})

/*
  * end point : /api/users/:id
  * method : GET
*/
describe('Get a user', () => {
  it('should show one user\'s data', (done) => {
    Users
      .findAll()
      .then((all_users) => {
        chai
          .request(URL)
          .get('/api/users/'+all_users[0].id)
          .end((err, res) => {
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.an('object')
            expect(res.body).to.have.ownProperty('userId')
            expect(res.body).to.have.ownProperty('myhash')
            expect(res.body).to.have.ownProperty('mysalt')
            expect(res.body).to.have.ownProperty('email')
            expect(res.body).to.have.ownProperty('name')
            expect(res.body).to.have.ownProperty('photo_URL')
            expect(res.body).to.have.ownProperty('short_bio')
            expect(res.body).to.have.ownProperty('verify')

            res.body.userId.should.equal(all_users[0].userId)
            res.body.name.should.equal(all_users[0].name)
            res.body.email.should.equal(all_users[0].email)
            // res.body.photo_URL.should.equal(all_users[0].photo_URL)
            res.body.verify.should.equal(all_users[0].verify)

            done()
          })
      })
  })
})

/*
  * end point : /api/users/:id
  * method : PUT
*/
describe('Edit a user', () => {
  it('should edit user\'s data', (done) => {
    Users
      .findAll()
      .then((all_users) => {
        var edit_data = {
          name: "new name",
          email: "new_email@yahoo.com",
          password: "new_password",
          photo_URL: "new_photo.png",
          short_bio: "short bio this user"
        }

        chai
          .request(URL)
          .put('/api/users/testedit/'+all_users[0].id)
          .send({
            name: edit_data.name,
            email: edit_data.email,
            photo_URL: edit_data.photo_URL,
            short_bio: edit_data.short_bio
          })
          .end((err, res) => {
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.an('object')
            expect(res.body).to.have.ownProperty('userId')
            expect(res.body).to.have.ownProperty('myhash')
            expect(res.body).to.have.ownProperty('mysalt')
            expect(res.body).to.have.ownProperty('email')
            expect(res.body).to.have.ownProperty('name')
            expect(res.body).to.have.ownProperty('photo_URL')
            expect(res.body).to.have.ownProperty('short_bio')
            expect(res.body).to.have.ownProperty('verify')

            res.body.userId.should.equal(all_users[0].userId)
            res.body.name.should.equal(edit_data.name)
            res.body.email.should.equal(edit_data.email)
            res.body.photo_URL.should.equal(edit_data.photo_URL)
            res.body.short_bio.should.equal(edit_data.short_bio)
            res.body.verify.should.equal(all_users[0].verify)

            done()
          })
      })
  })
})
/*
  * end point : /api/users/:id
  * method : DELETE
*/
describe('Delete a user', () => {
  it('should delete one user from database', (done) => {
    Users
      .findAll()
      .then((all_users) => {
        chai
          .request(URL)
          .delete('/api/users/'+all_users[0].id)
          .end((err, res) => {
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.equal(1)

            done()
          })
      })
  })
})
