module.exports = (sequelize, Sequelize) => {
   const Wallet = sequelize.define("wallet", {
      user_id: {
         type: Sequelize.INTEGER,
         defaultValue: 0
      },
      current_balance: {
         type: Sequelize.INTEGER,
         defaultValue: 0
      },
      total_sale: {
         type: Sequelize.INTEGER,
         defaultValue: 0
      },
      total_earnings: {
         type: Sequelize.INTEGER,
         defaultValue: 0
      },
      product_ordered: {
         type: Sequelize.INTEGER,
         defaultValue: 0
      },
      total_spent: {
         type: Sequelize.INTEGER,
         defaultValue: 0
      },
      cart: {
         type: Sequelize.INTEGER,
         defaultValue: 0
      },
      new_order: {
         type: Sequelize.INTEGER,
         defaultValue: 0
      },
      completed_order: {
         type: Sequelize.INTEGER,
         defaultValue: 0
      },
      canceled_order: {
         type: Sequelize.INTEGER,
         defaultValue: 0
      },
   });
 
   return Wallet;
 };