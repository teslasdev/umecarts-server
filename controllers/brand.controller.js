const db = require("../models");
const Brand = db.brand;
const Op = db.Sequelize.Op;
// Create and Save a new Brand
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
   // Create a Brand
   const brand = {
      categoryId: req.body.categoryId,
      name: req.body.name,
      addBy: req.body.addBy,
      published: req.body.published ? req.body.published : false
   };

   // Save Brand in the database
   Brand.create(brand)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Brand."
         });
   });
};

// Retrieve all Brand from the database.
exports.findAll = (req, res) => {
   const categoryId = req.params.categoryId;
   var condition = categoryId ? { categoryId: { [Op.like]: `%${categoryId}%` } } : null;
 
   Brand.findAll({ where: condition })
      .then(brand => {
         res.status(200).json({
          success: true,
          data : {
            brand
          },
        });
      })
      .catch(err => {
         res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Brand."
         });
      });
};

// Find a single Brand with an id
exports.findOne = (req, res) => {
   const id = req.params.id;
   Brand.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Brand with id=${id}.`
          });
        }
      })
      .catch(err => {
         res.status(500).send({
           message: "Error retrieving Brand with id=" + id
         });
      });
};

// Update a Brand by the id in the request
exports.update = (req, res) => {
   const id = req.params.id;
 
   Brand.update(req.body, {
     where: { id: id }
   })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Brand was updated successfully."
       });
     } else {
       res.send({
         message: `Cannot update Brand with id=${id}. Maybe Brand was not found or req.body is empty!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error updating Brand with id=" + id
     });
   });
};

// Delete a Brand with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;
 
   Brand.destroy(req.body, {
     where: { id: id }
   })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Brand was deleted successfully."
       });
     } else {
       res.send({
         message: `Cannot delete Brand with id=${id}. Maybe Brand was not found or req.body is empty!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error deleting Brand with id=" + id
     });
   });
};

// Delete all Brand from the database.
exports.deleteAll = (req, res) => {
   Brand.destroy({
     where: {},
     truncate: false
   })
     .then(nums => {
       res.send({ message: `${nums} Brand were deleted successfully!` });
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while removing all Brand."
       });
     });
 };

// Find all published Brand
exports.findAllPublished = (req, res) => {
   Brand.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Brand."
         });
      });
 };