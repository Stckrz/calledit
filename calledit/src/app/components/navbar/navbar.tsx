'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import UserNav from '@components/usernav/usernav';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useViewport } from '@/app/hooks/useViewport'
import { AiOutlineHome } from 'react-icons/ai';

const Navbar: React.FC = () => {
	const [mobileNavShown, setMobileNavShown] = useState(false)
	const width = useViewport();

	return (
		<>
			{width.width <= 800
				? <div className={"h-1/12 flex items-center justify-between border border-b-gray-500 bg-cyan-500 relative z-50"}>
					<div className={"m-5"} onClick={() => { setMobileNavShown(!mobileNavShown) }}>
						<RxHamburgerMenu size={"3em"} />
					</div>
					<div className={"h-1/6 bg-cyan-500 flex items-center justify-center"}>
						<UserNav />
					</div>
					{mobileNavShown &&
						<div className={"h-screen w-full absolute top-20 bg-background-gray"}>
							<Link href="/">
								<div onClick={() => { setMobileNavShown(false) }} className={"h-1/6 m-1 bg-cyan-500 border border-black flex items-center justify-center rounded"}>
									<AiOutlineHome size={"1.5em"} />
									Home
								</div>
							</Link>
							<Link href="/prediction-page">
								<div onClick={() => { setMobileNavShown(false) }} className={"h-1/6 m-1 bg-cyan-500 border border-black flex items-center justify-center rounded"}>
									New
								</div>
							</Link>
						</div>

					}
				</div>
				: <div className={"h-1/12 flex items-center justify-between border border-b-gray-500 bg-cyan-500 p-2"}>
					<div
						className={"h-full w-112 bg-cyan-500 flex items-center justify-center rounded"}>
						<Link href="/">
							<div className={"flex flex-col items-center justify-center font-bold"}>
								<AiOutlineHome size={"1.5em"} />
								Home
							</div>
						</Link>
					</div>
					<div className={"w-auto h-full bg-cyan-500 flex items-center justify-center rounded"}>
						<Link href="/prediction-page">
							<div className={"flex items-center justify-center bg-cyan-800 rounded w-20 btn-primary"}>
								New
							</div>
						</Link>
					</div>
					<div className={"h-full w-112 bg-cyan-500 flex items-center justify-center rounded"}>
						<UserNav />
					</div>
				</div>
			}
		</>
	)
}

export default Navbar
