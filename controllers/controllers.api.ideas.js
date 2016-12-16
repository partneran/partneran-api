/*
  * Models
*/
const models = require ('../models')
const Users = models.Users
const Ideas = models.Ideas
const Categories = models.Categories
const Comments = models.Comments
const Votes = models.Votes
const Roles = models.Roles
const Reports = models.Reports

const slug = require('slug')
const ImgUpload = require('../helpers/ImgUploader')

/*
  * method : POST
  * End Point : /api/ideas
*/
let createNewIdea = (req, res) => {
  Categories
    .findOne({
      where: {
        name: req.body.category
      }
    })
    .then((one_category, err) => {
        Ideas
          .create({
            ideaId: req.body.ideaId,
            title: req.body.title,
            description: req.body.description,
            status: 'baby',
            image: req.body.image,
            video: req.body.video,
            slug: slug(req.body.title).toLowerCase(),
            UserId: req.body.UserId,
            CategoryId: one_category.id
          })
          .then((new_idea, err) => {
            if(err){
              console.log(err)
              res.json(err)
            }else{
              // res.json(new_idea)
              Roles
                .create({
                  roleId: req.body.roleId,
                  roles: "Initiator",
                  UserId: req.body.UserId,
                  IdeaId: new_idea.id
                })
                .then(() => {
                  Ideas
                    .findOne({
                      where: {
                        id: new_idea.id
                      },
                      include: [{
                        model: Users
                      },{
                        model: Categories
                      },{
                        model: Comments,
                        include: {
                          model: Users
                        }
                      },{
                        model: Votes,
                        include: {
                          model: Users
                        }
                      },{
                        model: Roles,
                        include: {
                          model: Users
                        }
                      },{
                        model: Reports,
                        include: {
                          model: Users
                        }
                      }]
                    })
                    .then((one_idea, err) => {
                      if(err){
                        res.json(err)
                      }else{
                        res.json(one_idea)
                      }
                    })
                })
            }
          })
    })
}

/*
  * method : GET
  * End Point : /api/ideas/:slug
*/
let getOneIdea = (req, res) => {
  Ideas
    .findOne({
      where: {
        slug: req.params.slug
      },
      include: [{
        model: Users
      },{
        model: Categories
      },{
        model: Comments,
        include: {
          model: Users,
          include: {
            model: Roles
          }
        }
      },{
        model: Votes,
        include: {
          model: Users
        }
      },{
        model: Roles,
        include: {
          model: Users
        }
      },{
        model: Reports,
        include: {
          model: Users
        }
      }]
    })
    .then((one_idea, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        res.json(one_idea)
      }
    })
}

/*
  * method : GET
  * End Point : /api/ideas/
*/
let getAllIdeas = (req, res) => {
  Ideas
    .findAll({
      include: [{
        model: Users
      },{
        model: Categories
      },{
        model: Comments,
        include: {
          model: Users
        }
      },{
        model: Votes,
        include: {
          model: Users
        }
      },{
        model: Roles,
        include: {
          model: Users
        }
      },{
        model: Reports,
        include: {
          model: Users
        }
      }]
    })
    .then((all_ideas, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        console.log(all_ideas);
        res.json(all_ideas)
      }
    })
}

/*
  * method : PUT
  * End Point : /api/ideas/:ideaid
*/
let editOneIdea = (req, res) => {
  Ideas
    .findOne({
      where: {
        id: req.params.ideaid
      }
    })
    .then((new_idea, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        Categories.findOne({
          where: {
            name: req.body.category
          }
        }).then((category, err) => {
          if(err){
            res.json(err)
          }else{
            new_idea.title = req.body.title
            new_idea.description = req.body.description
            new_idea.image = req.body.image
            new_idea.video = req.body.video
            new_idea.status = req.body.status
            new_idea.slug = slug(req.body.title).toLowerCase()
            new_idea.CategoryId = category.id
            new_idea.save()

            res.json(new_idea)
          }
        })
      }
    })
}

/*
  * method : DELETE
  * End Point : /api/ideas/:ideaid
*/
let deleteOneIdea = (req, res) => {
  Ideas
    .destroy({
      where: {
        id: req.params.ideaid
      }
    })
    .then((deleted_idea, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        res.json(deleted_idea)
      }
    })
}


module.exports = {
  createNewIdea,
  getOneIdea,
  getAllIdeas,
  editOneIdea,
  deleteOneIdea
}
