'use client'

import React, { useState } from 'react';
import { userLogin } from '@/app/library/api/userfetch';

const Login: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState("");

	async function handleLoginSubmit() {
		const userData = {
			"username": username,
			"password": password,
		}
		let a = await userLogin(userData)
		if (a.token) {
			console.log(a)
			// dispatch(setUser(a))
			setUsername("");
			setPassword("")
		} else {
			setLoginError("incorrect login credentials")
		}
	}
	return (
		<>
			<div className={"flex flex-col items-center justify-center gap-1 w-full h-3/4"}>
				<label>Username:
					<input onChange={e => { setUsername(e.target.value) }} />
				</label>
				<label>Password:
					<input onChange={e => { setPassword(e.target.value) }} />
				</label>
				<button onClick={() => { handleLoginSubmit() }}>login</button>
			</div>
			<div>{loginError}</div>
		</>
	)
}

export default Login
