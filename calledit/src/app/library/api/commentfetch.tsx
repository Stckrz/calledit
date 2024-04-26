import { IComment } from "@/app/models/commentmodels";

export async function getCommentsByPredictionId(predictionId: string) {
	try {
		const response = await fetch(`http://localhost:5000/comments/getPredictionId/${predictionId}`);
		const data: IComment[] = await response.json()
		return(data)
	}
	catch (error) { console.log(error) }
}
