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
						<Link href="/user/login">
							<button className={"w-20 btn-primary bg-transparent border border-white p-2"}>
								Login
							</button>
						</Link>
						<Link href="/user/register">
							<div className={"w-20 rounded btn-primary bg-white text-cyan-500 p-2 m-0"}>
								Sign Up
							</div>
						</Link>
					</div>
					: <div className={"flex gap-3"}>
						<div className={"flex font-semibold items-center justify-center"}>
							<FaRegUser />
							{cookie.userInfo.username}
						</div>
						<div>
							<Link href="/user/logout">
								<div
									className={"w-20 flex items-center justify-center btn-primary bg-transparent border border-white p-2"}
									onClick={() => { removeCookie('userInfo',{path:'/'}) }}>
									Logout
								</div>
							</Link>
						</div>
					</div>
			}
		</>
	)
}
export default UserNav;
