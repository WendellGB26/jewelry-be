const { getClocks, createClocks, updateClocks, deleteClocks } = require('../db/clocksQueries');
const { getSignedUrl } = require('../utils/getSignedUrl');

const getClocksController = async (req, res) => {
  const { genero } = req.params;
  try {
    const clocks = await getClocks(genero);

    // Mapea los relojes para obtener las URLs firmadas de las imágenes
    const clocksWithSignedUrls = await Promise.all(clocks.map(async clock => {
      const imageUrl = await getSignedUrl('jewelry-war-bucket', clock.imagekey);
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