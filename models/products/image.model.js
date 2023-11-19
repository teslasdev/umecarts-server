module.exports = (sequelize, Sequelize) => {
   const Image = sequelize.define("image", {
      galleries: {
         type: Sequelize.TEXT,
         get : function () {
            return JSON.parse(this.getDataValue('galleries'));
         },
         set : function(value) {
            return this.setDataValue('galleries' , JSON.stringify(value));
         }
      },
      thumbnails: {
         type: Sequelize.TEXT,
         get : function () {
            return JSON.parse(this.getDataValue('thumbnails'));
         },
         set : function(value) {
            return this.setDataValue('thumbnails' , JSON.stringify(value));
         }
      },
   });
 
   return Image;
 };