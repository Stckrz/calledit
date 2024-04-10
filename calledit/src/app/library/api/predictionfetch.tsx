import { IPrediction } from "@/app/models/predictionmodels"

export async function getPredictions() {
	try {
		const response = await fetch('http://localhost:5000/predictions/getAll')
		const data = await response.json()
		return data
	}
	catch (error) { console.log(error) }
}

export async function getPredictionById(id: string) {
	try {
		const response = await fetch(`http://localhost:5000/predictions/getOne/${id}`)
		const data = await response.json()
		return data
	}
	catch (error) { console.log(error) }
}

export async function getPredictionsByCategory(category: string) {
	try {
		const response = await fetch(`http://localhost:5000/predictions/getByCategory/${category}`)
		const data = await response.json()
		return data
	}
	catch (error) { console.log(error) }
}
export async function getConfirmedByUser(username: string) {
	try{
		const response = await fetch(`http://localhost:5000/predictions/getConfirmedByUser/${username}`)
		const data = await response.json()
		return data
	}
	catch (error){console.log(error)}
}

export async function getPredictionVotesById(id: string, username: any, ) {
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
