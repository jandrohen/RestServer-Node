const { response, request } = require("express");
const { uploadFiles } = require("../helpers");

const { User, Product} = require("../models");

const uploadFile = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).send({ msg: "No hay archivos en la petición" });
    return;
  }

  try {
    // EXAMPLE (txt,md)
    // const name = await  uploadFiles(req.files, ['txt','md'], 'text');

    // Images
    const name = await uploadFiles(req.files, undefined, "img");
    res.json({ name });
  } catch (msg) {
    res.status(400).send({ msg });
  }
};

const updateImage = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).send({ msg: "No hay archivos en la petición" });
    return;
  }
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "No he validado esto" });
  }

  const name = await uploadFiles( req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json(model);
};

module.exports = {
  uploadFile,
  updateImage
};
