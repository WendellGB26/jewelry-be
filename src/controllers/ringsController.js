const { getRings, createRings, updateRings, deleteRings } = require('../db/ringsQueries');
const { getSignedUrl } = require('../utils/getSignedUrl');

const getRingsController = async (req, res) => {
  const { genero } = req.params;
  try {
    const rings = await getRings(genero);

    const ringsWithSignedUrls = await Promise.all(rings.map(async ring => {
      const imageUrl = await getSignedUrl('jewelry-war-bucket', ring.imagekey);
      return { ...ring, imageUrl };
    }));

    res.json(ringsWithSignedUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Get error rings' });
  }
};

const createRingsController = async (req, res) => {
  try {
    
    const rings = await createRings(req.body);
    res.status(201).json(rings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Save error rings' });
  }
};

const updateRingsController = async (req, res) => {
  try {
    const { id } = req.params;
    const rings = await updateRings(id, req.body);
    res.json(rings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update error rings' });
  }
};

const deleteRingsController = async (req, res) => {
  try {
    const { id } = req.params;
    const rings = await deleteRings(id);
    res.json(rings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Delete error rings' });
  }
};

module.exports = { getRingsController, createRingsController, updateRingsController, deleteRingsController };