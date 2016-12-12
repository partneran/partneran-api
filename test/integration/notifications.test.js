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
const Notifications = models.Notifications

/*
  * URL
*/
const URL = 'http://localhost:8080'

/* ================================================ */
/*                     Testing                       */
/* ================================================ */

describe('Testing Notifications Model', () => {
  beforeEach('should delete all notifications from database', (done) => {
    Notifications
      .destroy({
        where: {}
      })
    Notifications
      .create({
        notificationId: 1,
        message: "testing notif",
        status: false
      })
      .then(() => {
        done()
      })
  })

  afterEach('should delete all notifications from database', (done) => {
    Notifications
      .destroy({
        where: {}
      })
    done()
  })

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test model notifications databases
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * test create a notification
    * end point : /api/notif
  */
  describe('Create one notification', () => {
    it('should create one notification', (done) => {
      Notifications
        .create({
          notificationId: 1,
          message: "testing notif",
          status: false
        })
        .then((new_notif) => {
          expect(new_notif.dataValues).to.be.an('object')
          expect(new_notif.dataValues).to.have.ownProperty("notificationId")
          expect(new_notif.dataValues).to.have.ownProperty("message")
          expect(new_notif.dataValues).to.have.ownProperty("status")

          new_notif.notificationId.should.equal(1)
          new_notif.message.should.equal("testing notif")
          new_notif.status.should.equal(false)

          done()
        })
    })
  })

  /*
    * test edit a notification
    * end point : /api/notif/:notifid
  */
  describe('Edit one notification', () => {
    it('should edit one notification', (done) => {
      Notifications
        .findAll()
        .then((all_notifs) => {
          Notifications
            .findOne({
              where: {
                id: all_notifs[0].id
              }
            })
            .then((one_notif) => {
              one_notif.status = true
              one_notif.save()

              expect(one_notif.dataValues).to.be.an('object')
              expect(one_notif.dataValues).to.have.ownProperty("notificationId")
              expect(one_notif.dataValues).to.have.ownProperty("message")
              expect(one_notif.dataValues).to.have.ownProperty("status")

              one_notif.notificationId.should.equal(1)
              one_notif.message.should.equal(all_notifs[0].message)
              one_notif.status.should.equal(true)

              done()
            })
        })
    })
  })

  /*
    * test delete a notification
    * end point : /api/notif/:notifid
  */
  describe('Delete one report', () => {
    it('should delete one vote', (done) => {
      Notifications
      .findAll()
      .then((all_notifs, err) => {
        Notifications
          .destroy({
            where: {
              id: all_notifs[0].id
            }
          })
          .then((deleted_notif) => {
            expect(deleted_notif).to.be.equal(1)

            done()
          })
      })
    })
  })

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test end point notifications
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * testing add one notification
    * method : POST
    * End Point : /api/notif
  */
  describe.only('Create one notification using API End Point', () => {
    it('should get data from API End Point when create one notification', (done) => {
      var new_notif = {
        notificationId: 1,
        message: "testing notif",
        status: false
      }

      chai
        .request(URL)
        .post('/api/notif')
        .send({
          notificationId: new_notif.notificationId,
          message: new_notif.message,
          status: new_notif.status
        })
        .end((err, res) => {
          res.should.be.json()
          res.should.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body).to.have.ownProperty("notificationId")
          expect(res.body).to.have.ownProperty("message")
          expect(res.body).to.have.ownProperty("status")

          res.body.notificationId.should.equal(new_notif.notificationId)
          res.body.message.should.equal(new_notif.message)
          res.body.status.should.equal(new_notif.status)

          done()
        })
    })
  })

  /*
    * testing edit one notification
    * method : PUT
    * End Point : /api/notif/:notifid
  */
  describe.only('Edit one notification using API End Point', () => {
    it('should get data from API End Point when edit one notification', (done) => {
      var update_data = {
        status: true
      }

      Notifications
        .findAll()
        .then((all_notifs) => {
          chai
            .request(URL)
            .put('/api/notif/'+all_notifs[0].id)
            .send({
              status: update_data.status
            })
            .end((err, res) => {
              res.should.be.json()
              res.should.have.status(200)

              expect(res.body).to.be.an('object')
              expect(res.body).to.have.ownProperty("notificationId")
              expect(res.body).to.have.ownProperty("message")
              expect(res.body).to.have.ownProperty("status")

              res.body.notificationId.should.equal(all_notifs[0].notificationId)
              res.body.message.should.equal(all_notifs[0].message)
              res.body.status.should.equal(update_data.status)

              done()
            })
        })
    })
  })

  /*
    * testing delete one notification
    * method : DELETE
    * End Point : /api/notif/:notifid
  */
  describe.only('Delete one report using API End Point', () => {
    it('should get data from API End Point when delete one report', (done) => {
      Notifications
        .findAll()
        .then((all_notifs) => {
          chai
            .request(URL)
            .delete('/api/notif/'+all_notifs[0].id)
            .end((err, res) => {
              res.should.be.json
              res.should.have.status(200)

              expect(res.body).to.be.equal(1)

              done()
            })
        })
    })
  })

})
