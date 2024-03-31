'use client'
import React, { useState, useEffect } from 'react';
import { getPredictions } from '@/app/library/api/predictionfetch';
import { IPrediction } from '@/app/models/predictionmodels';
import Prediction from '@components/predictionView/predictionView';

const PredictionFeed: React.FC = () => {
	const [predictionArray, setPredictionArray] = useState<IPrediction[]>([])

	async function predictionFetch() {
		setPredictionArray(await getPredictions())
	}

	useEffect(() => {
		predictionFetch()
	}, [])

	return (
		<>
			<div className={"flex flex-col gap-2"}>
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
