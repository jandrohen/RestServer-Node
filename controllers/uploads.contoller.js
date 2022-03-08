const { response, request } = require("express");

const uploadFile = async (req = request, res = response) => {

  res.json({
    msg: "Uploading file"
  })
};


module.exports = {
  uploadFile
};
