import React from "react";

export default function Navbar() {
	const date = new Date().toDateString();

	return (
		<nav className="flex items-center justify-between p-4 text-2xl">
			<h1>MyTodo</h1> <span className="text-base">{date}</span>
		</nav>
	);
}
