module.exports = (sequelize, Sequelize) => {
   const Price = sequelize.define("price", {
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
      discount: {
         type: Sequelize.TEXT,
      },
      discount_flat: {
         type: Sequelize.INTEGER,
      },
      discount_percentage: {
         type: Sequelize.INTEGER,
      },
   });
 
   return Price;
 };