const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Shop = db.shop;
const Wallet = db.wallet;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  const roleCont =[]
  const uniqueId = 'UM' + Math.floor(Math.random() * 999999);
  const {firstname , lastname , email , password, role , shopName , shopAddress } = req.body
  roleCont.push(role)
  console.log(roleCont)
  Wallet.create().then(wallet => {
    User.create({firstname: firstname, lastname: lastname, uniqueId : uniqueId, email: email, password: bcrypt.hashSync(password, 8) , walletId : wallet.id })
    .then(user => {
      if (role) {
         Role.findAll({
          where: {
            name: {
              [Op.or]: roleCont
            }
          }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              return res.status(200).send({ 
              message: "User was registered successfully!", 
              data : uniqueId 
            });
            });
          });
          if(role === "Seller") {
            Shop.create({userId : user.id , shopName : shopName , shopLocation : shopAddress}).then(shop => {
              console.log('Shop Created')
            })
          }
      } else { 
        // user role = 1
        user.setRoles([1]).then(() => {
          return res.status(200).send({ 
            message: "User was registered successfully!", 
            data : uniqueId 
          });
        });
      }
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  })
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
        Shop.findOne({ where : 
          {
            userId : user.id
          }
        }).then(shop => {
          return res.status(200).send({
            id: user.id,
            email: user.email,
            uniqueId: user.uniqueId,
            accessToken: token,
            role : authorities,
            shop
          });
        })
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getMe = async (req, res) => {
	try {
		const user = await User.findByPk(req.userId ,{include: [Wallet]}).then(user => {
      Shop.findOne(
        { where : {
          userId : req.userId
        },
      }).then(shop => {
        return res.status(200).json({
          success: true,
          data : {
            user,
            shop
          },
        });
      })
    })
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
};