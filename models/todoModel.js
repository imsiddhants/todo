const db = require('../config/db');

const createTodo = async (userId, title, description) => {
  const result = await db.query(
    'INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
    [userId, title, description]
  );
  return result.rows[0];
};

const getTodos = async (userId, limit, offset) => {
  const result = await db.query(
    'SELECT * FROM todos WHERE user_id = $1 LIMIT $2 OFFSET $3',
    [userId, limit, offset]
  );
  return result.rows;
};

const getTodoById = async (id, userId) => {
  const result = await db.query('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [id, userId]);
  return result.rows[0];
};

const updateTodo = async (id, userId, title, description) => {
  const result = await db.query(
    'UPDATE todos SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
    [title, description, id, userId]
  );
  return result.rows[0];
};

const deleteTodo = async (id, userId) => {
  const result = await db.query('DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
  return result.rows[0];
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
