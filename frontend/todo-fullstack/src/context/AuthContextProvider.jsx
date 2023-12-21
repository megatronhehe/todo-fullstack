import React, { useState } from "react";

import AuthContext from "./AuthContext";

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

	console.log(user);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}
