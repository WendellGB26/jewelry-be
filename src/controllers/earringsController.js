const { getEarrings, createEarrings, updateEarrings, deleteEarrings } = require('../db/earringsQueries');

const getEarringsController = async (req, res) => {
  try {
    const earrings = await getEarrings();
    res.json(earrings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Get error earrings' });
  }
};

const createEarringsController = async (req, res) => {
  try {
    console.log('req.body:', req.body)
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