const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');
const s3 = new AWS.S3();

module.exports = async (file) => {
  const fileName = uuid();

  const { BUCKET_NAME, BUCKET_URL } = process.env;

  const params = {
    Body: file.buffer,
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  try {
    await s3.putObject(params).promise();
    return `${BUCKET_URL}/${fileName}`;
  } catch (err) {
    console.log(err);
  }
};
