import React, { useEffect, useState } from "react";

import TodosContext from "./TodosContext";
import { fetchTodos } from "../api/todosAPI";

export default function TodosContextProvider({ children }) {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");
	const [flipBool, setFlipBool] = useState(false);

	function refetchFunc() {
		setFlipBool((prev) => !prev);
	}

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
				const data = await fetchTodos();
				setTodos(data);
			} catch (error) {
				setErrorMsg(error.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, [flipBool]);

	return (
		<TodosContext.Provider
			value={{ todos, setTodos, isLoading, errorMsg, refetchFunc }}
		>
			{children}
		</TodosContext.Provider>
	);
}
