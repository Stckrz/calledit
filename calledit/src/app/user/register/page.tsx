'use client'
import React, { useState } from 'react';
import { registerUser } from '@/app/library/api/userfetch';

const Register: React.FC = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [registerError, setRegisterError] = useState("");


	const passcheck = (pass1: string, pass2: string) => {
		if (pass1 !== pass2) {
			setRegisterError("passwords do not match")
		} else if (pass1.length < 5) {
			setRegisterError("password too short")
		} else {
			handleRegisterSubmit()
		}
	}

	async function handleRegisterSubmit() {
		const userData = {
			"username": username,
			"email": email,
			"password": password,
			"repeatpassword": repeatPassword,
		}
		let a = await registerUser(userData)
		console.log(a)
		localStorage.setItem('userData', a)
		const accessToken = localStorage.getItem('userData');
		console.log("shit", accessToken)

		// a.username 
		// 	// ? dispatch(setUser(a))
		// 	? console.log(a)
		// 	: setRegisterError("username already exists")
	}

	return (
		<>
			<div className={"flex flex-col items-center justify-center gap-1 w-full h-full"}>
				<div className={"flex flex-col items-end justify-center gap-1 h-1/2"}>
					<label>Username:
						<input onChange={e => { setUsername(e.target.value) }} />
					</label>
					<label>Email:
						<input onChange={e => { setEmail(e.target.value) }} />
					</label>
					<label>Password:
						<input onChange={e => { setPassword(e.target.value) }} />
					</label>
					<label>Repeat Password:
						<input onChange={e => { setRepeatPassword(e.target.value) }} />
					</label>
					<button onClick={() => { passcheck(password, repeatPassword) }}>Register</button>
				</div>
				<div>{registerError}</div>
			</div>
		</>
	)
}

export default Register
