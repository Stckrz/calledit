import React, { useState, useEffect } from 'react';
import ProgressBar from '@components/common/progressBar/progressBar';
import Timer from '@components/common/timer/timer';

interface TimeScaleProps {
	title: string,
	timeCreated: string,
	timeFinished: string,
	completed: boolean
}

const TimeScale: React.FC<TimeScaleProps> = ({ title, timeCreated, timeFinished, completed }) => {
	const [timeProgress, setTimeProgress] = useState(0);

	const finishedDate = new Date(timeFinished);
	const createdDate = new Date(timeCreated);
	const totalPredictionTime = finishedDate.getTime() - createdDate.getTime();

	//gets the percentage of time that has passed between the time the prediction was created, and the time it will finish.
	const getTimeProgress = () => {
		const currentDate = new Date();
		const timePassed = currentDate.getTime() - createdDate.getTime();
		const timePassedPercent = (timePassed / totalPredictionTime) * 100;
		if (timePassedPercent <= 100) {
			setTimeProgress(timePassedPercent);
		} else {
			setTimeProgress(100);
		}
	}

	useEffect(() => {
		getTimeProgress();
	}, [])

	return (
		<>
			<div className={"flex flex-col w-full"}>
				<ProgressBar ratio={timeProgress} />
				{!completed
					? <div>
						<div><Timer dateCompleted={finishedDate} /></div>
					</div>
					: <div>completed</div>
				}
			</div>
		</>
	);
}

export default TimeScale;
