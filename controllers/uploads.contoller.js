const { response, request } = require("express");
const { uploadFiles } = require("../helpers")

const uploadFile = async (req = request, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
    res.status(400).send({msg: 'No hay archivos en la petición'});
    return;
  }

  try {
    // EXAMPLE (txt,md)
    // const name = await  uploadFiles(req.files, ['txt','md'], 'text');

    // Images
    const name = await  uploadFiles(req.files, undefined, 'img');
    res.json({ name })
  }
  catch (msg) {
    res.status(400).send({ msg });
  }

};


module.exports = {
  uploadFile
};
