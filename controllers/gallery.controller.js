const db = require("../models");
const config = require("../config/auth.config");
const Gallery = db.gallery;

exports.addGallery = async (req, res) => {
	try {
      if(!req.body) {
         return res.status(400).send({ message: err.message });
      }
		Gallery.create({userId : req.userId , link : req.body.fileName , size : req.body.size}).then(link => {
         res.send({
            message: "Files was Updated successfully."
         });
      })
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
};


exports.getGallery = async (req, res) => {
	try {
      const findShop = await Gallery.findAll(
         { where : {
            userId : req.userId
         }
      }).then(gallery => {
         return res.status(200).json({
            success: true,
            data : {
              gallery
            },
         });
      })

      if(!findShop) {
         return res.status(404).json({
            success: false,
            message : 'No Gallery Found'
         });
      }
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
};