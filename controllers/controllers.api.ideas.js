/*
  * Models
*/
const models = require ('../models')
const Ideas = models.Ideas

const slug = require('slug')

/*
  * method : POST
  * End Point : /api/ideas
*/
let createNewIdea = (req, res) => {
  Ideas
    .create({
      ideaId: req.body.ideaId,
      title: req.body.title,
      description: req.body.description,
      status: 'baby',
      image: req.body.image,
      video: req.body.video,
      slug: slug(req.body.title),
      userId: req.body.userId,
      categoryId: req.body.categoryId
    })
    .then((new_idea, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        console.log(new_idea);
        res.json(new_idea)
      }
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
      }
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

let getAllIdeas = (req, res) => {
  Ideas
    .findAll()
    .then((all_ideas, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        res.json(all_ideas)
      }
    })
}

let editOneIdea = (req, res) => {
  Ideas
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then((new_idea, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        new_idea.title = req.body.title
        new_idea.description = req.body.description
        new_idea.image = req.body.image
        new_idea.video = req.body.video
        new_idea.save()

        res.json(new_idea)
      }
    })
}

let deleteOneIdea = (req, res) => {
  Ideas
    .destroy({
      where: {
        id: req.params.id
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