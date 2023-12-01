import React, { useEffect, useState } from "react";

import { CgSpinner } from "react-icons/cg";

import { PiNotePencil, PiX, PiXCircle, PiCheckCircle } from "react-icons/pi";

import { IoSquareOutline, IoCheckbox, IoTrashBin } from "react-icons/io5";

export default function TodoItem({ todo, setTodos }) {
	const { _id, title, isDone } = todo;

	const [todoInput, setTodoInput] = useState(title);

	const [isDeleting, setIsDeleting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const [toggleEdit, setToggleEdit] = useState(false);

	useEffect(() => {
		if (!toggleEdit) {
			setTodoInput(title);
		}
	}, [toggleEdit]);

	const deleteTodo = async (id) => {
		setIsDeleting(true);
		try {
			const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			setTodos((prev) => prev.filter((todo) => todo._id !== id));
		} catch (error) {
			console.log(error);
		} finally {
			setIsDeleting(false);
		}
	};

	const updateTodo = async (id) => {
		setIsEditing(true);
		try {
			const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title: todoInput }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			setTodos((prev) =>
				prev.map((todo) =>
					todo._id === id ? { ...todo, title: todoInput } : todo
				)
			);
			setToggleEdit(false);
		} catch (error) {
			console.log(error);
		} finally {
			setIsEditing(false);
		}
	};

	const toggleIsDone = async (id) => {
		setIsEditing(true);
		try {
			const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ isDone: !isDone }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			setTodos((prev) =>
				prev.map((todo) =>
					todo._id === id ? { ...todo, isDone: !isDone } : todo
				)
			);
			setToggleEdit(false);
		} catch (error) {
			console.log(error);
		} finally {
			setIsEditing(false);
		}
	};

	return (
		<li
			key={_id}
			className="flex items-center justify-between p-1 pr-4 overflow-hidden border rounded-xl"
		>
			<div className="flex items-center ml-2">
				<button
					onClick={() => toggleIsDone(_id)}
					className="text-xl text-gray-300"
				>
					{isDone ? (
						<IoCheckbox className="text-green-300" />
					) : (
						<IoSquareOutline />
					)}
				</button>

				<input
					type="text"
					disabled={toggleEdit === false}
					onChange={(e) => setTodoInput(e.target.value)}
					value={todoInput}
					className={`py-1 pl-2 ml-1 rounded-lg outline-none ${
						toggleEdit ? "bg-gray-100" : "bg-white"
					}`}
				/>
			</div>
			<ul className="flex items-center gap-2 text-xl text-gray-400">
				{toggleEdit && (
					<li>
						<button
							disabled={isEditing}
							onClick={() => updateTodo(_id)}
							className="text-green-300"
						>
							<PiCheckCircle />
						</button>
					</li>
				)}
				<li>
					<button onClick={() => setToggleEdit((prev) => !prev)}>
						{toggleEdit ? <PiXCircle /> : <PiNotePencil />}
					</button>
				</li>

				<li>
					{isDeleting === true ? (
						<button>
							<CgSpinner className="animate-spin" />
						</button>
					) : (
						<button
							disabled={isDeleting === true}
							onClick={() => deleteTodo(_id)}
							className="text-red-300"
						>
							<IoTrashBin />
						</button>
					)}
				</li>
			</ul>
		</li>
	);
}
