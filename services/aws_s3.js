const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const config = require("config");
const newUUID = require("uuid");
const aws_s3 = config.get("services.aws_s3");
const uuid = newUUID.v4();

AWS.config.update({
  accessKeyId: aws_s3.access_key,
  secretAccessKey: aws_s3.secret,
  region: aws_s3.region
});


// var filePath = ;
const save = () => {
  const s3 = new AWS.S3();
  // const uuid = newUUID.v4();
  const params = {
    Bucket: aws_s3.bucket,
    Key: "aipundit/intro.wav",
    Body: fs.createReadStream(__dirname + "/../assets/audios/intro.wav"),
    ACL: "public-read-write",
    ContentType: "audio/wav"
  };
  s3.upload(params, function(err, data) {
    //handle error
    if (err) {
      console.log("Error", err);
    }

    //success
    if (data) {
      console.log("Uploaded in:", data.Location);
    }
  });
};

save();
