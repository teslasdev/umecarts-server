const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;

const { S3_ENDPOINT, BUCKET_NAME ,  ACCESS_KEY_ID , SECRET_KEY} = process.env;
console.log(S3_ENDPOINT);

const spacesEndpoint = new aws.Endpoint(S3_ENDPOINT);

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_KEY
});

exports.upload = multer({
  storage: multerS3({
    s3,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: `${Date.now()}-${file.originalname}`,
      });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    },
  }),
}).array('files', 100);


exports.getFiles = () => {
  var params = {
    Bucket: BUCKET_NAME, 
    Key: BUCKET_NAME, 
    ACL: 'public-read'
  };

  s3.putObject(params, async function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}
