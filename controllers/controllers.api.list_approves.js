/*
  * Models
*/
const models = require ('../models')
const List_approves = models.List_approves

/*
  * method: POST
  * end point: /api/list_approves/
*/
let createListApprove = (req, res) => {
  List_approves
    .create({
      list_approve_id: req.body.list_approve_id,
      UserId: req.body.UserId,
      IdeaId: req.body.IdeaId
    })
    .then((new_list_approve, err) => {
      if(err){
        res.json(err)
      }else{
        // res.json(new_list_approve)
        List_approves
          .findOne({
            where: {
              id: new_list_approve.id
            },
            include: {
              model: Users
            }
          })
          .then((one_list_approve, err) => {
            if(err){
              res.json(err)
            }else{
              res.json(one_list_approve)
            }
          })
      }
    })
}

/*
  * method: GET
  * end point: /api/list_approves/:list_approve_id
*/
let getAllListPostBy = (req, res) => {
  List_approves
    .findAll({
      include: {
        model: Ideas,
        include: {
          model: Users,
          where: {
            UserId: req.body.UserId
          }
        }
      }
    })
    .then((all_list, err) => {
      if(err){
        res.json(err)
      }else{
        res.json(all_list)
      }
    })
}

/*
  * method: PUT
  * end point: /api/list_approves/:list_approve_id
*/
let editListApprove = (req, res) => {
  List_approves
    .findOne({
      where: {
        id: req.params.list_approve_id
      },
      include: {
        model: Users
      }
    })
    .then((one_list_approve, err) => {
      if(err){
        res.json(err)
      }else{
        one_list_approve.status = true,
        one_list_approve.save()
        res.json(one_list_approve)
      }
    })
}

/*
  * method: DELETE
  * end point: /api/list_approves/:list_approve_id
*/
let deleteListApprove = (req, res) => {
  List_approves
    .destroy({
      where: {
        id: req.params.list_approve_id
      }
    })
    .then((deleted_list_approve, err) => {
      if(err){
        res.json(err)
      }else{
        res.json(deleted_list_approve)
      }
    })
}


module.exports = {
  createListApprove,
  editListApprove,
  deleteListApprove,
  getAllListPostBy
}
