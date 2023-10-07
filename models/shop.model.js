module.exports = (sequelize, Sequelize) => {
   const Shop = sequelize.define("shops", {
      userId: {
         type: Sequelize.INTEGER,
      },
      shopName: {
         type: Sequelize.STRING
      },
      shopLocation: {
         type: Sequelize.STRING
      }
   });
   return Shop;
};