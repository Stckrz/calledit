export interface IComment {
	author: string,
	title: string,
	postBody: string,
	parentId: string,
}

export interface IApiComment extends IComment {
	replies: IComment[],
	votes: commentVote[],
	_id: string
}

export interface commentVote {
	username: string,
	vote: string
}
