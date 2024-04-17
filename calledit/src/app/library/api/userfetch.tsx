import { IRegister, IUser } from "@/app/models/usermodels"
import { ILogin } from "@/app/models/usermodels"

//registers a new user
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

//User login
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

//updates a user
export async function userUpdate(id: string, updatedData: Partial<IUser>){
	try{
		const response = await fetch(`http://localhost:5000/users/update/${id}`, {
			headers: { "Content-Type": "application/json" },
			method: 'PATCH',
			body: JSON.stringify(updatedData)
		})
		const data = await response.json()
		console.log(data)
		return (data)
	}
	catch (error) { console.log(error) }
}

//increments a users score by 1
export async function userScoreIncrement(id: string){
	try{
		const response = await fetch(`http://localhost:5000/users/incrementScore/${id}`, {
			headers: { "Content-Type": "application/json" },
			method: 'PATCH',
		})
		const data = await response.json()
		console.log(data)
		return (data)
	}
	catch (error) { console.log(error) }
}

//fetches a single user by username
export async function getUserByUsername(username: string){
	try{
		const response = await fetch(`http://localhost:5000/users/find/${username}`)
		const data = await response.json()
		return data
	}
	catch (error) {console.log(error)}
}

//gets all predictions that a user has made
export async function getPredictionsByUsername(username: string){
	try{
		const response = await fetch(`http://localhost:5000/predictions/getByUser/${username}`)
		const data = await response.json()
		return data
	}
	catch (error) {console.log(error)}
}

//gets all predictions a user has voted on
export async function getPredictionsVotedByUsername(username: string){
	try{
		const response = await fetch(`http://localhost:5000/predictions/getVotedByUser/${username}`)
		const data = await response.json()
		return data
	}
	catch (error) {console.log(error)}
}
