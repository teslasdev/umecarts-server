const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Shop = db.shop;

checkDuplicateShopOrEmail = (req, res, next) => {
   // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      Shop.findOne({
         where: {
           shopName: req.body.shopName ?  req.body.shopName : ''
         }
       }).then(shop => {
         if (shop) {
            res.status(400).send({
             message: "Failed! Shop Name Exists , Try another One"
            });
           return;
         }
         next();
       });
    });


};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateShopOrEmail: checkDuplicateShopOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;