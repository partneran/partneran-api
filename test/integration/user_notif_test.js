/*
  * testing
*/
const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHTTP)

/*
  * Models
*/
const models = require ('../../models')
const User_notifs = models.User_notifs

/* ================================================ */
/*                     Testing                       */
/* ================================================ */

describe('Testing User_notif Model', () => {
  beforeEach('should delete all User_notifs from database', (done) => {
    User_notifs
      .destroy({
        where: {}
      })
    User_notifs
      .create({
        user_notif_id: 1
      })
      .then(() => {
        done()
      })
  })

  afterEach('should delete all User_notifs from database', (done) => {
    User_notifs
      .destroy({
        where: {}
      })
      .then(() => {
        done()
      })
  })

  describe('Create one User_notif', () => {
    it('should create one User_notif to database', (done) => {
      User_notifs
        .create({
          user_notif_id: 1
        })
        .then((new_user_notif) => {
          expect(new_user_notif).to.be.an('object')

          expect(new_user_notif.dataValues).to.have.ownProperty("user_notif_id")

          new_user_notif.user_notif_id.should.equal(1)

          done()
        })
    })
  })

  describe('Delete one User_notif', () => {
    it('should delete one User_notif to database', (done) => {
      User_notifs
        .findAll()
        .then((all_user_notifs) => {
          User_notifs
            .destroy({
              where: {
                id: all_user_notifs[0].id
              }
            })
            .then((deleted_user_notif) => {
              expect(deleted_user_notif).to.be.equal(1)

              done()
            })
        })
    })
  })
})
