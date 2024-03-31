'use client'
import React, { useEffect } from 'react';
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { useCookies } from "react-cookie";

const UserNav: React.FC = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['userInfo'])

	useEffect(() => { }, [cookie])
	return (
		<>
			{
				!cookie.userInfo?.username
					? <div className={"w-44 flex mr-2 items-center justify-between"}>
						<button className={"w-20 btn-primary bg-transparent border border-white p-2"}>
							<Link href="/user/login">Login</Link>
						</button>
						<div className={"w-20 rounded btn-primary bg-white text-cyan-500 p-2 m-0"}>
							<Link href="/user/register">Sign Up</Link>
						</div>
					</div>
					: <div className={"flex gap-3"}>
						<div className={"flex font-semibold items-center justify-center"}>
							<FaRegUser />
							{cookie.userInfo.username}
						</div>
						<div>
							<div
								className={"w-20 flex items-center justify-center btn-primary bg-transparent border border-white p-2"}
								onClick={() => { removeCookie('userInfo') }}>
								<Link href="/user/logout">
									Logout
								</Link>
							</div>
						</div>
					</div>
			}
		</>
	)
}
export default UserNav;
