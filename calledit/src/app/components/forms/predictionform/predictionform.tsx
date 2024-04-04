'use client'
import React, { useState } from 'react';
import { addPrediction } from '@/app/library/api/predictionfetch';

import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from '@components/common/dropdown/dropdown';

const PredictionForm: React.FC = () => {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [completionDate, setCompletionDate] = useState(new Date())
	const [cookie, setCookie] = useCookies(['userInfo'])

	const router = useRouter();
	const [submitError, setSubmitError] = useState("");

	const categoryArray = ["Politics", "Personal", "Other"]

	const formCheckHandler = () => {
		if (!cookie.userInfo) {
			setSubmitError("hahaha")
		} else if (title === "") {
			setSubmitError("Title cannot be empty")
		} else if (description === "") {
			setSubmitError("Description cannot be empty")
		} else {
			handlePredictionSubmit()
		}
	}

	async function handlePredictionSubmit() {
		const predictionData = {
			"title": title,
			"category": category,
			"description": description,
			"author": cookie.userInfo.username,
			"votes": [],
			"finished_on": completionDate.toString(),
		}
		let a = await addPrediction(predictionData, cookie.userInfo?.token)
		if (a._id) {
			router.push("/")
			setTitle("");
			setDescription("")
		} else {
			setSubmitError("something went wrong, please try again")
		}
	}

	return (
		<>
			<div className={"flex flex-col items-center justify-center gap-1 w-full flex-grow border"}>
				<div className={"flex flex-col items-start justify-center gap-1 p-6 border border-gray-200 rounded-xl shadow-lg shadow-gray-400 bg-gray-100"}>
					<label className={"flex flex-col font-bold text-gray-600"}>Title
						<input className={"input-primary"} onChange={e => { setTitle(e.target.value) }} />
					</label>
					<div className={"flex flex-col font-bold text-gray-600"}>Category
						<Dropdown options={categoryArray} value={category} callback={setCategory} />
					</div>
					<label className={"flex flex-col font-bold text-gray-600"}>Description
						<input className={"input-primary"} onChange={e => { setDescription(e.target.value) }} />
					</label>

					<label className={"flex flex-col font-bold text-gray-600 align-start"}>Completion Date
						<DatePicker className={"input-primary h-9"} selected={completionDate} onChange={(date: Date) => setCompletionDate(date)} />
					</label>
					<button className={"btn-primary self-end"} onClick={() => { formCheckHandler() }}>submit</button>
					<div className={"self-start text-red-600"}>{submitError}</div>
				</div>
			</div>
		</>
	)
}

export default PredictionForm
