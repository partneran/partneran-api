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

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test model votes databases
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * test create a vote
    * end point : /api/ideas/:ideaid/votes/
  */
  describe.only('Create one vote', () => {
    it('should create one vote', (done) => {
      Votes
        .create({
          voteId: 1,
          votes: 1
        })
        .then((new_vote) => {
          expect(new_vote.dataValues).to.be.an('object')
          expect(new_vote.dataValues).to.have.ownProperty("voteId")
          expect(new_vote.dataValues).to.have.ownProperty("votes")

          new_vote.voteId.should.equal(1)
          new_vote.votes.should.equal(1)

          done()
        })
    })
  })

  /*
    * test show a vote with counter
    * end point : /api/ideas/:ideaid/votes/
  */
  describe.only('Get one vote', () => {
    it('should show one vote', (done) => {
      Votes
      .findAll()
      .then((all_votes, err) => {
        Votes
          .findAndCountAll({
            where: {
              id: all_votes[0].id
            }
          })
          .then((votes) => {
            expect(votes.dataValues).to.be.an('object')
            expect(votes.dataValues).to.have.ownProperty("voteId")
            expect(votes.dataValues).to.have.ownProperty("votes")
            console.log(votes.count);
            votes.count.should.equal(1)
            votes.voteId.should.equal(all_votes[0].voteId)
            votes.votes.should.equal(all_votes[0].votes)

            done()
          })
      })
    })
  })

  /*
    * test delete a vote
    * end point : /api/ideas/:ideaid/votes/:voteid
  */
  describe.only('Delete one vote', () => {
    it('should delete one vote', (done) => {
      Votes
      .findAll()
      .then((all_votes, err) => {
        Votes
          .destroy({
            where: {
              id: all_votes[0].id
            }
          })
          .then((deleted_vote) => {
            expect(deleted_vote).to.be.equal(1)

            done()
          })
      })
    })
  })

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test end point votes
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


})
