module.exports = (sequelize, Sequelize) => {
   const Image = sequelize.define("image", {
      product_id: {
         type: Sequelize.INTEGER
      },
      gallaries: {
         type: Sequelize.TEXT,
         get : function () {
            return JSON.parse(this.getDataValue('gallary'));
         },
         set : function(value) {
            return this.setDataValue('gallary' , JSON.stringify(value));
         }
      },
      thumbnails: {
         type: Sequelize.TEXT,
         get : function () {
            return JSON.parse(this.getDataValue('thumbnail'));
         },
         set : function(value) {
            return this.setDataValue('thumbnail' , JSON.stringify(value));
         }
      },
   });
 
   return Image;
 };