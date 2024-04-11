'use client'
import React, { useState, useEffect } from 'react';
import { updatePrediction, getConfirmedByUser } from '@/app/library/api/predictionfetch';
import { IPrediction } from '@/app/models/predictionmodels';
import Link from 'next/link';
import VoteScale from '../votescale/votescale';
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5';

interface ConfirmPredictionsProps {
	username: string,
	token: string
}

const ConfirmPredictions: React.FC<ConfirmPredictionsProps> = ({ username, token }) => {
	const [confirmedPredictions, setConfirmedPredictions] = useState<IPrediction[]>([]);

	async function getNonConfirmedPredictions() {
		setConfirmedPredictions(await getConfirmedByUser(username))
	}

	const updatePredictionResult = (id: string, result: boolean) => {
		const updatedData = {
			authorPredictionConfirmed: result
		}
		updatePrediction(updatedData, id, token)
	}

	useEffect(() => {
		getNonConfirmedPredictions()
	}, [])

	return (
		<>
			{confirmedPredictions.map((item) => {
				return (
					<div key={item._id} className={"w-1/2 flex flex-col items-start justify-center gap-1 p-6 m-1 border border-gray-200 rounded-xl shadow-lg shadow-gray-400 bg-gray-100"}>
						<div className={"flex justify-between items-center w-full font-semibold"}>
							<div>{item.title}</div>
							<Link href={`/user/profile/${item.author}`}><div>{item.author}</div></Link>
						</div>
						<div>{item.category}</div>
						<div>{item.description}</div>
						<div
							className={"flex items-center justify-center gap-2 w-full"}>
							{item.votes && item._id &&
								<VoteScale prediction={item} id={item._id} votes={item.votes} />
							}
						</div>
						<div>
							<div>did this happen?</div>
							<div className={"flex"}>
								<button
									onClick={() => { item._id && updatePredictionResult(item._id, true) }}
									className={"btn-primary"}>
									<IoCheckmarkSharp size={"2em"}/>
								</button>
								<button 
									onClick={() => { item._id && updatePredictionResult(item._id, false) }}
									className={"btn-primary bg-cinna"}>
									<IoCloseSharp size={"2em"}/>
								</button>
							</div>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default ConfirmPredictions;
