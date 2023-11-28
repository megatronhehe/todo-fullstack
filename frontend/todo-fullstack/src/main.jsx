import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import TodosContextProvider from "./context/TodosContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<TodosContextProvider>
			<App />
		</TodosContextProvider>
	</React.StrictMode>
);
