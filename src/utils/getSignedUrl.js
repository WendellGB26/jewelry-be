const AWS = require('aws-sdk');
require('dotenv').config();

// Configura las credenciales de AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4'
});

// Crea un nuevo objeto S3
const s3 = new AWS.S3();

// Función para obtener la URL firmada de la imagen
function getSignedUrl(bucketName, objectKey) {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Expires: 3600 // El tiempo en segundos antes de que la URL expire
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
}

module.exports = { getSignedUrl };
