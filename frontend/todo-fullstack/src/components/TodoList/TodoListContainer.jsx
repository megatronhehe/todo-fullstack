import React, { useState, useContext } from "react";

import TodosContext from "../../context/TodosContext";

import { CgMathPlus, CgSpinner } from "react-icons/cg";

export default function TodoListContainer({ children }) {
	const { setTodos } = useContext(TodosContext);

	const [todoInput, setTodoInput] = useState("");
	const [isCreating, setIsCreating] = useState(false);

	const createTodo = async () => {
		setIsCreating(true);
		try {
			const response = await fetch("http://localhost:4000/api/todos/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title: todoInput, isDone: false }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			setTodoInput("");
			setTodos((prev) => [data, ...prev]);
		} catch (error) {
			console.log(error);
		} finally {
			setIsCreating(false);
		}
	};

	return (
		<section className="p-4">
			<h2 className="pb-4 mb-4 border-b">Todos</h2>
			<form className="flex items-center gap-2 p-2 mb-4 border rounded-xl">
				<label htmlFor="title" className="w-1/3">
					Create Todo
				</label>
				<input
					id="title"
					name="title"
					type="text"
					onChange={(e) => setTodoInput(e.target.value)}
					value={todoInput}
					className="w-2/3 px-3 py-1 border rounded-lg outline-none"
				/>
				<button
					disabled={todoInput.length < 1 || isCreating === true}
					onClick={(e) => {
						e.preventDefault();
						createTodo();
					}}
					className="p-2 border rounded-md"
				>
					{isCreating ? <CgSpinner className="animate-spn" /> : <CgMathPlus />}
				</button>
			</form>
			{children}
		</section>
	);
}
