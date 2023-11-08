module.exports = (sequelize, Sequelize) => {
   const Category = sequelize.define("categories", {
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
 
   return Category;
 };