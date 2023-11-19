const express = require("express");
const cors = require("cors");
const  dotenv  = require('dotenv');
const app = express();

dotenv.config();
// var corsOptions = {
//   origin: "https://umecarts.vercel.app/"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Routes
//Authentication Rountes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/general.routes')(app);
// DATABASE INIT

const db = require("./models");
const Role = db.role;
db.sequelize.sync().then(() => {
   console.log('Drop and Resync Db');
});

function initial() {
   Role.create({
     id: 1,
     name: "Buyer"
   });
  
   Role.create({
     id: 2,
     name: "Seller"
   });
  
   Role.create({
     id: 3,
     name: "Admin"
   });
 }
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});