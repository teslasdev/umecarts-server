const { authJwt } = require("../middleware");
const db = require("../models");
const Gallery = db.gallery;

module.exports = function(app) {
   const upload = require("../controllers/file.controller");
   const gallery = require("../controllers/gallery.controller");
   const category = require("../controllers/category.controller");
   const brand = require("../controllers/brand.controller");
   const product = require("../controllers/product.controller");


    // *******Category******** //
   app.post("/api/category", category.create);
   app.get("/api/category/:categoryId", category.findAll);

   // *******Brands******** //
   app.post("/api/brand", brand.create);
   app.get("/api/brand/:categoryId", brand.findAll);

   // *******Products Routes******** //
   app.post("/api/product",[authJwt.verifyToken],product.create);
   app.get("/api/product/tags",[authJwt.verifyToken], product.findAllTags);
   app.get("/api/product/", [authJwt.verifyToken],product.findAll);
   app.put("/api/product/status/:id", product.findAndUpdate);
   app.get("/api/product/:id", product.findOne);
   app.get("/api/product/slug/:slug", product.findbySlug);
   // *******Upload******** //
   app.post("/api/upload", upload.upload ,[authJwt.verifyToken],uploadFiles)
   app.get("/api/getFiles", upload.getFiles)
   app.get("/api/gallery",[authJwt.verifyToken],gallery.getGallery)

   async function uploadFiles(req, res ) {
      try {
         if(!req.files) {
            return res.status(400).send({ message: err.message });
         }
         for(let i = 0; i <= req.files.length; i++ ) {
            Gallery.create({userId : req.userId , link : req.files[i]['key'] , size : req.files[i]['size']})
            console.log('Uploaded file::' , req.files[i][key])
         }
      } catch (err) {
         console.log("Err:::", err)
      }
   }
};