'use strict'
const imgur = require('imgur');

const ImgUpload = (file) => {
  imgur.uploadFile(file)
    .then(function (json) {
      console.log(json.data.link);
      res.json(json.data.link);
    })
    .catch(function (err) {
      console.error(err.message);
    });
}

module.exports = {
  ImgUpload
}
