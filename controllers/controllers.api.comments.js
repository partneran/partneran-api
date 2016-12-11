/*
  * Models
*/
const models = require ('../models')
const Comments = models.Comments

/*
  * method : POST
  * End Point : /api/ideas/:ideaid/comments
*/
let createNewComment = (req, res) => {
  Comments
    .create({
      commentId: req.body.commentId,
      content: req.body.content
    })
    .then((new_comment, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        res.json(new_comment)
      }
    })
}

/*
  * method : GET
  * End Point : /api/ideas/:ideaid/comments/
*/
let getAllComments = (req, res) => {
  Comments
  .findAll()
  .then((all_coments, err) => {
    if(err){
      console.log(err);
      res.json(err)
    }else{
      res.json(all_coments)
    }
  })
}

/*
  * method : GET
  * End Point : /api/ideas/:ideaid/comments/:commentid
*/
let getOneComment = (req, res) => {
  Comments
    .findOne({
      where: {
        id: req.params.commentid
      }
    })
    .then((one_comment, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        res.json(one_comment)
      }
    })
}

/*
  * method : PUT
  * End Point : /api/ideas/:ideaid/comments/:commentid
*/
let editOneComment = (req, res) => {
  Comments
    .findOne({
      where: {
        id: req.params.commentid
      }
    })
    .then((one_comment, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{

        one_comment.content = req.body.content
        one_comment.save()

        res.json(one_comment)
      }
    })
}

/*
  * method : DELETE
  * End Point : /api/ideas/:ideaid/comments/:commentid
*/
let deleteOneComment = (req, res) => {
  Comments
    .destroy({
      where: {
        id: req.params.commentid
      }
    })
    .then((deleted_comment, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        res.json(deleted_comment)
      }
    })
}

module.exports = {
  createNewComment,
  getAllComments,
  getOneComment,
  editOneComment,
  deleteOneComment
}
