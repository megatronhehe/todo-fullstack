import React, { useEffect, useState } from "react";

import TodosContext from "./TodosContext";

export default function TodosContextProvider({ children }) {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState({ fetching: true });
	const [errorMsg, setErrorMsg] = useState("");

	const [refetch, setRefetch] = useState(false);

	useEffect(() => {
		fetchTodo();
	}, [refetch]);

	const refetchFunc = () => {
		setRefetch((prev) => !prev);
	};

	const fetchTodo = async () => {
		setIsLoading((prev) => ({ ...prev, fetching: true }));
		setErrorMsg("");
		try {
			const response = await fetch("http://localhost:4000/api/todos/");

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			setTodos(data);
		} catch (error) {
			setErrorMsg(`${error.message}`);
		} finally {
			setIsLoading((prev) => ({ ...prev, fetching: false }));
		}
	};

	return (
		<TodosContext.Provider
			value={{ todos, setTodos, isLoading, errorMsg, refetchFunc }}
		>
			{children}
		</TodosContext.Provider>
	);
}
