'use client'
import React, { useState, useEffect } from 'react';
import { IPrediction } from '@/app/models/predictionmodels';
import { FaRegUser } from "react-icons/fa";
import { getPredictions } from "@/app/library/api/predictionfetch";

interface UserIconProps {
	username: string
}

const UserIcon: React.FC<UserIconProps> = ({ username }) => {
	const [uncheckedPredictions, setUncheckedPredictions] = useState<number>(0)

	async function setConfirmedPredictionFeed() {
		let tempCount = 0
		const arr = await getPredictions({ username: username })
		for (let i of arr) {
			if(i.completed && i.authorPredictionConfirmed === null){
				tempCount += 1;
			}
		}
		setUncheckedPredictions(tempCount)
	}

	useEffect(() => {
		setConfirmedPredictionFeed()
	}, [username])

	return (
		<>
			<div className={"flex items-center justify-center"}>
				<div className={"flex self-start items-center justify-center bg-cinna w-4 aspect-square text-xs rounded-full"}>{uncheckedPredictions}
				</div>
				<div><FaRegUser /></div>
				<div>{username}</div>
			</div>
		</>
	)
}
export default UserIcon;
