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
const Comments = models.Comments
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

describe('Testing Module Comments', () => {

  beforeEach('should delete all comments from database & create new comment for each testing purpose', (done) => {
    Comments
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
        email: "test@tets.com",
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
            Comments
              .create({
                commentId: 1,
                content: "seed data comment",
                UserId: new_user.id,
                IdeaId: idea.id
              })
              .then(() => {
                done()
              })
          })
        // done()
      })
  })

  afterEach('should delete all comments from database', (done) => {
    Comments
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
    done()
  })

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test model comments databases
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * test create a comment
    * end point : /api/ideas/:ideaid/comments/
  */
  describe('Create one comment', () => {
    it('should create one comment', (done) => {
      var new_comment_testing = {
        commentId: 1,
        content: "test comment"
      }
      Comments
        .create({
          commentId: new_comment_testing.commentId,
          content: new_comment_testing.content
        })
        .then((new_comment) => {
          expect(new_comment.dataValues).to.be.an('object')
          expect(new_comment.dataValues).to.have.ownProperty("commentId")
          expect(new_comment.dataValues).to.have.ownProperty("content")

          new_comment.commentId.should.equal(new_comment_testing.commentId)
          new_comment.content.should.equal(new_comment_testing.content)

          done()
        })
    })
  })

  /*
    * test show a comment
    * end point : /api/ideas/:ideaid/comments/:commentid
  */
  describe('Get one comment', () => {
    it('should show one comment', (done) => {
      Comments
      .findAll()
      .then((all_comments, err) => {
        Comments
          .findOne({
            where: {
              id: all_comments[0].id
            }
          })
          .then((new_comment) => {
            expect(new_comment.dataValues).to.be.an('object')
            expect(new_comment.dataValues).to.have.ownProperty("commentId")
            expect(new_comment.dataValues).to.have.ownProperty("content")

            new_comment.commentId.should.equal(all_comments[0].commentId)
            new_comment.content.should.equal(all_comments[0].content)

            done()
          })
      })
    })
  })

  /*
    * test edit a comment
    * end point : /api/ideas/:ideaid/comments/:commentid
  */
  describe('Edit one comment', () => {
    it('should edit one comment', (done) => {
      Comments
      .findAll()
      .then((all_comments, err) => {
        Comments
          .findOne({
            where: {
              id: all_comments[0].id
            }
          })
          .then((new_comment) => {
            var new_data = {
              content: "new comment testing"
            }

            new_comment.content = new_data.content
            new_comment.save()

            expect(new_comment.dataValues).to.be.an('object')
            expect(new_comment.dataValues).to.have.ownProperty("commentId")
            expect(new_comment.dataValues).to.have.ownProperty("content")

            new_comment.commentId.should.equal(all_comments[0].commentId)
            new_comment.content.should.equal(new_data.content)

            done()
          })
      })
    })
  })

  /*
    * test delete a comment
    * end point : /api/ideas/:ideaid/comments/:commentid
  */
  describe('Delete one comment', () => {
    it('should delete one comment', (done) => {
      Comments
      .findAll()
      .then((all_coments, err) => {
        Comments
          .destroy({
            where: {
              id: all_coments[0].id
            }
          })
          .then((deleted_comment) => {
            expect(deleted_comment).to.be.equal(1)

            done()
          })
      })
    })
  })

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test end point coments
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * testing create a comment
    * method : POST
    * End Point : /api/ideas/:ideaid/comments
  */
  describe('Create a comment using API End Point', () => {
    it('should get data from API End Point when create a comment', (done) => {
      var new_comment_testing = {
        commentId: 1,
        content: "testing comment bla bla bla"
      }
      var ideaId = 1

      Users.findAll().then((all_users) => {
        Ideas.findOne({
          where: {
            UserId: all_users[0].id
          }
        }).then((idea) => {
          chai
            .request(URL)
            .post('/api/ideas/'+idea.id+'/comments')
            .send({
              commentId: new_comment_testing.commentId,
              content: new_comment_testing.content,
              UserId: all_users[0].id
            })
            .end((err, res) => {
              res.should.be.json
              res.should.have.status(200)

              expect(res.body).to.be.an('object')
              expect(res.body).to.have.ownProperty("commentId")
              expect(res.body).to.have.ownProperty("content")

              res.body.commentId.should.equal(new_comment_testing.commentId)
              res.body.content.should.equal(new_comment_testing.content)

              done()
            })
        })
      })
    })
  })

  /*
    * testing get a comment
    * method : GET
    * End Point : /api/ideas/:ideaid/comments/:commentid
  */
  describe('Get a comment using API End Point', () => {
    it('should show a data comment from API End Point', (done) => {
      Comments
        .findAll()
        .then((all_comments, err) => {
          var ideaId = 1

          chai
            .request(URL)
            .get('/api/ideas/'+ideaId+'/comments/'+all_comments[0].id)
            .end((err, res) => {
              res.should.be.json
              res.should.have.status(200)

              expect(res.body).to.be.an('object')
              expect(res.body).to.have.ownProperty("commentId")
              expect(res.body).to.have.ownProperty("content")

              res.body.commentId.should.equal(all_comments[0].commentId)
              res.body.content.should.equal(all_comments[0].content)

              done()
            })
        })
    })
  })

  /*
    * testing get all comments
    * method : GET
    * End Point : /api/ideas/:ideaid/comments/
  */
  describe('Get all comments using API End Point', () => {
    it('should show all comments data from API End Point', (done) => {
      Comments
        .findAll()
        .then((all_comments, err) => {
          var ideaId = 1

          chai
            .request(URL)
            .get('/api/ideas/'+ideaId+'/comments/')
            .end((err, res) => {
              res.should.be.json
              res.should.have.status(200)

              expect(res.body).to.be.an('array')
              res.body.map(comment => {
                expect(comment).to.have.ownProperty("commentId")
                expect(comment).to.have.ownProperty("content")
              })

              res.body[0].commentId.should.equal(all_comments[0].commentId)
              res.body[0].content.should.equal(all_comments[0].content)

              done()
            })
        })
    })
  })

  /*
    * testing edit a comment
    * method : PUT
    * End Point : /api/ideas/:ideaid/comments/:commentid
  */
  describe('Edit a comment using API End Point', () => {
    it('should edit a comment and get data from API End Point', (done) => {
      var edit_data = {
        content: "comment edit bla bla bla"
      }

      Comments
        .findAll()
        .then((all_comments, err) => {
          var ideaId = 1

          chai
            .request(URL)
            .put('/api/ideas/'+ideaId+'/comments/'+all_comments[0].id)
            .send({
              content: edit_data.content
            })
            .end((err, res) => {
              res.should.be.json
              res.should.have.status(200)

              expect(res.body).to.be.an('object')
              expect(res.body).to.have.ownProperty("commentId")
              expect(res.body).to.have.ownProperty("content")

              res.body.commentId.should.equal(all_comments[0].commentId)
              res.body.content.should.equal(edit_data.content)

              done()
            })
        })
    })
  })

  /*
    * testing delete a comment
    * method : DELETE
    * End Point : /api/ideas/:ideaid/comments/:commentid
  */
  describe('Delete a comment using API End Point', () => {
    it('should delete a comment and get data from API End Point', (done) => {
      Comments
        .findAll()
        .then((all_comments, err) => {
          var ideaId = 1

          chai
            .request(URL)
            .delete('/api/ideas/'+ideaId+'/comments/'+all_comments[0].id)
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
