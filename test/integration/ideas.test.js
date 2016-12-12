/*
  * testing
*/
const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHTTP)

const slug = require('slug')

/*
  * Models
*/
const models = require ('../../models')
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

describe('Testing Module Ideas', () => {

  beforeEach('should delete all ideas from database & create new idea for each testing purpose', (done) => {
    Ideas
      .destroy({
        where: {}
      })
    Users
      .destroy({
        where: {}
      })
    Categories
      .destroy({
        where: {}
      })
    var new_idea_testing = {
      ideaId: 1,
      title: "test title idea",
      description: "test description idea",
      status: 'baby',
      image: "test image idea",
      video: "test image video",
      slug: slug("test title idea"),
      category: "EdTech"
    }

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
          ideaId: new_idea_testing.ideaId,
          title: new_idea_testing.title,
          description: new_idea_testing.description,
          status: new_idea_testing.status,
          image: new_idea_testing.image,
          video: new_idea_testing.video,
          slug: new_idea_testing.slug,
          category: new_idea_testing.category
        })
        .then(() => {
          done()
        })
        // done()
    })
  })

  afterEach('should delete all ideas from database', (done) => {
    Ideas
      .destroy({
        where: {}
      })
    Users
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
        video: "test image video"
      }

      Ideas
        .create({
          ideaId: new_idea_testing.ideaId,
          title: new_idea_testing.title,
          description: new_idea_testing.description,
          status: new_idea_testing.status,
          image: new_idea_testing.image,
          video: new_idea_testing.video
        })
        .then((new_idea) => {
          expect(new_idea.dataValues).to.be.an('object')
          expect(new_idea.dataValues).to.have.ownProperty("ideaId")
          expect(new_idea.dataValues).to.have.ownProperty("title")
          expect(new_idea.dataValues).to.have.ownProperty("description")
          expect(new_idea.dataValues).to.have.ownProperty("status")
          expect(new_idea.dataValues).to.have.ownProperty("image")
          expect(new_idea.dataValues).to.have.ownProperty("video")
          expect(new_idea.dataValues).to.have.ownProperty("UserId")
          expect(new_idea.dataValues).to.have.ownProperty("CategoryId")

          new_idea.ideaId.should.equal(new_idea_testing.ideaId)
          new_idea.title.should.equal(new_idea_testing.title)
          new_idea.description.should.equal(new_idea_testing.description)
          new_idea.status.should.equal(new_idea_testing.status)
          new_idea.image.should.equal(new_idea_testing.image)
          new_idea.video.should.equal(new_idea_testing.video)

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
              expect(new_idea.dataValues).to.have.ownProperty("UserId")
              expect(new_idea.dataValues).to.have.ownProperty("CategoryId")

              new_idea.ideaId.should.equal(all_ideas[0].ideaId)
              new_idea.title.should.equal(all_ideas[0].title)
              new_idea.description.should.equal(all_ideas[0].description)
              new_idea.status.should.equal(all_ideas[0].status)
              new_idea.image.should.equal(all_ideas[0].image)
              new_idea.video.should.equal(all_ideas[0].video)

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
              expect(new_idea.dataValues).to.have.ownProperty("UserId")
              expect(new_idea.dataValues).to.have.ownProperty("CategoryId")

              new_idea.ideaId.should.equal(all_ideas[0].ideaId)
              new_idea.title.should.equal(new_data.title)
              new_idea.description.should.equal(new_data.description)
              new_idea.status.should.equal(all_ideas[0].status)
              new_idea.image.should.equal(new_data.image)
              new_idea.video.should.equal(new_data.video)

              done()
            })
        })
    })
  })

  /*
    * test delete an idea
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

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test end point ideas
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * testing create an idea
    * method : POST
    * End Point : /api/ideas
  */
  describe('Create an idea using API End Point', () => {
    it('should get data from API End Point to create an idea and get new idea', (done) => {
      var new_idea_testing = {
        ideaId: 1,
        title: "test title idea",
        description: "test description idea",
        status: 'baby',
        image: "test image idea",
        video: "test image video",
        category: "EdTech"
      }
      Users
        .findAll()
        .then((all_users) => {
        chai
          .request(URL)
          .post('/api/ideas')
          .send({
            ideaId: new_idea_testing.ideaId,
            title: new_idea_testing.title,
            description: new_idea_testing.description,
            image: new_idea_testing.image,
            video: new_idea_testing.video,
            UserId: all_users[0].id,
            category: new_idea_testing.category
          })
          .end((err, res) => {
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.an('object')
            expect(res.body).to.have.ownProperty("ideaId")
            expect(res.body).to.have.ownProperty("title")
            expect(res.body).to.have.ownProperty("description")
            expect(res.body).to.have.ownProperty("status")
            expect(res.body).to.have.ownProperty("image")
            expect(res.body).to.have.ownProperty("video")
            expect(res.body).to.have.ownProperty("UserId")
            expect(res.body).to.have.ownProperty("CategoryId")

            res.body.ideaId.should.equal(new_idea_testing.ideaId)
            res.body.title.should.equal(new_idea_testing.title)
            res.body.description.should.equal(new_idea_testing.description)
            res.body.status.should.equal(new_idea_testing.status)
            res.body.image.should.equal(new_idea_testing.image)
            res.body.video.should.equal(new_idea_testing.video)

            done()
          })
        })
    })
  })

  /*
    * testing get an idea
    * method : GET
    * End Point : /api/ideas/:slug
  */
  describe('Get an idea using API End Point', () => {
    it('should get one idea data from API End Point', (done) => {
      Ideas
        .findAll()
        .then((all_ideas, err) => {
          chai
            .request(URL)
            .get('/api/ideas/'+all_ideas[0].slug)
            .end((err, res) => {
              res.should.be.json
              res.should.have.status(200)

              expect(res.body).to.be.an('object')
              expect(res.body).to.have.ownProperty("ideaId")
              expect(res.body).to.have.ownProperty("title")
              expect(res.body).to.have.ownProperty("description")
              expect(res.body).to.have.ownProperty("status")
              expect(res.body).to.have.ownProperty("image")
              expect(res.body).to.have.ownProperty("video")
              expect(res.body).to.have.ownProperty("UserId")
              expect(res.body).to.have.ownProperty("CategoryId")

              res.body.ideaId.should.equal(all_ideas[0].ideaId)
              res.body.title.should.equal(all_ideas[0].title)
              res.body.description.should.equal(all_ideas[0].description)
              res.body.status.should.equal(all_ideas[0].status)
              res.body.image.should.equal(all_ideas[0].image)
              res.body.video.should.equal(all_ideas[0].video)

              done()
            })
        })
    })
  })

  /*
    * testing get all ideas
    * method : POST
    * End Point : /api/ideas
  */
  describe('Show all ideas using API End Point', () => {
    it('should get all ideas data from API End Point', (done) => {
      chai
        .request(URL)
        .get('/api/ideas/')
        .end((err, res) => {
          res.should.be.json
          res.should.have.status(200)

          expect(res.body).to.be.an('array')

          res.body.map(idea => {
            expect(idea).to.have.ownProperty("ideaId")
            expect(idea).to.have.ownProperty("title")
            expect(idea).to.have.ownProperty("description")
            expect(idea).to.have.ownProperty("status")
            expect(idea).to.have.ownProperty("image")
            expect(idea).to.have.ownProperty("video")
            // expect(idea).to.have.ownProperty("UserId")
            // expect(idea).to.have.ownProperty("CategoryId")
          })

          done()
        })
    })
  })

  /*
    * testing edit an idea
    * method : PUT
    * End Point : /api/ideas/:ideaid
  */
  describe('Edit an idea using API End Point', () => {
    it('should send edit data to PUT API End Point to edit an idea', (done) => {
      var edit_idea = {
        title: "test edit title idea",
        description: "test edit description idea",
        image: "test edit image idea",
        video: "test edit image video"
      }

      Ideas
        .findAll()
        .then((all_ideas, err) => {
          chai
            .request(URL)
            .put('/api/ideas/'+all_ideas[0].id)
            .send({
              title: edit_idea.title,
              description: edit_idea.description,
              image: edit_idea.image,
              video: edit_idea.video
            })
            .end((err, res) => {
              res.should.be.json
              res.should.have.status(200)

              expect(res.body).to.be.an('object')
              expect(res.body).to.have.ownProperty("ideaId")
              expect(res.body).to.have.ownProperty("title")
              expect(res.body).to.have.ownProperty("description")
              expect(res.body).to.have.ownProperty("status")
              expect(res.body).to.have.ownProperty("image")
              expect(res.body).to.have.ownProperty("video")
              expect(res.body).to.have.ownProperty("UserId")
              expect(res.body).to.have.ownProperty("CategoryId")

              res.body.ideaId.should.equal(all_ideas[0].ideaId)
              res.body.title.should.equal(edit_idea.title)
              res.body.description.should.equal(edit_idea.description)
              res.body.status.should.equal(all_ideas[0].status)
              res.body.image.should.equal(edit_idea.image)
              res.body.video.should.equal(edit_idea.video)

              done()
            })
        })
    })
  })

  /*
    * testing delete an idea
    * method : DELETE
    * End Point : /api/ideas/:ideaid
  */
  describe('Delete an idea using API End Point', () => {
    it('should delete an idea through API End Point', (done) => {
      Ideas
        .findAll()
        .then((all_ideas, err) => {
          chai
            .request(URL)
            .delete('/api/ideas/'+all_ideas[0].id)
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
