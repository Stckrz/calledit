'use client'
import React, { useState } from 'react';

import { userLogin } from '@/app/library/api/userfetch';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const LoginForm: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState("");
	const router = useRouter()
	const [cookie, setCookie] = useCookies(['userInfo']);

	async function handleLoginSubmit() {
		const userData = {
			"username": username,
			"password": password,
		}
		let a = await userLogin(userData)
		if (a.token) {
			setCookie('userInfo', a, { path: '/', maxAge: 1800 })
			router.push("/")
		} else {
			setLoginError("incorrect login credentials")
		}
	}

	return (
		<>
			<div className={"flex flex-col items-center aspect-video justify-center gap-1 h-full border"}>
				<div className={"sm:w-2/4 md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center gap-1 p-6 border border-gray-200 rounded-xl shadow-lg shadow-gray-400 bg-gray-100"}>
					<label className={"w-full flex flex-col font-bold text-gray-600"}>Username
						<input className={"input-primary w-full md:w-auto"} onChange={e => { setUsername(e.target.value) }} />
					</label>
					<label className={"flex flex-col font-bold text-gray-600 w-full"}>Password
						<input type={"password"} className={"input-primary"} onChange={e => { setPassword(e.target.value) }} />
					</label>
					<button className={"btn-primary self-end"} onClick={() => { handleLoginSubmit() }}>Login</button>
					<div className={"self-start text-red-600"}>{loginError}</div>
				</div>
			</div>
		</>
	)
}

export default LoginForm
