const todoModel = require('../models/todoModel');

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.user;
  try {
    const todo = await todoModel.createTodo(userId, title, description);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTodos = async (req, res) => {
  const { userId } = req.user;
  const { limit = 10, offset = 0 } = req.query;
  try {
    const todos = await todoModel.getTodos(userId, limit, offset);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const todo = await todoModel.getTodoById(id, userId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const { userId } = req.user;
  try {
    const todo = await todoModel.updateTodo(id, userId, title, description);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const todo = await todoModel.deleteTodo(id, userId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
