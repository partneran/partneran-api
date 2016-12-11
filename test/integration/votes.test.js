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
const Votes = models.Votes

/* ================================================ */
/*                     Testing                       */
/* ================================================ */
/*
/api/ideas/:ideaid/votes/
/api/ideas/:ideaid/votes/:voteid
*/

describe('Testing Votes Model', () => {
  beforeEach('should delete all votes from database', (done) => {
    Votes
      .destroy({
        where: {}
      })
    Votes
      .create({
        voteId: 1,
        votes: 1
      })
      .then(() => {
        done()
      })
  })

  afterEach('should delete all votes from database', (done) => {
    Votes
      .destroy({
        where: {}
      })
    done()
  })
})
