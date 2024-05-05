const { getNecklaces, createNecklaces, updateNecklaces, deleteNecklaces } = require('../db/necklacesQueries');

const getNecklacesController = async (req, res) => {
  try {
    const necklaces = await getNecklaces();
    res.json(necklaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Get error necklaces' });
  }
};

const createNecklacesController = async (req, res) => {
  try {
    console.log('req.body:', req.body)
    const necklaces = await createNecklaces(req.body);
    res.status(201).json(necklaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Save error necklaces' });
  }
};

const updateNecklacesController = async (req, res) => {
  try {
    const { id } = req.params;
    const necklaces = await updateNecklaces(id, req.body);
    res.json(necklaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update error necklaces' });
  }
};

const deleteNecklacesController = async (req, res) => {
  try {
    const { id } = req.params;
    const necklaces = await deleteNecklaces(id);
    res.json(necklaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Delete error necklaces' });
  }
};

module.exports = { getNecklacesController, createNecklacesController, updateNecklacesController, deleteNecklacesController };