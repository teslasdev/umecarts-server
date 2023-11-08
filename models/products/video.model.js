module.exports = (sequelize, Sequelize) => {
   const Video = sequelize.define("video", {
      product_id: {
         type: Sequelize.INTEGER
      },
      provider: {
         type: Sequelize.TEXT,
      },
      link: {
         type: Sequelize.TEXT,
      },
   });
 
   return Video;
 };