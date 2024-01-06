module.exports = (sequelize, Sequelize) => {
   const Cart = sequelize.define("cart", {
      user_id: {
         type: Sequelize.INTEGER,
      },
      ipAddress : {
         type: Sequelize.TEXT,
      },
      product: {
         type: Sequelize.TEXT,
         get : function () {
            return JSON.parse(this.getDataValue('product'));
         },
         set : function(value) {
            return this.setDataValue('product' , JSON.stringify(value));
         }
      },
      shipping_id : {
         type: Sequelize.INTEGER,
      },
      delivery_id: {
         type: Sequelize.INTEGER,
      },
      payment_type: {
         type: Sequelize.INTEGER,
      },
      status: {
         type: Sequelize.INTEGER,
      },
   });
 
   return Cart;
 };