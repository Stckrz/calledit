import React, { useEffect, useState } from 'react';
import { getCommentsByPredictionId } from "@/app/library/api/commentfetch"
import { IApiComment } from '@/app/models/commentmodels';
import CommentForm, { CommentParentType } from '../forms/commentform/commentform';
import Comment from '@components/comment/comment';

interface commentFeedProps {
	parentId: string,
}

const CommentFeed: React.FC<commentFeedProps> = ({ parentId }) => {
	const [comments, setComments] = useState<any>();
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [feedPage, setFeedPage] = useState(1);

	async function getComments() {
		const commentObject = await getCommentsByPredictionId({ page: feedPage, id: parentId })
		setComments(commentObject?.comments)
	}

	useEffect(() => {
		getComments()
	}, [parentId]);

	return (
		<>
			<div className={"w-full flex flex-col gap-2 overflow-auto border p-1"}>
				<div
					className={"cursor-pointer"}
					onClick={() => { setShowCommentForm(!showCommentForm) }}>
					add comment
				</div>
				{showCommentForm &&
					<CommentForm
						parentId={parentId}
						getComments={getComments}
						setShowCommentForm={setShowCommentForm}
						commentParentType={CommentParentType.PredictionParent}
					/>
				}
				{comments !== undefined &&
					comments.map((item: IApiComment) => {
						return (
							<Comment
								key={item._id}
								commentObject={item}
							/>
						)
					})
				}
			</div>
		</>
	)
}
export default CommentFeed;
