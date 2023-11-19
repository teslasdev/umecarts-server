const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    port : config.port
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.shop = require("../models/shop.model.js")(sequelize, Sequelize);
db.products = require("../models/products/products.model.js")(sequelize, Sequelize);
db.informaton = require("../models/products/information.model.js")(sequelize, Sequelize);
db.Image = require("../models/products/image.model.js")(sequelize, Sequelize);
db.video = require("../models/products/video.model.js")(sequelize, Sequelize);
db.price = require("../models/products/price.model.js")(sequelize, Sequelize);
db.specification = require("../models/products/specification.model.js")(sequelize, Sequelize);
db.meta = require("./products/meta.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);
db.brand = require("../models/brand.model.js")(sequelize, Sequelize);
db.gallery = require("../models/gallery.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});
  db.user.belongsToMany(db.role, {
   through: "user_roles"
  });

db.ROLES = ["Buyer", "Seller", "Admin"];

module.exports = db;