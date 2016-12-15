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
const Reports = models.Reports
const Users = models.Users
const Ideas = models.Ideas
const Categories = models.Categories

/*
  * URL
*/
const URL = 'http://localhost:8080'

/* ================================================ */
/*                     Testing                       */
/* ================================================ */

describe('Testing Reports Model', () => {
  beforeEach('should delete all reports from database', (done) => {
    Reports
      .destroy({
        where: {}
      })
    Users
      .destroy({
        where: {}
      })
    Ideas
      .destroy({
        where: {}
      })
    Categories
      .destroy({
        where: {}
      })

      Users.register({
        userId: 1,
        email: "test@tet12313123s.com",
        // photo_URL: req.body.photo_URL,
        verify: false,
        name: "test",
        isSuper: 'LOL'
      }, "123", (err, new_user) => {
        Categories
          .create({
            name: "EdTech"
          })
        Ideas
          .create({
            ideaId: 1,
            UserId: new_user.id,
            category: "EdTech"
          }).then((idea) => {
            Reports
              .create({
                reportId: 1,
                reason: "This author's idea is copied form my own original idea!",
                status: false,
                UserId: new_user.id,
                IdeaId: idea.id
              })
              .then(() => {
                done()
              })
          })
        })
  })

  afterEach('should delete all reports from database', (done) => {
    Reports
      .destroy({
        where: {}
      })
    Ideas
      .destroy({
        where: {}
      })
    Categories
      .destroy({
        where: {}
      })
    Users
      .destroy({
        where: {}
      })
      .then(() => {
        done()
      })
  })

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test model reports databases
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * test create a report
    * end point : /api/ideas/:ideaid/reports/
  */
  describe('Create one report', () => {
    it('should create one report', (done) => {
      Users.findAll().then((all_users) => {
        Ideas.findOne({
          where: {
            UserId: all_users[0].id
          }
        }).then((idea) => {
          Reports
            .create({
              reportId: 1,
              reason: "This author's idea is copied form my own original idea!",
              status: false,
              UserId: all_users[0].id,
              IdeaId: idea.id
            })
            .then((new_report) => {
              expect(new_report.dataValues).to.be.an('object')
              expect(new_report.dataValues).to.have.ownProperty("reportId")
              expect(new_report.dataValues).to.have.ownProperty("reason")
              expect(new_report.dataValues).to.have.ownProperty("status")

              new_report.reportId.should.equal(1)
              new_report.reason.should.equal("This author's idea is copied form my own original idea!")
              new_report.status.should.equal(false)

              done()
            })
        })
      })
    })
  })

  /*
    * test show all reports
    * end point : /api/ideas/:ideaid/reports/
  */
  describe('Get all reports', () => {
    it('should show all reports', (done) => {
      Reports
      .findAll()
      .then((all_reports, err) => {
        all_reports.map(report => {
          expect(report.dataValues).to.be.an('object')
          expect(report.dataValues).to.have.ownProperty("reportId")
          expect(report.dataValues).to.have.ownProperty("reason")
          expect(report.dataValues).to.have.ownProperty("status")
        })

        all_reports[0].reportId.should.equal(1)
        all_reports[0].reason.should.equal("This author's idea is copied form my own original idea!")
        all_reports[0].status.should.equal(false)

        done()
      })
    })
  })

  /*
    * test delete a report
    * end point : /api/ideas/:ideaid/reports/:reportid
  */
  describe('Delete one report', () => {
    it('should delete one vote', (done) => {
      Reports
      .findAll()
      .then((all_reports, err) => {
        Reports
          .destroy({
            where: {
              id: all_reports[0].id
            }
          })
          .then((deleted_report) => {
            expect(deleted_report).to.be.equal(1)

            done()
          })
      })
    })
  })

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test end point reports
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * testing add one report
    * method : POST
    * End Point : /api/ideas/:ideaid/reports/
  */
  describe('Create one report using API End Point', () => {
    it('should get data from API End Point when create one report', (done) => {
      var new_report = {
        reportId: 1,
        reason: "This author's idea is copied form my own original idea!",
        status: false
      }
      Users.findAll().then((all_users) => {
        Ideas.findOne({
          where: {
            UserId: all_users[0].id
          }
        }).then((idea) => {
          chai
            .request(URL)
            .post('/api/ideas/'+idea.id+'/reports')
            .send({
              reportId: new_report.reportId,
              reason: new_report.reason,
              status: new_report.status,
              UserId: all_users[0].id,
              IdeaId: idea.id
            })
            .end((err, res) => {
              res.should.be.json
              res.should.have.status(200)

              expect(res.body).to.be.an('object')
              expect(res.body).to.have.ownProperty("reportId")
              expect(res.body).to.have.ownProperty("reason")
              expect(res.body).to.have.ownProperty("status")

              res.body.reportId.should.equal(new_report.reportId)
              res.body.reason.should.equal(new_report.reason)
              res.body.status.should.equal(new_report.status)

              done()
            })
        })
      })
    })
  })

  /*
    * testing show all reports
    * method : GET
    * End Point : /api/ideas/:ideaid/reports/
  */
  describe('Get all reports using API End Point', () => {
    it('should get all data reports from API End Point', (done) => {
      Users.findAll().then((all_users) => {
        Ideas.findOne({
          where: {
            UserId: all_users[0].id
          }
        }).then((idea) => {
          chai
            .request(URL)
            .get('/api/ideas/'+idea.id+'/reports')
            .end((err, res) => {
              res.should.be.json
              res.should.have.status(200)

              expect(res.body).to.be.an('array')

              res.body.map((report) => {
                expect(report).to.have.ownProperty("reportId")
                expect(report).to.have.ownProperty("reason")
                expect(report).to.have.ownProperty("status")
              })

              res.body[0].reportId.should.equal(1)
              res.body[0].reason.should.equal("This author's idea is copied form my own original idea!")
              res.body[0].status.should.equal(false)

              done()
            })
        })
      })
    })
  })

  /*
    * testing delete one report
    * method : DELETE
    * End Point : /api/ideas/:ideaid/reports/:reportid
  */
  describe('Delete one report using API End Point', () => {
    it('should get data from API End Point when delete one report', (done) => {
      Users.findAll().then((all_users) => {
        Ideas.findOne({
          where: {
            UserId: all_users[0].id
          }
        }).then((idea) => {
          Reports
            .findAll()
            .then((all_reports) => {
              chai
                .request(URL)
                .delete('/api/ideas/'+idea.id+'/reports/'+all_reports[0].id)
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
  })

})
