import { IPrediction } from "@/app/models/predictionmodels"
import { typeConversion } from "./fetchCommon"

interface predictionParamObject {
	id?: string,
	category?: string,
	username?: string
}

//get all predictions
export async function getPredictions(input: predictionParamObject) {
	let newData: IPrediction[] = []
	try {
		if (input.id) {
			const response = await fetch(`http://localhost:5000/predictions/getOne/${input.id}`)
			newData = await response.json()

		} else if (input.category) {
			const response = await fetch(`http://localhost:5000/predictions/getByCategory/${input.category}`)
			const data = await response.json()
			newData = typeConversion(data)

		} else if (input.username) {
			const response = await fetch(`http://localhost:5000/predictions/getConfirmedByUser/${input.username}`)
			const data = await response.json()
			newData = typeConversion(data)

		} else {
			const response = await fetch('http://localhost:5000/predictions/getAll')
			const data = await response.json()
			newData = typeConversion(data)
		}
	}
	catch (error) { console.log(error) }
	finally { return newData }
}


//get the voting info for a prediction, based on id
export async function getPredictionVotesById(id: string, username: any,) {
	try {
		const response = await fetch(`http://localhost:5000/predictions/getOne/${id}/votes`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(username)
		})
		const data = await response.json()
		return data
	}
	catch (error) { console.log(error) }
}

//update a prediction
export async function updatePrediction(updatedPredictionData: Partial<IPrediction>, id: string, token: string) {
	try {
		const response = await fetch(`http://localhost:5000/predictions/update/${id}`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
				'authorization': `bearer ${token}`
			},
			body: JSON.stringify(updatedPredictionData)
		})
		const data = await response.json()
		return data
	}
	catch (error) { console.log(error) }
}

//add a new prediction
export async function addPrediction(predictionData: IPrediction, token: string) {
	try {
		const response = await fetch("http://localhost:5000/predictions/post", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'authorization': `bearer ${token}`
			},
			body: JSON.stringify(predictionData)
		})
		const data = await response.json()
		return data
	}
	catch (error) { console.log(error) }
}
