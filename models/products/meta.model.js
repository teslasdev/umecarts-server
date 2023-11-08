module.exports = (sequelize, Sequelize) => {
   const Meta = sequelize.define("meta", {
      product_id: {
         type: Sequelize.INTEGER
      },
      title: {
         type: Sequelize.STRING
      },
      pdf_specification: {
         type: Sequelize.TEXT,
      },
      description: {
         type: Sequelize.TEXT
      },
      slug : {
         type: Sequelize.STRING
      }
   });
 
   return Meta;
 };