module.exports = (sequelize, Sequelize) => {
   const Meta = sequelize.define("meta", {
      title: {
         type: Sequelize.STRING
      },
      image: {
         type: Sequelize.TEXT,
         get : function () {
            return JSON.parse(this.getDataValue('image'));
         },
         set : function(value) {
            return this.setDataValue('image' , JSON.stringify(value));
         }
      },
      description : {
         type: Sequelize.TEXT
      },
      slug : {
         type: Sequelize.STRING
      }
   });
 
   return Meta;
 };