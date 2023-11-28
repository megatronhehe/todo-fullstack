import React, { useContext } from "react";

import TodosContext from "../../context/TodosContext";
import TodoItem from "./TodoItem";
import Loading from "./Loading";
import TodoListContainer from "./TodoListContainer";
import Error from "./Error";
import Empty from "./Empty";

export default function TodoList() {
	const { todos, setTodos, isLoading, errorMsg, refetchFunc } =
		useContext(TodosContext);

	const todosElement = todos.map((todo) => (
		<TodoItem key={todo._id} todo={todo} setTodos={setTodos} />
	));

	if (isLoading.fetching === true) {
		return (
			<TodoListContainer>
				<Loading />
			</TodoListContainer>
		);
	}

	if (errorMsg.length > 0) {
		return (
			<TodoListContainer>
				<Error errorMsg={errorMsg} refetchFunc={refetchFunc} />
			</TodoListContainer>
		);
	}

	if (todos.length < 1) {
		return (
			<TodoListContainer>
				<Empty />
			</TodoListContainer>
		);
	}

	return (
		<TodoListContainer>
			<ul className="flex flex-col gap-2">{todosElement}</ul>
		</TodoListContainer>
	);
}
