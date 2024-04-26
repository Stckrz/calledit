import React, { useEffect, useState } from 'react';
import { getCommentsByPredictionId } from "@/app/library/api/commentfetch"
import { IComment } from '@/app/models/commentmodels';

interface commentFeedProps {
	predictionId: string
}

const CommentFeed: React.FC<commentFeedProps> = ({ predictionId }) => {
	const [comments, setComments] = useState<any>([]);

	async function getComments() {
		setComments(await getCommentsByPredictionId(predictionId))
	}
	useEffect(() => {
		getComments()

	}, [predictionId])
	return (
		<>
			<div>ass
				{
					comments.map((item: IComment) => {
						return (
							<div>{item.title}</div>
						)
					})
				}
			</div>
		</>
	)
}
export default CommentFeed;
