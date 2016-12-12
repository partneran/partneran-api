/*
  * Models
*/
const models = require ('../models')
const Reports = models.Reports

/*
  * method: POST
  * end point : /api/ideas/:ideaid/reports/
*/
let addOneReport = (req, res) => {
  Reports
    .create({
      reportId: req.body.reportId,
      reason: req.body.reason,
      status: false
    })
    .then((new_report, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        res.json(new_report)
      }
    })
}
/*
  * method: GET
  * end point : /api/ideas/:ideaid/reports/
*/
let showAllReports = (req, res) => {
  Reports
  .findAll()
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
