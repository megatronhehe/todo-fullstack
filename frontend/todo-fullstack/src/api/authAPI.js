async function login(email, password) {
	try {
		const response = await fetch("http://localhost:4000/api/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
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

export { login };
