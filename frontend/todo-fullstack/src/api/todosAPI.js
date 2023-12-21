async function fetchTodos() {
	try {
		const response = await fetch("http://localhost:4000/api/todos/");

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
}

async function deleteTodoAPI(id) {
	try {
		const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
}

async function updateTodoAPI(id, input) {
	try {
		const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: input }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
}

async function toggleIsDoneAPI(id, isDone) {
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
	} catch (error) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
}

export { fetchTodos, deleteTodoAPI, updateTodoAPI, toggleIsDoneAPI };
