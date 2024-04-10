'use client'
import { IPrediction } from '@/app/models/predictionmodels';
import VoteScale from '../votescale/votescale';
import TimeScale from '../timescale/timescale';
import Link from 'next/link';

interface PredictionProps {
	item: IPrediction
}
const Prediction: React.FC<PredictionProps> = ({ item }) => {

	return (
		<>
			<div className={"flex flex-col items-start justify-center gap-1 p-6 m-1 border border-gray-200 rounded-xl shadow-lg shadow-gray-400 bg-gray-100"}>
				<div className={"flex justify-between items-center w-full font-semibold"}>
					<div>{item.title}</div>
					<Link href={`/user/profile/${item.author}`}><div>{item.author}</div></Link>
				</div>
				<div>{item.category}</div>
				<div>{item.description}</div>
				<div className={"flex items-center justify-center gap-2 w-full"}>
					{item.created_on && item.finished_on &&
						<TimeScale title={item.title} timeCreated={item.created_on} timeFinished={item.finished_on} completed={item.completed}/>
					}
				</div>
				<div className={"flex items-center justify-center gap-2 w-full"}>
					{item.votes && item._id &&
						<VoteScale id={item._id} votes={item.votes} prediction={item} />
					}
				</div>
				<div>{item.comments}</div>
			</div>
		</>
	)
}
export default Prediction;
