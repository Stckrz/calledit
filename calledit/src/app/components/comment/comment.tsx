import React, { useState, useEffect } from 'react';
import { updateComment, getCommentsByPredictionId } from "@/app/library/api/commentfetch"
import { commentVote, IApiComment } from "@/app/models/commentmodels"
import { BiDownvote, BiSolidDownvote, BiUpvote, BiSolidUpvote } from "react-icons/bi"
import { useCookies } from 'react-cookie';
import CommentFeed, { CommentFeedType } from '../commentfeed/commentfeed';

interface CommentProps {
	commentObject: IApiComment
}

const Comment: React.FC<CommentProps> = ({ commentObject }) => {
	const [userVote, setUserVote] = useState("");
	const [cookie, setCookie] = useCookies(['userInfo']);
	const [comments, setComments] = useState([]);
	const [commentCount, setCommentCount] = useState(0);
	const [feedPage, setFeedPage] = useState(1);

	async function checkUserVote() {
		if (cookie.userInfo) {
			let result = commentObject.votes.find(obj => {
				return obj.username === cookie.userInfo.username
			})
			result && setUserVote(result.vote)
		}
	}

	function commentVoteHandler(vote: string) {
		if (cookie.userInfo) {
			if (userVote === "") {
				let commentUpdateObject = {
					username: cookie.userInfo.username,
					vote: vote
				}
				let commentData = [];
				commentObject.votes.map((item: commentVote) => {
					commentData.push(item)
				})
				commentData.push(commentUpdateObject)

				const pushData =
				{
					votes: commentData
				}
				updateComment(pushData, cookie.userInfo.token, commentObject._id)
				setUserVote(vote)
			}
		}
	}

	async function getComments() {
		const commentReturnObject = await getCommentsByPredictionId({ page: feedPage, id: commentObject._id })
		setComments(commentReturnObject?.comments)
		setCommentCount(commentReturnObject?.count)
	}

	useEffect(() => {
		checkUserVote()
		getComments()
	}, [commentObject, userVote])

	return (
		<div className={"flex flex-col border border-gray-400 rounded w-full p-2"}>
			<div>{commentObject.author}</div>
			<div>{commentObject.title}</div>
			<div>{commentObject.postBody}</div>
			<div className={"flex justify-between w-full"}>
				<div className={"flex"}>
					<div onClick={() => { commentVoteHandler("yes") }}>
						{userVote === "yes"
							? <BiSolidUpvote className={"text-cyan-500 text-xl"} />
							: <BiUpvote className={"text-cyan-500 text-xl"} />
						}
					</div>
					<div onClick={() => { commentVoteHandler("no") }}>
						{userVote === "no"
							? <BiSolidDownvote className={"text-cinna text-xl"} />
							: <BiDownvote className={"text-cinna text-xl"} />
						}
					</div>
				</div>
			</div>
			{commentObject.replies.length > 0 &&
				<CommentFeed commentFeedType={CommentFeedType.CommentReplies} parentId={commentObject._id} />
			}
		</div >

	)
}
export default Comment;
