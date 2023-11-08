module.exports = (sequelize, Sequelize) => {
   const Information = sequelize.define("information", {
      user_id: {
         type: Sequelize.INTEGER,
      },
      product_id: {
         type: Sequelize.INTEGER
      },
      product_name: {
         type: Sequelize.STRING
      },
      category: {
         type: Sequelize.INTEGER
      },
      brands: {
         type: Sequelize.TEXT,
         get : function () {
            return JSON.parse(this.getDataValue('brands'));
         },
         set : function(value) {
            return this.setDataValue('brands' , JSON.stringify(value));
         }
      },
      unit: {
         type: Sequelize.STRING,
      },
      quantity: {
         type: Sequelize.INTEGER,
      },
      tags: {
         type: Sequelize.TEXT,
         get : function () {
            return JSON.parse(this.getDataValue('tags'));
         },
         set : function(value) {
            return this.setDataValue('tags' , JSON.stringify(value));
         }
      },
   });
 
   return Information;
 };