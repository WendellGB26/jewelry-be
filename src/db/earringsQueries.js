const pool = require('./config');

const getEarrings = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM earrings');
    return result.rows;
  } finally {
    client.release();
  }
};

const createEarrings = async (user) => {
  const client = await pool.connect();
  try {
    const { name, description, price, color, gender, type, imagekey } = user;
    const result = await client.query('INSERT INTO earrings (name, description, price, color, gender, type, imagekey) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [name, description, price, color, gender, type, imagekey]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updateEarrings = async (id, user) => {
  const client = await pool.connect();
  try {
    const { name, price, type, color, gender } = user;
    const result = await client.query('UPDATE earrings SET name = $1, price = $2, type = $3, color = $4, gender = $5 WHERE id = $6 RETURNING *', [name, price, type, color, gender, id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const deleteEarrings = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM earrings WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = { getEarrings, createEarrings, updateEarrings, deleteEarrings };