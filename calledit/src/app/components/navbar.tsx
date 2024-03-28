import React from 'react';

export const Navbar: React.FC = () => {
	return(
		<>
			<div className={"h-16 flex items-center justify-between border border-b-black bg-gradient-to-r from-cyan-600 to-cyan-500"}>
				<div className={"h-full w-1/12 bg-cyan-500 flex items-center justify-center rounded"}>navbar lol</div>
				<div className={"w-auto h-full bg-cyan-500 flex items-center justify-center rounded"}>navigation</div>
				<div className={"h-full w-1/12 bg-cyan-500 flex items-center justify-center rounded"}>user stuff</div>
			</div>
		</>
	)
}
