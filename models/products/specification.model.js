module.exports = (sequelize, Sequelize) => {
   const Specification = sequelize.define("specification", {
      product_id: {
         type: Sequelize.INTEGER
      },
      pdf_specification: {
         type: Sequelize.TEXT,
      }
   });
 
   return Specification;
 };