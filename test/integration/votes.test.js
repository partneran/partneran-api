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

describe('Testing Votes Model', () => {
  beforeEach('should delete all votes from database', (done) => {
    Votes
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
              Votes
                .create({
                  voteId: 1,
                  votes: 1,
                  UserId: new_user.id,
                  IdeaId: idea.id
                })
                .then(() => {
                  done()
                })
          })
      })
  })

  afterEach('should delete all votes from database', (done) => {
    Votes
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
  //  test model votes databases
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * test create a vote
    * end point : /api/ideas/:ideaid/votes/
  */
  describe('Create one vote', () => {
    it('should create one vote', (done) => {
      Users.findAll().then((all_users) => {
        Ideas.findOne({
          where: {
            UserId: all_users[0].id
          }
        }).then((idea) => {
          Votes
            .create({
              voteId: 1,
              votes: 1,
              UserId: all_users[0].id,
              IdeaId: idea.id
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
    })
  })

  /*
    * test show a vote with counter
    * end point : /api/ideas/:ideaid/votes/
  */
  describe('Get one vote', () => {
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
            // console.log(votes.rows[0].dataValues);
            expect(votes).to.be.an('object')
            expect(votes.rows[0].dataValues).to.have.ownProperty("voteId")
            expect(votes.rows[0].dataValues).to.have.ownProperty("votes")

            votes.count.should.equal(1)
            votes.rows[0].dataValues.voteId.should.equal(all_votes[0].voteId)
            votes.rows[0].dataValues.votes.should.equal(all_votes[0].votes)

            done()
          })
      })
    })
  })

  /*
    * test delete a vote
    * end point : /api/ideas/:ideaid/votes/:voteid
  */
  describe('Delete one vote', () => {
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

  /*
    * testing up vote
    * method : POST
    * End Point : /api/ideas/:ideaid/votes/
  */
  describe('Up vote using API End Point', () => {
    it('should get data from API End Point when up vote', (done) => {
      Users.findAll().then((all_users) => {
        Ideas.findOne({
          where: {
            UserId: all_users[0].id
          }
        }).then((idea) => {
          chai
            .request(URL)
            .post('/api/ideas/'+idea.id+'/votes/')
            .send({
              voteId: 1,
              votes: 1,
              UserId: all_users[0].id,
              IdeaId: idea.id
            })
            .end((err, res) => {
              res.should.be.json
              res.should.have.status(200)

              expect(res.body).to.be.an('object')
              expect(res.body).to.have.ownProperty("voteId")
              expect(res.body).to.have.ownProperty("votes")

              res.body.voteId.should.equal(1)
              res.body.votes.should.equal(1)

              done()
            })
        })
      })
    })
  })

  /*
    * testing show vote's count
    * method : GET
    * End Point : /api/ideas/:ideaid/votes/
  */
  describe('Get vote\'s count using API End Point', () => {
    it('should get vote\'s count from API End Point', (done) => {
      Users.findAll().then((all_users) => {
        Ideas.findOne({
          where: {
            UserId: all_users[0].id
          }
        }).then((idea) => {
          Votes
            .findAll()
            .then((all_votes) => {
              chai
                .request(URL)
                .get('/api/ideas/'+idea.id+'/votes/testcount/'+all_votes[0].id)
                .end((err, res) => {
                  res.should.be.json
                  res.should.have.status(200)

                  expect(res.body).to.be.an('object')
                  expect(res.body.rows[0]).to.have.property("voteId")
                  expect(res.body.rows[0]).to.have.property("votes")

                  res.body.count.should.equal(1)
                  res.body.rows[0].voteId.should.equal(all_votes[0].voteId)
                  res.body.rows[0].votes.should.equal(all_votes[0].votes)

                  done()
                })
            })
        })
      })
    })
  })

  /*
    * testing show vote's count
    * method : POST
    * End Point : /api/ideas/:ideaid/votes/:voteid
  */
  describe('Down vote using API End Point', () => {
    it('should delete 1 vote from API End Point when down vote', (done) => {
      Users.findAll().then((all_users) => {
        Ideas.findOne({
          where: {
            UserId: all_users[0].id
          }
        }).then((idea) => {
          Votes
            .findAll()
            .then((all_votes) => {
              chai
                .request(URL)
                .delete('/api/ideas/'+idea.id+'/votes/'+all_votes[0].id)
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
