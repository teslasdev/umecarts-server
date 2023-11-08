module.exports = (sequelize, Sequelize) => {
   const Gallery = sequelize.define("galleries", {
      userId: {
         type: Sequelize.INTEGER
      },

      link: {
         type: Sequelize.TEXT
      },
      size: {
         type: Sequelize.INTEGER
      },
   });
 
   return Gallery;
 };