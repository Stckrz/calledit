'use client'
import React, { useState, useEffect } from 'react';
import { getPredictions } from '@/app/library/api/predictionfetch';
import { getPredictionsByUsername, getPredictionsVotedByUsername } from '@/app/library/api/userfetch';
import { IPrediction } from '@/app/models/predictionmodels';
import { categoryArray } from '@/app/library/objects/categoryArray';
import Prediction, { Mode } from '@components/predictionView/predictionView';
import CategoryPicker from '../categoryPicker/categoryPicker';
import Dropdown from '../common/dropdown/dropdown';

export enum FeedType {
	Normal,
	UserFeed,
	ConfirmPrediction
}

interface PredictionFeedProps {
	username?: string,
	modifier?: string
	feedType: FeedType
}

const PredictionFeed: React.FC<PredictionFeedProps> = ({ username = "", feedType = FeedType.Normal }) => {
	const [category, setCategory] = useState<string>("All");
	const [predictionArray, setPredictionArray] = useState<IPrediction[]>([])

	async function setConfirmedPredictionFeed() {
		const tempArr = []
		let arr: IPrediction[] = []
		arr = await getPredictions({ username: username })
		for (let i of arr) {
			i.completed && i.authorPredictionConfirmed === null &&
				tempArr.push(i)
		}
		setPredictionArray(tempArr)
	}

	async function predictionFetch() {
		if (feedType === FeedType.ConfirmPrediction) {
			setConfirmedPredictionFeed()
		} else if (feedType === FeedType.UserFeed) {
			if (username) {
				if (category === "votes") {
					const arr = await getPredictionsVotedByUsername(username)
					setPredictionArray(arr.reverse())
				}
				else if (category === "userposts") {
					const arr = await getPredictionsByUsername(username)
					setPredictionArray(arr.reverse())
				} else {
					const arr = await getPredictionsByUsername(username)
					setPredictionArray(arr.reverse())
				}
			}
		} else if (feedType === FeedType.Normal) {
			if (category === "All") {
				const arr = await getPredictions({})
				setPredictionArray(arr)
			} else {
				const arr = await getPredictions({ category: category })
				setPredictionArray(arr)
			}
		}
	}

	const categoryMarkup = (feedType: FeedType) => {
		switch (feedType) {
			case FeedType.Normal:
				return (
					<CategoryPicker setCategory={setCategory} categories={categoryArray} />
				)
			case FeedType.UserFeed:
				return (
					<Dropdown callback={setCategory} options={["votes", "userposts"]} />
				)
			case FeedType.ConfirmPrediction:
				return (
					<div></div>
				)
		}
	}

	useEffect(() => {
		predictionFetch()
	}, [category])

	return (
		<>
			<div className={"flex flex-col gap-2 w-1/2 self-center"}>
				{categoryMarkup(feedType)}
				{predictionArray?.length > 0 ?
					predictionArray.map((item) => {
						return (
							<Prediction
								key={item._id}
								item={item}
								mode={feedType === FeedType.ConfirmPrediction ? Mode.Confirming : Mode.Voting} />
						)
					})
					: <div>Nothing to show...</div>
				}
			</div>
		</>
	)
}

export default PredictionFeed
