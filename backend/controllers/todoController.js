const Todo = require("../models/todoModel");
const mongoose = require("mongoose");

// GET ALL todos
const getTodos = async (req, res) => {
	try {
		const todos = await Todo.find({}).sort({ createdAt: -1 });
		return res.status(200).json(todos);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

// GET a single todo
const getTodo = async (req, res) => {
	const { id } = req.params;

	// validastion ObjectId mongoose mongodb
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Not found" });
	}

	try {
		const todo = await Todo.findById(id);
		if (!todo) {
			return res.status(404).json({ error: "Not found" });
		}
		return res.status(200).json(todo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

// CREATE new todo
const createTodo = async (req, res) => {
	const { title, isDone } = req.body;

	try {
		const todo = await Todo.create({ title, isDone });
		return res.status(200).json(todo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

// DELETE a todo
const deleteTodo = async (req, res) => {
	const { id } = req.params;

	// validastion ObjectId mongoose mongodb
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Not found" });
	}

	try {
		const todo = await Todo.findByIdAndDelete({ _id: id });
		if (!todo) {
			return res.status(404).json({ error: "Not found" });
		}
		return res.status(200).json(todo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

// UPDATE a todo
const updateTodo = async (req, res) => {
	const { id } = req.params;

	// validastion ObjectId mongoose mongodb
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Not found" });
	}

	try {
		const todo = await Todo.findByIdAndUpdate({ _id: id }, { ...req.body });
		if (!todo) {
			return res.status(404).json({ error: "Not found" });
		}
		return res.status(200).json(todo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { getTodos, getTodo, createTodo, deleteTodo, updateTodo };
