import React, { useState, useEffect } from 'react';

interface TimerProps {
	completeInMs: number,
}

const Timer: React.FC<TimerProps> = ({ completeInMs }) => {
	const [timeRemainingMs, setTimeRemainingMs] = useState(completeInMs);
	const [formattedTimeRemaining, setFormattedTimeRemaining] = useState<string>("")

	const formatDateTime = (timeInMs: number) => {
		let seconds = Math.floor(timeInMs / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);
		minutes %= 60;
		hours %= 24;
		seconds %= 60;
		setFormattedTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`)
	}

	const countdownOne = () => {
		if (timeRemainingMs > 0) {
			setTimeRemainingMs(timeRemainingMs - 1)
		} else {
			setTimeRemainingMs(0)
		}
		// formatDateTime(timeRemainingMs)
		// console.log(timeRemainingMs)
	}

	useEffect(() => {
		setTimeRemainingMs(completeInMs)
	}, [completeInMs])

	useEffect(() => {
		if (timeRemainingMs < 1) { return }
		let timer = setTimeout(() => {
			countdownOne()

			return () => {
				clearTimeout(timer)
			}
		}, 1000)
	}, [timeRemainingMs])

	return (
		<>
			{timeRemainingMs}
			{formattedTimeRemaining}
		</>
	)
}

export default Timer;
