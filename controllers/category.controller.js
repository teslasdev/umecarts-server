const db = require("../models");
const Categories = db.category;
const Brand = db.brand;
const Op = db.Sequelize.Op;
// Create and Save a new Categories
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
 // Create a Tutorial
  const category = {
    name: req.body.name,
    addBy: req.body.addBy,
    published: req.body.published ? req.body.published : false
  };
 // Save Categories in the database
 Categories.create(category)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
      res.status(500).send({
         message:
         err.message || "Some error occurred while creating the Category."
      });
   });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
   const name = req.query.name;
   var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
   const categoryId = req.params.categoryId;
   var brandcondition = categoryId ? { categoryId: { [Op.like]: `%${categoryId}%` } } : null;
     Categories.findAll({ where: condition })
      .then(category => {
        Brand.findAll({ where: brandcondition })
        .then(brand => {
        res.status(200).json({
          success: true,
          data : {
            category,
            brand
          },
        });
      })
    })
      .catch(err => {
         res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Categories."
         });
      });
};

// Find a single Categories with an id
exports.findOne = (req, res) => {
   const id = req.params.id;
   Categories.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Category with id=${id}.`
          });
        }
      })
      .catch(err => {
         res.status(500).send({
           message: "Error retrieving Category with id=" + id
         });
      });
};

// Update a Categories by the id in the request
exports.update = (req, res) => {
   const id = req.params.id;
 
   Categories.update(req.body, {
     where: { id: id }
   })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Category was updated successfully."
       });
     } else {
       res.send({
         message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error updating Category with id=" + id
     });
   });
};

// Delete a Categories with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;
 
   Categories.destroy(req.body, {
     where: { id: id }
   })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Category was deleted successfully."
       });
     } else {
       res.send({
         message: `Cannot delete Category with id=${id}. Maybe Category was not found or req.body is empty!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error deleting Category with id=" + id
     });
   });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
   Categories.destroy({
     where: {},
     truncate: false
   })
     .then(nums => {
       res.send({ message: `${nums} Categories were deleted successfully!` });
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while removing all Categories."
       });
     });
 };

// Find all published Categories
exports.findAllPublished = (req, res) => {
   Categories.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Categories."
         });
      });
 };