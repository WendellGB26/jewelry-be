const { getEarrings, createEarrings, updateEarrings, deleteEarrings } = require('../db/earringsQueries');
const { getSignedUrl } = require('../utils/getSignedUrl');

const getEarringsController = async (req, res) => {
  const { genero } = req.params;
  try {
    const earrings = await getEarrings(genero);

    const earringsWithSignedUrls = await Promise.all(earrings.map(async earring => {
      const imageUrl = await getSignedUrl('jewelry-war-bucket', earring.imagekey);
      return { ...earring, imageUrl };
    }));

    res.json(earringsWithSignedUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Get error earrings' });
  }
};

const createEarringsController = async (req, res) => {
  try {
    
    const earrings = await createEarrings(req.body);
    res.status(201).json(earrings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Save error earrings' });
  }
};

const updateEarringsController = async (req, res) => {
  try {
    const { id } = req.params;
    const earrings = await updateEarrings(id, req.body);
    res.json(earrings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update error earrings' });
  }
};

const deleteEarringsController = async (req, res) => {
  try {
    const { id } = req.params;
    const earrings = await deleteEarrings(id);
    res.json(earrings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Delete error earrings' });
  }
};

module.exports = { getEarringsController, createEarringsController, updateEarringsController, deleteEarringsController };