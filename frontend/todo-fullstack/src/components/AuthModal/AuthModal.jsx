import React, { useState } from "react";
import LoginSection from "./LoginSection";
import RegisterSection from "./RegisterSection";

export default function AuthModal({ setToggleAuthModal }) {
	const [isLoginSelected, setIsLoginSelected] = useState(true);

	return (
		<section className="fixed top-0 left-0 z-10 flex flex-col justify-center w-full gap-8 p-8">
			<button onClick={() => setToggleAuthModal(false)}>X</button>
			<div className="w-full max-w-xl p-4 bg-white border shadow-lg rounded-xl">
				<nav className="flex justify-around pb-4 mb-4 border-b">
					<button onClick={() => setIsLoginSelected(true)}>Login</button>
					<button onClick={() => setIsLoginSelected(false)}>Register</button>
				</nav>

				{isLoginSelected ? (
					<LoginSection setToggleAuthModal={setToggleAuthModal} />
				) : (
					<RegisterSection setToggleAuthModal={setToggleAuthModal} />
				)}
			</div>
		</section>
	);
}
