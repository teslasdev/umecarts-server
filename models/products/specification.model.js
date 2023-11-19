module.exports = (sequelize, Sequelize) => {
   const Specification = sequelize.define("specification", {
      pdf_specification: {
         type: Sequelize.TEXT,
      }
   });
 
   return Specification;
 };