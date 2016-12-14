/*
  * Models
*/
const models = require ('../models')
const Comments = models.Comments
const Users = models.Users
const Ideas = models.Ideas
const Roles = models.Roles

/*
  * method : POST
  * End Point : /api/ideas/:ideaid/comments
*/
let createNewComment = (req, res) => {
  /*
  Roles
    .create({
      roleId: req.body.roleId,
      roles: "Member",
      UserId: req.body.UserId,
      IdeaId: req.params.ideaid
    })
    .then(() => {
    })
  */
  Roles.findOne({
    where: {
      UserId: req.body.UserId,
      IdeaId: req.params.ideaid
    }
  }).then((one_role) => {
    // console.log(one_role);
    if(one_role === null){

      // console.log(`aaa`);
      Roles
        .create({
          roleId: req.body.roleId,
          roles: "Member",
          UserId: req.body.UserId,
          IdeaId: req.params.ideaid
        })
        .then((role) => {
          Comments
            .create({
              commentId: req.body.commentId,
              content: req.body.content,
              UserId: req.body.UserId,
              IdeaId: req.params.ideaid
            })
            .then((new_comment, err) => {
              if(err){
                console.log(err);
                res.json(err)
              }else{
                // res.json(new_comment)
                  Comments
                    .findOne({
                      where: {
                        id: new_comment.id
                      },
                      include: [{
                        model: Users,
                        include: {
                          model: Roles
                        }
                      },{
                        model: Ideas
                      }]
                    })
                    .then((one_comment, err) => {
                      if(err){
                        res.json(err)
                      }else{
                        res.json(one_comment)
                      }
                    })
              }
            })
        })
    }else{
      // console.log(`BB`);
      Comments
        .create({
          commentId: req.body.commentId,
          content: req.body.content,
          UserId: req.body.UserId,
          IdeaId: req.params.ideaid
        })
        .then((new_comment, err) => {
          if(err){
            console.log(err);
            res.json(err)
          }else{
            // res.json(new_comment)
              Comments
                .findOne({
                  where: {
                    id: new_comment.id
                  },
                  include: [{
                    model: Users,
                    include: {
                      model: Roles
                    }
                  },{
                    model: Ideas
                  }]
                })
                .then((one_comment, err) => {
                  if(err){
                    res.json(err)
                  }else{
                    res.json(one_comment)
                  }
                })
          }
        })
    }
  })
}

/*
  * method : GET
  * End Point : /api/ideas/:ideaid/comments/
*/
let getAllComments = (req, res) => {
  Comments
  .findAll({
    include: [{
      model: Users
    },{
      model: Ideas
    }]
  })
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
      },
      include: [{
        model: Users
      },{
        model: Ideas
      }]
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
