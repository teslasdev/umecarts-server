module.exports = (sequelize, Sequelize) => {
   const Products = sequelize.define("products", {
      user_id: {
         type: Sequelize.INTEGER,
      },
      shop_id: {
         type: Sequelize.INTEGER,
      },
      information_id: {
         type: Sequelize.INTEGER,
      },
      images_id: {
         type: Sequelize.INTEGER,
      },
      videos_id: {
         type: Sequelize.INTEGER,
      },
      variations_id: {
         type: Sequelize.INTEGER,
      },
      price_id: {
         type: Sequelize.INTEGER,
      },
      description_id: {
         type: Sequelize.INTEGER,
      },
      specification_id: {
         type: Sequelize.INTEGER,
      },
      isPublished: {
         type: Sequelize.BOOLEAN,
         default : false,
      }
   });
 
   return Products;
 };