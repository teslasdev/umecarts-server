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
      password: {
         type: Sequelize.STRING
      }
   });
 
   return User;
 };