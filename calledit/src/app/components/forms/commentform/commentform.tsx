import { postNewComment } from '@/app/library/api/commentfetch';
import React, { useState, useEffect, SetStateAction } from 'react';
import { useCookies } from 'react-cookie';
import { addPredictionComment } from '@/app/library/api/predictionfetch';

interface CommentFormProps{
	predictionId: string,
	getComments: Function,
	setShowCommentForm: React.Dispatch<SetStateAction<boolean>>
	}
const CommentForm: React.FC<CommentFormProps> = ({predictionId, getComments, setShowCommentForm}) => {
	const [title, setTitle] = useState("");
	const [postBody, setPostBody] = useState("");
	const [commentError, setCommentError] = useState("");
	const [cookie, setCookie] = useCookies(['userInfo']);

	async function handleCommentSubmit() {
		if (!cookie.userInfo) {
			setCommentError("Must be logged in to comment")
		} else {

			const commentData = {
				"author": cookie.userInfo.username,
				"title": title,
				"postBody": postBody,
				"predictionId": predictionId
			}
			let a = await postNewComment(commentData, cookie.userInfo?.token, predictionId)
			if (a._id) {
				await addPredictionComment(a._id, predictionId, cookie.userInfo?.token)
				setTitle("")
				setPostBody("")
				getComments()
				setShowCommentForm(false)
			} else{
				setCommentError(a.message)
			}
		}
	}

	return (
		<>
			<div className={"flex flex-col items-start justify-center gap-1"}>
				<div className={"w-full flex flex-col items-center justify-center gap-1 p-6 border bordergray-00 rounded-xl shadow shadow-gray-400 bg-gray-100 my-2"}>
					<label className={"w-full flex flex-col font-bold text-gray-600"}>Title
						<input className={"input-primary w-1/2"} onChange={e => { setTitle(e.target.value) }} />
					</label>
					<label className={"flex flex-col font-bold text-gray-600 w-full"}>Body
						<input className={"input-primary"} onChange={e => { setPostBody(e.target.value) }} />
					</label>
					<button className={"btn-primary self-end"} onClick={() => { handleCommentSubmit() }}>Submit</button>
					<div className={"self-start text-red-600"}>{commentError}</div>
				</div>
			</div>

		</>
	)
}
export default CommentForm;

