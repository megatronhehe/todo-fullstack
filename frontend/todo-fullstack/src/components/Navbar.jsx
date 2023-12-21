import React, { useState } from "react";

import { IoLogInOutline } from "react-icons/io5";
import AuthModal from "./AuthModal/AuthModal";

export default function Navbar() {
	const [toggleAuthModal, setToggleAuthModal] = useState(false);

	return (
		<>
			<nav className="flex items-center justify-between p-4 text-2xl">
				<h1>MyTodo</h1>
				<button
					onClick={() => setToggleAuthModal((prev) => !prev)}
					className="text-3xl text-gray-400"
				>
					<IoLogInOutline />
				</button>
			</nav>

			{toggleAuthModal && <AuthModal setToggleAuthModal={setToggleAuthModal} />}
		</>
	);
}
