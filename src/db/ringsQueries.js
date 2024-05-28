const pool = require('./config');

const getRings = async (genero) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM rings WHERE gender = $1 OR gender = \'unisex\'', [genero]);
    return result.rows;
  } finally {
    client.release();
  }
};

const createRings = async (user) => {
  const client = await pool.connect();
  try {
    const {name, description, price, size, color, gender, type, imagekey } = user;
    const result = await client.query('INSERT INTO rings (name, description, price, size, color, gender, type, imagekey) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [name, description, price, size, color, gender, type, imagekey]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updateRings = async (id, user) => {
  const client = await pool.connect();
  try {
    const { name, price, lenght, type, color, gender } = user;
    const result = await client.query('UPDATE rings SET name = $1, price = $2, lenght = $3, type = $4, color = $5, gender = $6 WHERE id = $3 RETURNING *', [name, price, lenght, type, color, gender]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const deleteRings = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM rings WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = { getRings, createRings, updateRings, deleteRings };