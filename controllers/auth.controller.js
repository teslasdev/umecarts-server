const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Shop = db.shop;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  const {firstname , lastname , email , password, role , shopName , shopAddress } = req.body
  User.create({firstname: firstname, lastname: lastname,email: email, password: bcrypt.hashSync(password, 8)})
   .then(user => {
      if (role) {
         Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
          }).then(role => {
            user.setRoles(role).then(() => {
              return res.status(200).send({ message: "User was registered successfully!" });
            });
          });
          if(role === "Seller") {
            Shop.create({userId : user.id , shopName : shopName , shopLocation : shopAddress}).then(shop => {
              console.log(shop)
            })
          }
      } else { 
        // user role = 1
        user.setRoles([1]).then(() => {
         return res.status(200).send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
         config.secret,
         {
           algorithm: 'HS256',
           allowInsecureKeySizes: true,
           expiresIn: 86400, // 24 hours
         });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
         return res.status(200).send({
            id: user.id,
            email: user.email,
            roles: authorities,
            accessToken: token
         });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};