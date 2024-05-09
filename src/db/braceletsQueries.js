const pool = require('./config');

const getBracelets = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM bracelets');
    return result.rows;
  } finally {
    client.release();
  }
};

const createBracelets = async (user) => {
  const client = await pool.connect();
  try {
    const { description, price, size, color, gender, imagekey } = user;
    const result = await client.query('INSERT INTO bracelets (description, price, size, color, gender, imagekey) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [description, price, size, color, gender, imagekey]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updateBracelets = async (id, user) => {
  const client = await pool.connect();
  try {
    const { name, price, lenght, type, color, gender } = user;
    const result = await client.query('UPDATE bracelets SET name = $1, price = $2, lenght = $3, type = $4, color = $5, gender = $6 WHERE id = $7 RETURNING *', [name, price, lenght, type, color, gender, id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const deleteBracelets = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM bracelets WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = { getBracelets, createBracelets, updateBracelets, deleteBracelets };