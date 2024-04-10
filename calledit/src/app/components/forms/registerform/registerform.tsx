
'use client'
import React, { useState } from 'react';
import { registerUser } from '@/app/library/api/userfetch';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const RegisterForm: React.FC = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [registerError, setRegisterError] = useState("");
	const router = useRouter();
	const [cookie, setCookie] = useCookies(['userInfo'])


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

		if (a.username) {
			setCookie('userInfo', a, {path: '/', maxAge: 1800})
			router.push("/")
		} else {
			setRegisterError("username already exists")
		}
	}

	return (
		<>
			<div className={"flex flex-col items-center justify-center gap-1 aspect-video h-full"}>
				<div className={"sm:w-2/4 md:w-1/2 lg:w-1/3 flex flex-col items-start justify-center gap-1 p-6 border border-gray-200 rounded-xl shadow-lg shadow-gray-400 bg-gray-100"}>
					<label className={"flex flex-col font-bold text-gray-600 w-full"}>Username
						<input className={"input-primary"} onChange={e => { setUsername(e.target.value) }} />
					</label>
					<label className={"flex flex-col font-bold text-gray-600 w-full"}>Email
						<input className={"input-primary"} onChange={e => { setEmail(e.target.value) }} />
					</label>
					<label className={"flex flex-col font-bold text-gray-600 w-full"}>Password
						<input type={"password"} className={"input-primary"} onChange={e => { setPassword(e.target.value) }} />
					</label>
					<label className={"flex flex-col font-bold text-gray-600 w-full"}>Repeat Password
						<input type={"password"} className={"input-primary"} onChange={e => { setRepeatPassword(e.target.value) }} />
					</label>
					<button className={"btn-primary"} onClick={() => { passcheck(password, repeatPassword) }}>Register</button>
					<div className={"self-start text-red-600"}>{registerError}</div>
				</div>
			</div>
		</>
	)
}

export default RegisterForm;
