/*
  * Models
*/
const models = require ('../models')
const Votes = models.Votes

/*
  * method : POST
  * End Point : /api/ideas/:ideaid/votes/
*/
let upVote = (req, res) => {
  Votes
    .create({
      voteId: req.body.voteId,
      votes: req.body.votes
    })
    .then((new_vote, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        req.json(new_vote)
      }
    })
}

/*
  * method : GET
  * End Point : /api/ideas/:ideaid/votes/:voteid
*/
let getCountVote = (req, res) => {
  Votes
    .findAndCountAll({
      where: {
        id: req.params.voteid
      }
    })
    .then((votes, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        res.json(votes)
      }
    })
}

/*
  * method : DELETE
  * End Point : /api/ideas/:ideaid/votes/:voteid
*/
let downVote = (req, res) => {
  Votes
    .destroy({
      where: {
        id: req.params.voteid
      }
    })
    .then((deleted_vote, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        res.json(deleted_vote)
      }
    })
}


module.exports = {
  upVote,
  getCountVote,
  downVote
}
