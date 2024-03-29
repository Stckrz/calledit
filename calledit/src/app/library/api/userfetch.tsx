import { IRegister } from "@/app/models/usermodels"
import { ILogin } from "@/app/models/usermodels"

export async function registerUser(sendData: IRegister) {

	try {
		const response = await fetch('http://localhost:5000/users/register', {
			headers: { "Content-Type": "application/json" },
			method: 'POST',
			body: JSON.stringify(sendData)
		})
		const data = await response.json()
		console.log(data)
		return (data)

	} catch (error) { console.log(error) }

}

export async function userLogin(login: ILogin) {

	try {
		const response = await fetch('http://localhost:5000/users/login', {
			headers: { "Content-Type": "application/json" },
			method: 'POST',
			body: JSON.stringify(login)
		})
		const data = await response.json()
		console.log(data)
		return (data)

	} catch (error) { console.log(error) }

}
