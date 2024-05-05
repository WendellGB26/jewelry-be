const { getClocks, createClocks, updateClocks, deleteClocks } = require('../db/clocksQueries');
const AWS = require('aws-sdk');

// Configura las credenciales de AWS
AWS.config.update({
  accessKeyId: 'TU_ACCESS_KEY_ID',
  secretAccessKey: 'TU_SECRET_ACCESS_KEY',
  region: 'TU_REGION'
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

const getClocksController = async (req, res) => {
  try {
    const clocks = await getClocks();

    // Mapea los relojes para obtener las URLs firmadas de las imágenes
    const clocksWithSignedUrls = await Promise.all(clocks.map(async clock => {
      const imageUrl = await getSignedUrl('NOMBRE_DE_TU_BUCKET', clock.imageKey);
      return { ...clock, imageUrl };
    }));

    res.json(clocksWithSignedUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Get error clock' });
  }
};

const createClocksController = async (req, res) => {
  try {
    console.log('req.body:', req.body)
    const clock = await createClocks(req.body);
    res.status(201).json(clock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Save error clock' });
  }
};

const updateClocksController = async (req, res) => {
  try {
    const { id } = req.params;
    const clock = await updateClocks(id, req.body);
    res.json(clock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update error clock' });
  }
};

const deleteClocksController = async (req, res) => {
  try {
    const { id } = req.params;
    const clock = await deleteClocks(id);
    res.json(clock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Delete error Clock' });
  }
};

module.exports = { getClocksController, createClocksController, updateClocksController, deleteClocksController };