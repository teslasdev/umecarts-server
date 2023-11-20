module.exports = {
   HOST:   process.env.DB_HOST,
   USER:  process.env.DB_USER,
   PASSWORD: process.env.DB_PASS,
   DB: process.env.DB_SERVER,
   dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    port : process.env.DB_PORT
};

// module.exports = {
//   HOST: "db-mysql-nyc3-18481-do-user-10286398-0.c.db.ondigitalocean.com",
//   USER: "doadmin",
//   PASSWORD: "AVNS_17f5CtDALkQtu6Xz2jn",
//   DB: "defaultdb",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   port : 25060
// };
