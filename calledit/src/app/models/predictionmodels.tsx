export interface IPrediction {
	title: string,
	category: string
	description: string,
	author: string,
	finished_on?: string,
	created_on?: string,
	votes: IUserVote[],
	comments?: any[],
	completed: boolean,
	authorPredictionConfirmed: boolean,
	_id?: string,
}

export interface IVotesObject {
	upvotes: number,
	downvotes: number,
	total_votes: number,
	ratio: number,
	uservote: IUserVote
}

export interface IUserVote {
	username: string,
	id: string,
	vote: boolean
}
