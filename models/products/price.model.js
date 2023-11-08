module.exports = (sequelize, Sequelize) => {
   const Price = sequelize.define("price", {
      product_id: {
         type: Sequelize.INTEGER
      },
      unit_price: {
         type: Sequelize.INTEGER,
      },
      discount_date_range: {
         type: Sequelize.TEXT,
         get : function () {
            return JSON.parse(this.getDataValue('discount_date_range'));
         },
         set : function(value) {
            return this.setDataValue('discount_date_range' , JSON.stringify(value));
         }
      },
      discount_price: {
         type: Sequelize.INTEGER,
      },
      external_link : {
         type: Sequelize.TEXT,
      }
   });
 
   return Price;
 };