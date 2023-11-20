const { authJwt } = require("../middleware");


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
   app.get("/api/product/:id", product.findOne);
   app.get("/api/product/slug/:slug", product.findbySlug);

   // *******Upload******** //
   app.post("/api/upload", upload.upload , uploadFiles)
   app.get("/api/getFiles", upload.getFiles)
   app.get("/api/gallery",[authJwt.verifyToken],gallery.getGallery)
   app.post("/api/gallery",[authJwt.verifyToken],gallery.addGallery)

   async function uploadFiles(req, res) {
      console.log('success') 
   }
};