const db = require("../models");
const Information = db.informaton;
const Product = db.products;
const Image = db.Image;
const Video = db.video;
const Price = db.price;
const Meta = db.meta;
const Cart = db.cart;
const Wallet = db.wallet;
const Op = db.Sequelize.Op;
// Create and Save a new Products
exports.create = (req, res) => {
  const {
    meta_description,
    meta_title,
    quantity,
    discount_Percentage,
    discount_Flat,
    unit_price,
    unit,
    video_link,
    product_name,
    brands,
    tags,
    thumb,
    gallery,
    provider,
    flat,
    meta_image,
    meta_slug,
    discount_date_range,
    low_quantity,
    stock_quantity,
    stock_with_text,
    stock_visible,
    cash_refund,
    cash_on_delivery,
    shipping_days,
    categoryId,
    description,
  } = req.body;

  // Create a Information
  const information = {
    user_id: req.userId,
    product_name,
    categoryId,
    brands,
    unit,
    quantity,
    tags,
    description,
    low_quantity,
    stock_quantity,
    stock_with_text,
    stock_visible,
    cash_refund,
    cash_on_delivery,
    shipping_days,
  };

  // Create a Image
  const image = {
    galleries: gallery,
    thumbnails: thumb,
  };

  // Create a Video
  const video = {
    provider,
    link: video_link,
  };

  // Create a Price
  const price = {
    unit_price: unit_price,
    discount_date_range: discount_date_range,
    discount: flat,
    discount_flat: discount_Flat,
    discount_percentage: discount_Percentage,
  };
  // Save Information in the database
  Information.create(information)
    .then((data) => {
      Image.create(image).then((image) => {
        Video.create(video).then((video) => {
          Price.create(price).then((price) => {
            Product.create({
              user_id: req.userId,
              information_id: data.id,
              images_id: image.id,
              videos_id: video.id,
              price_id: price.id,
            }).then((data) => {
              Meta.create({
                product_id: data.id,
                title: meta_title,
                image: meta_image,
                description: meta_description,
                slug: meta_slug,
              }).then((meta) => {
                return res.status(200).send({
                  information,
                  data,
                  meta,
                });
              });
            });
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    });
};

// Retrieve all Products from the database.
exports.findOne = (req, res) => {
  const id = req.params.id;
  Product.findByPk(id).then((product) => {
    if (product) {
      return res.status(200).send({
        data: product,
        success: true,
      });
    } else {
      res.status(404).send({
        message: `Cannot find Product with id=${id}.`,
      });
    }
  });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const id = req.userId;
  Product.findAll({
    where: {
      user_id: id,
    },
    include: [Information, Price, Image],
  }).then((product) => {
    if (product) {
      return res.status(200).send({
        product,
        success: true,
      });
    } else {
      res.status(404).send({
        message: `Cannot find Product with id=${id}.`,
      });
    }
  });
};

// Retrieve all Products from the database.
exports.findAllPublished = (req, res) => {
  Product.findAll({
    where: { isPublished: true },
    include: [Information, Price, Image, Meta],
  }).then((product) => {
    if (product) {
      return res.status(200).send({
        product,
        success: true,
      });
    } else {
      res.status(404).send({
        message: `Cannot find any product`,
      });
    }
  });
};

// Retrieve all Products from the database.
exports.findbySlug = (req, res) => {
  const slug = req.params.slug;
  Meta.findOne({
    where: {
      slug: slug,
    },
  }).then((meta) => {
    if (meta) {
      Product.findOne({
        where: {
          id: meta.product_id,
        },
      }).then((product) => {
        Information.findByPk(product.information_id).then((information) => {
          Image.findByPk(product.images_id).then((image) => {
            Price.findByPk(product.price_id).then((price) => {
              return res.status(200).send({
                product,
                meta,
                information,
                image,
                price,
                success: true,
              });
            });
          });
        });
      });
    } else {
      res.status(404).send({
        message: `Cannot find Product with id=${id}.`,
      });
    }
  });
};
// Update a Products by the id in the request
exports.update = (req, res) => {};

// Delete a Products with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Category with id=" + id,
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    });
};

// Find all published Products
exports.findAndUpdate = (req, res) => {
  const id = req.params.id;
  const { status, featured } = req.body;
  const updateData = {
    isPublished: status,
    isFeatured: featured,
  };
  Product.update(updateData, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Products was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Products with id=${id}. Maybe Products was not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Products with id=" + id,
      });
    });
};

// Retrieve all Products Tag from the database.
exports.findAllTags = (req, res) => {
  try {
    Information.findAll({
      where: {
        user_id: req.userId,
      },
    }).then((data) => {
      if (!data) {
        res.status(404).send("No products");
      }

      res.status(200).json({
        data,
      });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.addToCart = (req, res) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const {product} = req.body;
  try {
    Cart.create(
      {
        product: product,
        ipAddress : ipAddress
      }
    ).then(cart => {
      res.status(200).send({
        success : true,
      })
    })
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


exports.getUserIpAddress = (req, res) => {
  try {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    Cart.findAll({
      where : {
        ipAddress : ipAddress,
      }
    }).then(cart => {
        res.status(200).json({
          cart,
          success : true
        })
    })
    
  }
  catch(err) {
    return res.status(500).send({ message: err.message });
  }
 
}
