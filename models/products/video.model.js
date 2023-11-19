module.exports = (sequelize, Sequelize) => {
   const Video = sequelize.define("video", {
      provider: {
         type: Sequelize.TEXT,
      },
      link: {
         type: Sequelize.TEXT,
      },
   });
 
   return Video;
 };