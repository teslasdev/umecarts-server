const db = require("../models");
const User = db.user;
exports.update = (req, res) => {
  console.log(req.body)
  const {firstname , lastname , email ,profile_picture,phone_number, bank_details} = req.body
  const updateData = {
    firstname :firstname,
    lastname: lastname,
    email : email,
    bank_details : bank_details,
    profile_picture: profile_picture,
    phone_number : phone_number
  }
  User.update(updateData , {
    where: {
      id: req.userId
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update User with id=${req.userId}. Maybe User was not found`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating User with id="+req.userId
    });
    console.log(err)
  });
};
 