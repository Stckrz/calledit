import React, { useEffect, useState } from 'react';
import { getCommentsByPredictionId } from "@/app/library/api/commentfetch"
import { IApiComment } from '@/app/models/commentmodels';
import CommentForm from '../forms/commentform/commentform';
import Comment from '@components/comment/comment';

interface commentFeedProps {
	predictionId: string
}

const CommentFeed: React.FC<commentFeedProps> = ({ predictionId }) => {
	const [comments, setComments] = useState<any>();
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [feedPage, setFeedPage] = useState(1);
	const [commentCount, setCommentCount] = useState(0);


	async function getComments() {
		const commentObject = await getCommentsByPredictionId({ page: feedPage, id: predictionId })
		setComments(commentObject?.comments)
		setCommentCount(commentObject?.count)
	}

	useEffect(() => {
		getComments()
	}, [predictionId]);

	return (
		<>
			<div className={"w-full flex flex-col gap-2 max-h-96 overflow-auto border p-1"}>
				<div
					className={"cursor-pointer"}
					onClick={() => { setShowCommentForm(!showCommentForm) }}>
					add comment
				</div>
				{showCommentForm &&
					<CommentForm
						predictionId={predictionId}
						getComments={getComments}
						setShowCommentForm={setShowCommentForm}
					/>
				}
				{comments !== undefined &&
					comments.map((item: IApiComment) => {
						return (
							<Comment key={item._id} commentObject={item} />
						)
					})
				}
			</div>
		</>
	)
}
export default CommentFeed;
