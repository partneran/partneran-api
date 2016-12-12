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
    Reports
      .create({
        reportId: 1,
        reason: "This auhtor's idea is copied form my own original idea!",
        status: false
      })
      .then(() => {
        done()
      })
  })

  afterEach('should delete all reports from database', (done) => {
    Reports
      .destroy({
        where: {}
      })
    done()
  })

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test model reports databases
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * test create a report
    * end point : /api/ideas/:ideaid/reports/
  */
  describe.only('Create one report', () => {
    it('should create one report', (done) => {
      Reports
        .create({
          reportId: 1,
          reason: "This author's idea is copied form my own original idea!",
          status: false
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

  /*
    * test show all reports
    * end point : /api/ideas/:ideaid/reports/
  */
  describe.only('Get all reports', () => {
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
  describe.only('Delete one report', () => {
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


})
