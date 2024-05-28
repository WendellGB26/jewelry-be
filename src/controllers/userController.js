const { getUser, createUser, updateUser, deleteUser } = require('../db/userQueries');
const { getSignedUrl } = require('../utils/getSignedUrl');

const getUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUserController = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server fuck error' });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const rings = await updateUser(id, req.body);
    res.json(rings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update error user' });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const rings = await deleteUser(id);
    res.json(rings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Delete error user' });
  }
};

module.exports = { getUserController, createUserController, updateUserController, deleteUserController };