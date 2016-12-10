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
const Categories = models.Categories

/*
  * URL
*/
const URL = 'http://localhost:8080'

/* ================================================ */
/*                     Testing                       */
/* ================================================ */

describe('Testing Categories Model', () => {
  beforeEach('should delete all categories from database', (done) => {
    Categories
      .destroy({
        where: {}
      })
    Categories
      .create({
        categoryid: 1,
        name: "test name category"
      })
      .then(() => {
        done()
      })
  })

  afterEach('should delete all categories from database', (done) => {
    Categories
      .destroy({
        where: {}
      })
    done()
  })

  describe('Get all categories', () => {
    it('show all categories from database', (done) => {
      Categories
        .findAll()
        .then((all_categories) => {
          expect(all_categories).to.be.an('array')

          all_categories.map(category => {
            expect(category.dataValues).to.have.ownProperty("categoryId")
            expect(category.dataValues).to.have.ownProperty("name")
          })

          done()
        })
    })
  })

  describe('Get one category', () => {
    it('show one category from database', (done) => {
      Categories
        .findAll()
        .then((all_categories) => {
          Categories
            .findOne({
              where: {
                id: all_categories[0].id
              }
            })
            .then((one_category) => {
              expect(one_category).to.be.an('object')

              expect(one_category.dataValues).to.have.ownProperty("categoryId")
              expect(one_category.dataValues).to.have.ownProperty("name")

              done()
            })
        })
    })
  })
})
