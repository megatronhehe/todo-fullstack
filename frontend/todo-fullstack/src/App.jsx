import React from "react";
import Main from "./components/Main";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList/TodoList";
import AuthModal from "./components/AuthModal/AuthModal";

function App() {
	return (
		<Main>
			<Container>
				<Navbar />
				<TodoList />
			</Container>
		</Main>
	);
}

export default App;
