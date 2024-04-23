import {IPrediction, IApiPrediction} from '../../models/predictionmodels'

export const typeConversion = (predictionsArray: IApiPrediction[]): IPrediction[] => {
	const newData = predictionsArray.map((item: IApiPrediction) => {
		const currentDate = new Date()
		const finishedDate = new Date(Date.parse(item.finished_on))
		return (currentDate > finishedDate ? { ...item, "completed": true } : { ...item, "completed": false })
	})
	return newData

}
