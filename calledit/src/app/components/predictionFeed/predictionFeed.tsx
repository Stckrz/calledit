'use client'
import React, { useState, useEffect } from 'react';
import { getPredictions, getPredictionsByCategory, getConfirmedByUser } from '@/app/library/api/predictionfetch';
import { IPrediction } from '@/app/models/predictionmodels';
import Prediction, { Mode } from '@components/predictionView/predictionView';
import { getPredictionsByUsername, getPredictionsVotedByUsername } from '@/app/library/api/userfetch';
import { useCookies } from 'react-cookie';

export enum FeedType {
	Normal,
	ConfirmPrediction
}

interface PredictionFeedProps {
	username?: string,
	modifier?: string
	feedType: FeedType
}

const PredictionFeed: React.FC<PredictionFeedProps> = ({ username = "", modifier, feedType }) => {
	const [predictionArray, setPredictionArray] = useState<IPrediction[]>([])


	async function predictionFetch() {
		if (feedType === FeedType.ConfirmPrediction) {
			const tempArr = []
			const arr = await getConfirmedByUser(username)
			for (let i of arr) {
				i.completed && i.authorPredictionConfirmed === null &&
					tempArr.push(i)
			}
			console.log(tempArr)
			setPredictionArray(tempArr)
		} else {

			if (username) {
				if (modifier === "votes") {
					const arr = await getPredictionsVotedByUsername(username)
					setPredictionArray(arr.reverse())
				}
				else if (modifier === "userposts") {
					const arr = await getPredictionsByUsername(username)
					setPredictionArray(arr.reverse())
				} else {
					const arr = await getPredictionsByUsername(username)
					setPredictionArray(arr.reverse())
				}
			} else {
				if (modifier) {
					if (modifier === "All") {
						const arr = await getPredictions()
						setPredictionArray(arr.reverse())
					} else {
						const arr = await getPredictionsByCategory(modifier)
						setPredictionArray(arr.reverse())
					}
				}
			}
		}
	}

	useEffect(() => {
		predictionFetch()
	}, [modifier])

	return (
		<>
			<div className={"flex flex-col gap-2 w-3/4 self-center"}>
				{/* {username && */}
				{/* 	<div className={"flex"}> */}
				{/* 		<button className={"btn-primary"} onClick={() => { setFeedType("userposts") }}>posts by user</button> */}
				{/* 		<button className={"btn-primary"} onClick={() => { setFeedType("votes") }}>posts user voted on</button> */}
				{/* 	</div> */}
				{/* } */}
				{predictionArray?.length > 0 &&
					predictionArray.map((item) => {
						return (
							<Prediction
								key={item._id}
								item={item}
								mode={feedType === FeedType.Normal ? Mode.Voting : Mode.Confirming} />
						)
					})
				}
			</div>
		</>
	)
}
export default PredictionFeed
