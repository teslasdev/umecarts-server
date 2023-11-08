module.exports = (sequelize, Sequelize) => {
   const Brand = sequelize.define("brands", {
      categoryId: {
         type: Sequelize.INTEGER
      },
      name: {
         type: Sequelize.STRING
      },
      addBy: {
         type: Sequelize.STRING
      },
      published: {
         type: Sequelize.BOOLEAN
      }
   });
 
   return Brand;
 };