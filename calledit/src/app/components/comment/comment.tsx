import React, { useState, useEffect } from 'react';
import { updateComment } from "@/app/library/api/commentfetch"
import { commentVote, IApiComment } from "@/app/models/commentmodels"
import { BiDownvote, BiSolidDownvote, BiUpvote, BiSolidUpvote } from "react-icons/bi"
import { useCookies } from 'react-cookie';

interface CommentProps {
	commentObject: IApiComment
}

const Comment: React.FC<CommentProps> = ({ commentObject }) => {
	const [userVote, setUserVote] = useState("")
	const [cookie, setCookie] = useCookies(['userInfo'])

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

	useEffect(() => {
		checkUserVote()
	}, [commentObject, userVote])

	return (
		<div className={"flex flex-col border border-gray-400 rounded w-full p-2"}>
			<div>{commentObject.author}</div>
			<div>{commentObject.title}</div>
			<div>{commentObject.postBody}</div>
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
		</div >

	)
}
export default Comment;
