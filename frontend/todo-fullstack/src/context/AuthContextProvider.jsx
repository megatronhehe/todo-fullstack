import React from "react";

import AuthContext from "./AuthContext";

export default function AuthContextProvider({ children }) {
	const test = "auth context";

	return (
		<AuthContext.Provider value={{ test }}>{children}</AuthContext.Provider>
	);
}
