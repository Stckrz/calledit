'use client'
import React, { useState, useEffect } from 'react';
import { getPredictions } from '@/app/library/api/predictionfetch';
import { IPrediction } from '@/app/models/predictionmodels';
import Prediction from '@components/predictionView/predictionView';
import { getPredictionsByUsername, getPredictionsVotedByUsername } from '@/app/library/api/userfetch';

interface PredictionFeedProps {
	username?: string,
}
const PredictionFeed: React.FC<PredictionFeedProps> = ({ username }) => {
	const [predictionArray, setPredictionArray] = useState<IPrediction[]>([])
	const [feedType, setFeedType] = useState("default")

	async function predictionFetch() {
		if (username) {
			if (feedType === "votes") {
				const arr = await getPredictionsVotedByUsername(username)
				setPredictionArray(arr.reverse())
			}
			else if (feedType === "userposts") {
				const arr = await getPredictionsByUsername(username)
				setPredictionArray(arr.reverse())
			} else {
				const arr = await getPredictionsByUsername(username)
				setPredictionArray(arr.reverse())
			}
		} else {
			const arr = await getPredictions()
			setPredictionArray(arr.reverse())
		}
	}

	useEffect(() => {
		predictionFetch()
	}, [feedType])
	console.log(feedType)

	return (
		<>
			<div className={"flex flex-col gap-2"}>
				{username &&
					<div className={"flex"}>
						<button className={"btn-primary"} onClick={() => { setFeedType("userposts") }}>posts by user</button>
						<button className={"btn-primary"} onClick={() => { setFeedType("votes") }}>posts user voted on</button>
					</div>
				}
				{predictionArray.length > 0 &&
					predictionArray.map((item) => {
						return (
							<Prediction key={item._id} item={item} />
						)
					})
				}
			</div>
		</>
	)
}
export default PredictionFeed
