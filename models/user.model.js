module.exports = (sequelize, Sequelize) => {
   const User = sequelize.define("users", {
      firstname: {
         type: Sequelize.STRING
      },
      lastname: {
         type: Sequelize.STRING
      },
      uniqueId: {
         type: Sequelize.TEXT
      },
      email: {
         type: Sequelize.STRING
      },
      walletId: {
         type: Sequelize.INTEGER,
      },
      phone_number: {
         type: Sequelize.TEXT,
      },
      bank_details: {
         type: Sequelize.TEXT,
         get : function () {
            return JSON.parse(this.getDataValue('bank_details'));
         },
         set : function(value) {
            return this.setDataValue('bank_details' , JSON.stringify(value));
         }
      },
      profile_picture: {
         type: Sequelize.TEXT,
      },
      password: {
         type: Sequelize.STRING
      }
   });
 
   return User;
 };