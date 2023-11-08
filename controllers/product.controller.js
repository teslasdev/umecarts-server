const db = require("../models");
const Information = db.informaton; 
const Products = db.category;
const Product = db.products 
const Op = db.Sequelize.Op;
// Create and Save a new Products
exports.create = (req, res) => {
  const {
    productName,
    productCategoryId,
    productBrands,
    productUnit,
    productQuantity,
    productTags
  } = req.body

  // Validate request
  if (!productName) {
    res.status(400).send({
      message: "Product Name can not be empty!"
    });
    return;
  }
  // Create a Tutorial
  const information = {
    product_name: productName,
    category : productCategoryId,
    brands : productBrands,
    unit : productUnit,
    quantity : productQuantity,
    tags : productTags
  };

 // Save Information in the database
  Information.create(information)
  .then(data => {
    Product.create({information_id : data.id})
    .then(data => {
      console.log(data)
    })
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the Category."
    });
  });

};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Products with an id
exports.findOne = (req, res) => {
   
};

// Update a Products by the id in the request
exports.update = (req, res) => {
   
};

// Delete a Products with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;
 
   Products.destroy(req.body, {
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

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
   Products.destroy({
     where: {},
     truncate: false
   })
     .then(nums => {
       res.send({ message: `${nums} Products were deleted successfully!` });
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while removing all Products."
       });
     });
 };

// Find all published Products
exports.findAllPublished = (req, res) => {
   Products.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Products."
         });
      });
};

// Retrieve all Products Tag from the database.
exports.findAllTags = (req, res) => {
  try {
    Information.findAll({
      where : {
        user_id : req.userId
      }
    }).then(data => {
      if(!data) {
        res.status(404).send("No products")
      }

      res.status(200).json({
        data
      })
      
    })
  }
  catch (err) {
		return res.status(500).send({ message: err.message });
	}
};



