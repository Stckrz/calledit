import React from 'react';
import Link from 'next/link';
import UserNav from '@components/usernav/usernav';

const Navbar: React.FC = () => {
	return (
		<>
			<div className={"h-16 flex items-center justify-between border border-b-black bg-cyan-500"}>
				<div className={"h-full w-1/12 bg-cyan-500 flex items-center justify-center rounded"}><Link href="/">navbar lol</Link></div>
				<div className={"w-auto h-full bg-cyan-500 flex items-center justify-center rounded"}>navigation</div>
				<div className={"h-full w-1/12 bg-cyan-500 flex items-center justify-center rounded"}><UserNav /></div>
			</div>
		</>
	)
}

export default Navbar
