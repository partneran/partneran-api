/*
  * Models
*/
const models = require ('../models')
const Categories = models.Categories

/*
  * get all Categories
  * method: GET
  * end point : /api/categories
*/
let getAllCategories = (req, res) => {
  Categories
    .findAll()
    .then((all_categories, err) => {
      if(err){
        res.json(err)
      }else{
        res.json(all_categories)
      }
    })
}

module.exports = {
  getAllCategories
}
