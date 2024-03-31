'use client'
import React, { useState } from 'react';
import { addPrediction } from '@/app/library/api/predictionfetch';

import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const PredictionForm: React.FC = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [cookie, setCookie] = useCookies(['userInfo'])
	const router = useRouter();
	const [submitError, setSubmitError] = useState("");

	async function handlePredictionSubmit() {
		if (cookie.userInfo) {
			const predictionData = {
				"title": title,
				"description": description,
				"author": cookie.userInfo.username,
				"votes": []
				// "finished_on": Date.now.toString(),

			}
			let a = await addPrediction(predictionData, cookie.userInfo?.token)
			console.log(a)
			if (a._id) {
				router.push("/")
				setTitle("");
				setDescription("")
			} else {
				setSubmitError("You must be logged in to do this")
			}
		} else {
			setSubmitError("You must be logged in")
		}
	}

	return (
		<>
			<div className={"flex flex-col items-center justify-center gap-1 w-full h-full border"}>
				<div className={"flex flex-col items-end justify-center gap-1 p-6 border border-gray-200 rounded-xl shadow-lg shadow-gray-400 bg-gray-100"}>
					<label className={"flex flex-col font-bold text-gray-600"}>Title
						<input className={"input-primary"} onChange={e => { setTitle(e.target.value) }} />
					</label>
					<label className={"flex flex-col font-bold text-gray-600"}>Description
						<input className={"input-primary"} onChange={e => { setDescription(e.target.value) }} />
					</label>
					<button className={"btn-primary"} onClick={() => { handlePredictionSubmit() }}>submit</button>
					<div className={"self-start text-red-600"}>{submitError}</div>
				</div>
			</div>
		</>
	)
}

export default PredictionForm
