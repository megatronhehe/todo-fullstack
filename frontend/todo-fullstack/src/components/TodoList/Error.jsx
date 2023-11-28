import React from "react";

export default function Error({ errorMsg, refetchFunc }) {
	return (
		<div className="flex flex-col items-center justify-center pt-24">
			{errorMsg}{" "}
			<button
				onClick={() => refetchFunc((prev) => !prev)}
				className="px-3 py-1 mt-4 text-white bg-blue-400 rounded-xl"
			>
				Reload
			</button>
		</div>
	);
}
