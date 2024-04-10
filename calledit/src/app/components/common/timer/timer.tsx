import React, { useState, useEffect } from 'react';

interface TimerProps {
	dateCompleted: Date
}

const Timer: React.FC<TimerProps> = ({ dateCompleted }) => {
	const [timeRemainingMs, setTimeRemainingMs] = useState(0);

	const formatDateTime = (timeInMs: number) => {
		let seconds = Math.floor(timeInMs / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);
		hours %= 24;
		minutes %= 60;
		seconds %= 60;
		return `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
	}

	const getTimeLeftMs = () => {
		const currentDate = new Date();
		const difference = Math.floor((dateCompleted.getTime() - currentDate.getTime()));
		setTimeRemainingMs(difference)
	}

	const countdown = () => {
		getTimeLeftMs();
		let timer = setInterval(() => {
			setTimeRemainingMs((v) => v - 1000)

		}, 1000)
		return () => {
			clearInterval(timer)
		}
	}

	useEffect(countdown, [dateCompleted])

	return (
		<>
			{timeRemainingMs > 1 &&
			<div>{formatDateTime(timeRemainingMs)}</div>
			}
		</>
	)
}

export default Timer;
