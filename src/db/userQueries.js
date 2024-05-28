const { json } = require('express');
const pool = require('./config');

const getUser = async (email, password) => {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
      return result.rows[0]; // Asume que solo hay un usuario con este email y password
    } finally {
      client.release();
    }
};

const createUser = async (user) => {
  const client = await pool.connect();
  try {
    const { name, lastname, address, cel, email, password, isadmin } = user;
    const result = await client.query('INSERT INTO users (name, lastname, address, cel, email, password, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, lastname, address, cel, email, password, isadmin]);
    console.log('result create user', result)
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updateUser = async (id, user) => {
  const client = await pool.connect();
  try {
    const { name, price, lenght, type, color, gender } = user;
    const result = await client.query('UPDATE users SET name = $1, price = $2, lenght = $3, type = $4, color = $5, gender = $6 WHERE id = $7 RETURNING *', [name, price, lenght, type, color, gender, id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const deleteUser = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = { getUser, createUser, updateUser, deleteUser };