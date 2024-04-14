import React, { useEffect } from 'react';
import { getConfirmedByUser } from '@/app/library/api/predictionfetch';

// const UserConfirmPredictions = (username: string) => {
// 	async function getNonConfirmedPredictions() {
// 		setConfirmedPredictions(await getConfirmedByUser(username))
// 	}
//
// 	const updatePredictionResult = (id: string, result: boolean) => {
// 		const updatedData = {
// 			authorPredictionConfirmed: result
// 		}
// 		updatePrediction(updatedData, id, token)
// 	}
//
// 	useEffect(() => {
// 		getNonConfirmedPredictions()
// 	}, [])
// }
//
// export default UserConfirmPredictions;
