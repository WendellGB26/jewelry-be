const pool = require('./config');

const getClocks = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM clocks');
    return result.rows;
  } finally {
    client.release();
  }
};

const createClocks = async (user) => {
  const client = await pool.connect();
  try {
    const { name, price, description } = user;
    const result = await client.query('INSERT INTO clocks (name, price, description) VALUES ($1, $2, $3) RETURNING *', [name, price, description]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updateClocks = async (id, user) => {
  const client = await pool.connect();
  try {
    const { name, price, description } = user;
    const result = await client.query('UPDATE clocks SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *', [name, price, description, id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const deleteClocks = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM clocks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = { getClocks, createClocks, updateClocks, deleteClocks };