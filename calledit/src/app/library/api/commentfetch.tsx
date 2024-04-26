export async function getPredictionsVotedByUsername(predictionId: string) {
	try {
		const response = await fetch(`http://localhost:5000/comments/getPredictionId/${predictionId}`);
		const data = await response.json()
		return(data)
	}
	catch (error) { console.log(error) }
}
