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
    Comments
      .create({
        commentId: 1,
        content: "seed data comment"
      })
      .then(() => {
      done()
    })
  })

  afterEach('should delete all comments from database', (done) => {
    Comments
      .destroy({
        where: {}
      })
    done()
  })

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test model ideas databases
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * test create a comment
    * end point : /api/ideas/:ideaid/comments/
  */
  describe.only('Create one comment', () => {
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
  describe.only('Get one comment', () => {
    it('should show one comment', (done) => {
      Comments
      .findAll()
      .then((all_coments, err) => {
        Comments
          .findOne({
            where: {
              id: all_coments[0].id
            }
          })
          .then((new_comment) => {
            expect(new_comment.dataValues).to.be.an('object')
            expect(new_comment.dataValues).to.have.ownProperty("commentId")
            expect(new_comment.dataValues).to.have.ownProperty("content")

            new_comment.commentId.should.equal(all_coments[0].commentId)
            new_comment.content.should.equal(all_coments[0].content)

            done()
          })
      })
    })
  })

  /*
    * test edit a comment
    * end point : /api/ideas/:ideaid/comments/:commentid
  */
  describe.only('Edit one comment', () => {
    it('should edit one comment', (done) => {
      Comments
      .findAll()
      .then((all_coments, err) => {
        Comments
          .findOne({
            where: {
              id: all_coments[0].id
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

            new_comment.commentId.should.equal(all_coments[0].commentId)
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
  describe.only('Delete one comment', () => {
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

})
