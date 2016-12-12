/*
  * Models
*/
const models = require ('../models')
const Notifications = models.Notifications

/*
  * method: POST
  * end point : /api/notif
*/
let createOneNotif = (req, res) => {
  Notifications
    .create({
      notificationId: req.body.notificationId,
      message: req.body.message,
      status: false
    })
    .then((new_notif, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        res.json(new_notif)
      }
    })
}
/*
  * method: PUT
  * end point : /api/notif/:notifid
*/
let editOneNotif = (req, res) => {
  Notifications
    .findOne({
      where: {
        id: req.params.notifid
      }
    })
    .then((one_notif, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        one_notif.status = true
        one_notif.save()

        res.json(one_notif)
      }
    })
}
/*
  * method: DELETE
  * end point : /api/notif/:notifid
*/
let deleteOneNotif = (req, res) => {
  Notifications
    .destroy({
      where: {
        id: req.params.notifid
      }
    })
    .then((deleted_notif, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        res.json(deleted_notif)
      }
    })
}


module.exports = {
  createOneNotif,
  editOneNotif,
  deleteOneNotif
}
