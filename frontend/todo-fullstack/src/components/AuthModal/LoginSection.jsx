import React, { useContext, useState } from "react";

import AuthContext from "../../context/AuthContext";

import { login } from "../../api/authAPI";

export default function LoginSection({ setToggleAuthModal }) {
	const { setUser } = useContext(AuthContext);
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});

	function handleLoginForm(e) {
		const { name, value } = e.target;
		setLoginForm((prev) => ({ ...prev, [name]: value }));
	}

	async function loginUser(e) {
		e.preventDefault();
		try {
			const data = await login(loginForm.email, loginForm.password);
			setUser(data);
			setToggleAuthModal(false);
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<section className="flex flex-col items-center gap-4">
			<h1 className="text-xl">Login</h1>
			<form className="flex flex-col w-full gap-2">
				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					onChange={handleLoginForm}
					value={loginForm.email}
					placeholder="john@doe.com"
					className="w-full px-4 py-2 border outline-none rounded-xl"
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					onChange={handleLoginForm}
					value={loginForm.password}
					placeholder="password"
					className="w-full px-4 py-2 border outline-none rounded-xl"
				/>
				<button
					onClick={loginUser}
					className="py-2 font-normal text-white bg-green-400 rounded-xl"
				>
					Login
				</button>
			</form>
		</section>
	);
}
