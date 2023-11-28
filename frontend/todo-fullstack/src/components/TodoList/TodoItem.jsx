import React, { useEffect, useState } from "react";

import { CgSpinner } from "react-icons/cg";

import { PiNotePencil, PiX, PiXCircle, PiCheckCircle } from "react-icons/pi";

export default function TodoItem({ todo, setTodos }) {
	const { _id, title } = todo;

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

	return (
		<li
			key={_id}
			className="flex items-center justify-between py-1 pr-4 border rounded-xl"
		>
			<input
				type="text"
				disabled={toggleEdit === false}
				onChange={(e) => setTodoInput(e.target.value)}
				value={todoInput}
				className="py-1 pl-4"
			/>
			<ul className="flex items-center gap-2">
				{toggleEdit && (
					<li>
						<button disabled={isEditing} onClick={() => updateTodo(_id)}>
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
						>
							<PiX />
						</button>
					)}
				</li>
			</ul>
		</li>
	);
}
