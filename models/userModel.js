const db = require('../config/db');

const createUser = async (email, password) => {
  try {
    const result = await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, password]
    );
    return result.rows[0];
  } catch (err) {
    console.error('ERROR while regester user:',err);
  }

};

const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
};
