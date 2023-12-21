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

export { fetchTodos };
