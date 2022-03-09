const path = require('path')
const { v4: uuidv4 } = require('uuid');

const { response, request } = require("express");

const uploadFile = async (req = request, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
    res.status(400).send({msg: 'No hay archivos en la petición'});
    return;
  }

  const { archivo } = req.files;
  const modifyName = archivo.name.split('.');
  const format = modifyName[ modifyName.length - 1 ];

  // Validate the format
  const validateFormat = ['png','jpg','jpeg','gif'];
  if (!validateFormat.includes(format.toLowerCase())) {
    return res.status(400).json({
      msg: `La extension ${ format } no es permitida, ${ validateFormat }`
    });
  }

  const finalName = uuidv4() + '.' + format;
  const uploadPath = path.join( __dirname , '../uploads/' , finalName );

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg:'File uploaded to ' + uploadPath });
  });
};


module.exports = {
  uploadFile
};
