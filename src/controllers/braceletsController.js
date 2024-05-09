const { getBracelets, createBracelets, updateBracelets, deleteBracelets } = require('../db/braceletsQueries');
const { getSignedUrl } = require('../utils/getSignedUrl');

const getBraceletsController = async (req, res) => {
  try {
    const bracelets = await getBracelets();

    const braceletsWithSignedUrls = await Promise.all(bracelets.map(async bracelet => {
      const imageUrl = await getSignedUrl('jewelry-war-bucket', bracelet.imagekey);
      return { ...bracelet, imageUrl };
    }));

    res.json(braceletsWithSignedUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Get error bracelets' });
  }
};

const createBraceletsController = async (req, res) => {
  try {
    console.log('req.body:', req.body)
    const bracelets = await createBracelets(req.body);
    res.status(201).json(bracelets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Save error bracelets' });
  }
};

const updateBraceletsController = async (req, res) => {
  try {
    const { id } = req.params;
    const bracelets = await updateBracelets(id, req.body);
    res.json(bracelets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update error bracelets' });
  }
};

const deleteBraceletsController = async (req, res) => {
  try {
    const { id } = req.params;
    const bracelets = await deleteBracelets(id);
    res.json(bracelets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Delete error bracelets' });
  }
};

module.exports = { getBraceletsController, createBraceletsController, updateBraceletsController, deleteBraceletsController };