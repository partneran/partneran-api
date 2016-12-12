/*
  * Models
*/
const models = require ('../models')
const Reports = models.Reports
const Users = models.Users

/*
  * method: POST
  * end point : /api/ideas/:ideaid/reports/
*/
let addOneReport = (req, res) => {
  Reports
    .create({
      reportId: req.body.reportId,
      reason: req.body.reason,
      status: false,
      UserId: req.body.UserId,
      IdeaId: req.params.ideaid
    })
    .then((new_report, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        // res.json(new_report)
        Reports.findOne({
          where: {
            id: new_report.id
          },
          include: {
            model: Users
          }
        }).then((one_report, err) => {
          if(err){
            res.json(err)
          }else{
            res.json(one_report)
          }
        })
      }
    })
}
/*
  * method: GET
  * end point : /api/ideas/:ideaid/reports/
*/
let showAllReports = (req, res) => {
  Reports
  .findAll({
    include: {
      model: Users
    }
  })
  .then((all_reports, err) => {
    if(err){
      console.log(err)
      res.json(err)
    }else{
      res.json(all_reports)
    }
  })
}
/*
  * method: DELETE
  * end point : /api/ideas/:ideaid/reports/:reportid
*/
let deleteOneReport = (req, res) => {
  Reports
    .destroy({
      where: {
        id: req.params.reportid
      }
    })
    .then((deleted_report, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        res.json(deleted_report)
      }
    })
}


module.exports = {
  addOneReport,
  showAllReports,
  deleteOneReport
}
