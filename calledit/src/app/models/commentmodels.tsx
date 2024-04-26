export interface IComment {
	author: string,
	title: string,
	postBody: string,
	predictionId: string,
	replies: IComment[],
	votes: commentVote[] 
}

export interface commentVote{
	user: string,
	vote: string
}
