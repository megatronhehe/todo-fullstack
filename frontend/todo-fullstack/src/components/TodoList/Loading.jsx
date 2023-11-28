import React from "react";

import { CgSpinner } from "react-icons/cg";

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center w-full gap-2 pt-24">
			<CgSpinner className="text-2xl animate-spin" />
			<span>Loading...</span>
		</div>
	);
}
