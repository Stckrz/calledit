'use client'
import React, { useState, useEffect } from 'react';
import { FaRegCircle, FaDotCircle } from "react-icons/fa";
import { updatePrediction } from '@/app/library/api/predictionfetch';
import { getPredictionVotesById } from '@/app/library/api/predictionfetch';
import { IVotesObject } from '@/app/models/predictionmodels';
import { useCookies } from 'react-cookie';

interface VoteScaleProps {
	votes: any[],
	id: string
}

const VoteScale: React.FC<VoteScaleProps> = ({ votes, id }) => {
	const [postVotes, setPostVotes] = useState<IVotesObject>()
	const [errorMessage, setErrorMessage] = useState("")

	const [cookie] = useCookies(['userInfo'])

	const userVote = (vote: string) => {
		if (cookie.userInfo) {
			if (!postVotes?.uservote) {
				let obj = {
					username: cookie.userInfo.username,
					vote: vote
				}
				updatePrediction({ votes: [...votes, obj] }, id, cookie.userInfo.token)
			} else {
				setErrorMessage("You already voted lol")
			}
		} else {
			setErrorMessage("Must be logged in to vote")
		}
	}

	async function getVotes() {
		if (cookie.userInfo) {
			const usernameData = { "username": cookie.userInfo.username }
			setPostVotes(await getPredictionVotesById(id, usernameData))
		} else {
			setPostVotes(await getPredictionVotesById(id, { "username": "" }))
		}

	}

	useEffect(() => {
		getVotes()
	}, [votes])

	return (
		<>
			<div className={"flex flex-col w-full"}>
				<div className={"flex w-full gap-1"}>
					<div
						onClick={() => { userVote("yes") }}
						className={"flex items-center justify-center text-seagreen"}>
						{postVotes?.uservote?.vote === "yes"
							? <FaDotCircle size={"1.5em"} />
							: <FaRegCircle size={"1.5em"} />
						}
					</div>

					<div
						className={"flex items-center justify-center text-cinna"}
						onClick={() => { userVote("no") }}>
						{postVotes?.uservote?.vote === "no"
							? <FaDotCircle size={"1.5em"} />
							: <FaRegCircle size={"1.5em"} />
						}
					</div>

					<div className={"w-full h-6 bg-cinna rounded-2xl"}>
						{postVotes !== undefined &&
							<div className={"h-6 bg-seagreen rounded-2xl"} style={{ width: `${postVotes.ratio}%` }}></div>
						}
					</div>
				</div>
				<div className={"text-cinna"}>{errorMessage}</div>
			</div>
		</>
	)
}

export default VoteScale;
