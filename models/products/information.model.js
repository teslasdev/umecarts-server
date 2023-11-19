module.exports = (sequelize, Sequelize) => {
   const Information = sequelize.define("information", {
      user_id: {
         type: Sequelize.INTEGER,
      },
      product_name: {
         type: Sequelize.STRING
      },
      categoryId: {
         type: Sequelize.INTEGER
      },
      brands: {
         type: Sequelize.STRING
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
      description : {
         type: Sequelize.TEXT,
      },
      low_quantity : {
         type: Sequelize.INTEGER,
      },
      stock_quantity : {
         type: Sequelize.BOOLEAN,
      },
      stock_with_text : {
         type: Sequelize.BOOLEAN,
      },
      stock_visible : {
         type: Sequelize.BOOLEAN,
      },
      cash_refund : {
         type: Sequelize.BOOLEAN,
      },
      cash_on_delivery : {
         type: Sequelize.BOOLEAN,
      },
      cash_refund : {
         type: Sequelize.BOOLEAN,
      },
      cash_refund : {
         type: Sequelize.BOOLEAN,
      },
      shipping_days : {
         type: Sequelize.INTEGER,
      }
   });
   return Information;
 };