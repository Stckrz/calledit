'use client'
import { IPrediction } from '@/app/models/predictionmodels';
import VoteScale from '../votescale/votescale';
import TimeScale from '../timescale/timescale';
import Link from 'next/link';
import ThisOrThat from '../common/thisOrThat/thisOrThat';
import { updatePrediction } from '@/app/library/api/predictionfetch';
import { useCookies } from 'react-cookie';
import { userScoreIncrement } from '@/app/library/api/userfetch';

// import PredictionInteraction from '@components/predictionInteraction/predictionInteraction';

export enum Mode {
	Voting,
	Confirming
}

interface PredictionProps {
	item: IPrediction
	mode: Mode,
}

const Prediction: React.FC<PredictionProps> = ({ item, mode }) => {
	const [cookie, setCookie] = useCookies(['userInfo'])

	const updatePredictionResult = (result: boolean) => {
		const updatedData = {
			authorPredictionConfirmed: result
		}
		if (item._id) {
			updatePrediction(updatedData, item._id, cookie.userInfo?.token)
			for (let votes of item.votes) {
				if (votes.vote === result) {
					userScoreIncrement(votes.id)
				}
			}
		}
	}

	const modeMarkup = (mode: Mode) => {
		switch (mode) {
			case Mode.Voting:
				return (
					item._id &&
					<VoteScale id={item._id} votes={item.votes} prediction={item} />
				)
			case Mode.Confirming:
				return (
					<div>
						<div>Did this happen?</div>
						<ThisOrThat callback={updatePredictionResult} />
					</div>
				)
		}
	}

	return (
		<>
			<div className={"flex flex-col items-start justify-center gap-1 p-6 m-1 border border-gray-200 rounded-md shadow-lg shadow-gray-400 bg-gray-100"}>
				<div className={"w-full"}>
					<div className={"flex justify-between items-center w-full font-semibold"}>
						<div className={"text-xl text-wrap break-all"}>{item.title}</div>
						<Link href={`/user/profile/${item.author}`}><div>{item.author}</div></Link>
					</div>
					<div className={"text-sm"}>{item.category}</div>
					<div className={"border p-1 m-2 border-gray-300 w-full rounded"}>{item.description}</div>
				</div>
				<div className={"flex items-center justify-center gap-2 w-full"}>
					{item.created_on && item.finished_on &&
						<TimeScale title={item.title} timeCreated={item.created_on} timeFinished={item.finished_on} completed={item.completed} />
					}
				</div>
				{modeMarkup(mode)}

				<div>{item.comments}</div>
			</div>
		</>
	)
}
export default Prediction;
