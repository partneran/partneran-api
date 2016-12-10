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
const Ideas = models.Ideas

/*
  * URL
*/
const URL = 'http://localhost:8080'

/* ================================================ */
/*                     Testing                       */
/* ================================================ */


before('should delete all ideas from database', (done) => {
  Ideas
    .destroy({
      where: {}
    })
    .then((data) => {
      done()
    })
})

after('should delete all ideas from database', (done) => {
  Ideas
    .destroy({
      where: {}
    })
    .then((data) => {
      done()
    })
})

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//  test model ideas databases
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/*
  * test create an idea
  * end point : /api/ideas
*/
describe('Create one idea', () => {
  it('should create one idea', (done) => {
    var new_idea_testing = {
      ideaId: 1,
      title: "test title idea",
      description: "test description idea",
      status: 'baby',
      image: "test image idea",
      video: "test image video",
      userId: 1,
      categoryId: 1
    }

    Ideas
      .create({
        ideaId: new_idea_testing.ideaId,
        title: new_idea_testing.title,
        description: new_idea_testing.description,
        status: new_idea_testing.status,
        image: new_idea_testing.image,
        video: new_idea_testing.video,
        userId: new_idea_testing.userId,
        categoryId: new_idea_testing.categoryId
      })
      .then((new_idea) => {
        expect(new_idea.dataValues).to.be.an('object')
        expect(new_idea.dataValues).to.have.ownProperty("ideaId")
        expect(new_idea.dataValues).to.have.ownProperty("title")
        expect(new_idea.dataValues).to.have.ownProperty("description")
        expect(new_idea.dataValues).to.have.ownProperty("status")
        expect(new_idea.dataValues).to.have.ownProperty("image")
        expect(new_idea.dataValues).to.have.ownProperty("video")
        expect(new_idea.dataValues).to.have.ownProperty("userId")
        expect(new_idea.dataValues).to.have.ownProperty("categoryId")

        new_idea.ideaId.should.equal(new_idea_testing.ideaId)
        new_idea.title.should.equal(new_idea_testing.title)
        new_idea.description.should.equal(new_idea_testing.description)
        new_idea.status.should.equal(new_idea_testing.status)
        new_idea.image.should.equal(new_idea_testing.image)
        new_idea.video.should.equal(new_idea_testing.video)
        new_idea.userId.should.equal(new_idea_testing.userId)
        new_idea.categoryId.should.equal(new_idea_testing.categoryId)

        done()
      })
  })
})

/*
  * test get an idea
  * end point : /api/ideas/:ideaid
*/
describe('Get one idea', () => {
  it('should create one idea', (done) => {
    Ideas
      .findAll()
      .then((all_ideas, err) => {
        Ideas
          .findOne({
            where: {
              id: all_ideas[0].id
            }
          })
          .then((new_idea) => {
            expect(new_idea.dataValues).to.be.an('object')
            expect(new_idea.dataValues).to.have.ownProperty("ideaId")
            expect(new_idea.dataValues).to.have.ownProperty("title")
            expect(new_idea.dataValues).to.have.ownProperty("description")
            expect(new_idea.dataValues).to.have.ownProperty("status")
            expect(new_idea.dataValues).to.have.ownProperty("image")
            expect(new_idea.dataValues).to.have.ownProperty("video")
            expect(new_idea.dataValues).to.have.ownProperty("userId")
            expect(new_idea.dataValues).to.have.ownProperty("categoryId")

            new_idea.ideaId.should.equal(all_ideas[0].ideaId)
            new_idea.title.should.equal(all_ideas[0].title)
            new_idea.description.should.equal(all_ideas[0].description)
            new_idea.status.should.equal(all_ideas[0].status)
            new_idea.image.should.equal(all_ideas[0].image)
            new_idea.video.should.equal(all_ideas[0].video)
            new_idea.userId.should.equal(all_ideas[0].userId)
            new_idea.categoryId.should.equal(all_ideas[0].categoryId)

            done()
          })
      })
  })
})

/*
  * test edit an idea
  * end point : /api/ideas/:ideaid
*/
describe('Edit one idea', () => {
  it('should edit one idea', (done) => {
    Ideas
      .findAll()
      .then((all_ideas, err) => {
        Ideas
          .findOne({
            where: {
              id: all_ideas[0].id
            }
          })
          .then((new_idea) => {
            var new_data = {
              title: "test edit title idea",
              description: "test edit description idea",
              image: "test edit image idea",
              video: "test edit image video"
            }

            new_idea.title = new_data.title
            new_idea.description = new_data.description
            new_idea.image = new_data.image
            new_idea.video = new_data.video
            new_idea.save()

            expect(new_idea.dataValues).to.be.an('object')
            expect(new_idea.dataValues).to.have.ownProperty("ideaId")
            expect(new_idea.dataValues).to.have.ownProperty("title")
            expect(new_idea.dataValues).to.have.ownProperty("description")
            expect(new_idea.dataValues).to.have.ownProperty("status")
            expect(new_idea.dataValues).to.have.ownProperty("image")
            expect(new_idea.dataValues).to.have.ownProperty("video")
            expect(new_idea.dataValues).to.have.ownProperty("userId")
            expect(new_idea.dataValues).to.have.ownProperty("categoryId")

            new_idea.ideaId.should.equal(all_ideas[0].ideaId)
            new_idea.title.should.equal(new_data.title)
            new_idea.description.should.equal(new_data.description)
            new_idea.status.should.equal(all_ideas[0].status)
            new_idea.image.should.equal(new_data.image)
            new_idea.video.should.equal(new_data.video)
            new_idea.userId.should.equal(all_ideas[0].userId)
            new_idea.categoryId.should.equal(all_ideas[0].categoryId)

            done()
          })
      })
  })
})

/*
  * test create get an idea
  * end point : /api/ideas/:ideaid
*/
describe('Delete one idea', () => {
  it('should delete one idea', (done) => {
    Ideas
      .findAll()
      .then((all_ideas, err) => {
        Ideas
          .destroy({
            where: {
              id: all_ideas[0].id
            }
          })
          .then((deleted_idea) => {
            expect(deleted_idea).to.be.equal(1)

            done()
          })
      })
  })
})
