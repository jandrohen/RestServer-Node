const { response, request } = require("express");
const { uploadFiles } = require("../helpers")

const uploadFile = async (req = request, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
    res.status(400).send({msg: 'No hay archivos en la petición'});
    return;
  }

  // Images
  const name = await  uploadFiles(req.files);

  res.json({ name })
};


module.exports = {
  uploadFile
};
