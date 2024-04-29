import { IPrediction } from "@/app/models/predictionmodels"
import { typeConversion } from "./fetchCommon"

interface predictionParamObject {
	id?: string,
	category?: string,
	username?: string,
	page?: number
}
export interface predictionReturnObject {
	predictions: IPrediction[],
	count: number
}

//get all predictions
export async function getPredictions(input: predictionParamObject) {
	let page;
	if (input.page) {
		page = input.page
	} else {
		page = 1
	}

	let newData: predictionReturnObject = { predictions: [], count: 0 }
	try {
		if (input.id) {
			const response = await fetch(`http://localhost:5000/predictions/getOne/${input.id}`)
			newData = await response.json()

		} else if (input.category) {
			const response = await fetch(`http://localhost:5000/predictions/getByCategory/${input.category}?page=${page}`)
			const data = await response.json()
			newData = { predictions: typeConversion(data.data), count: data.total }

		} else if (input.username) {
			const response = await fetch(`http://localhost:5000/predictions/getConfirmedByUser/${input.username}?page=${page}`)
			const data = await response.json()
			newData = { predictions: typeConversion(data.data), count: data.total }

		} else {
			const response = await fetch(`http://localhost:5000/predictions/getAll?page=${page}`)
			const data = await response.json()
			newData = { predictions: typeConversion(data.data), count: data.total }
		}
	}
	catch (error) { console.log(error) }
	finally { return newData }
}

//gets all predictions that a user has made
export async function getPredictionsByUsername(input: predictionParamObject) {
	let page;
	if (input.page) {
		page = input.page
	} else {
		page = 1
	}

try {
	const response = await fetch(`http://localhost:5000/predictions/getByUser/${input.username}?page=${page}`)
	const data = await response.json()
		console.log(data)
	return { predictions: data.data, count: data.total }
}
catch (error) { console.log(error) }
}

//gets all predictions a user has voted on
export async function getPredictionsVotedByUsername(input: predictionParamObject) {
	let page;
	if (input.page) {
		page = input.page
	} else {
		page = 1
	}
	try {
		const response = await fetch(`http://localhost:5000/predictions/getVotedByUser/${input.username}?page=${page}`)
		const data = await response.json()
		return { predictions: data.data, count: data.total }
	}
	catch (error) { console.log(error) }
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

export async function addPredictionComment(commentId: string, id: string, token: string) {
	try {
		const response = await fetch(`http://localhost:5000/predictions/addComment/${id}`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
				'authorization': `bearer ${token}`
			},
			body: JSON.stringify({ commentId: commentId })
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
