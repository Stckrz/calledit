'use client'
import React, { useState, useEffect } from 'react';
import { updatePrediction, getPredictionVotesById } from '@/app/library/api/predictionfetch';
import { IPrediction, IVotesObject } from '@/app/models/predictionmodels';
import { useCookies } from 'react-cookie';
import ProgressBar from '@components/common/progressBar/progressBar';
import ThisOrThat from '../common/thisOrThat/thisOrThat';

interface VoteScaleProps {
	votes: any[],
	id: string,
	prediction: IPrediction
}

const VoteScale: React.FC<VoteScaleProps> = ({ votes, id, prediction }) => {
	const [postVotes, setPostVotes] = useState<IVotesObject>();
	const [errorMessage, setErrorMessage] = useState("");
	const [rerender, setRerender] = useState("");

	const [cookie] = useCookies(['userInfo'])

	const userVote = (vote: boolean) => {
		if (cookie.userInfo) {
			if (!postVotes?.uservote) {
				let obj = {
					username: cookie.userInfo.username,
					vote: vote
				}
				updatePrediction({ votes: [...votes, obj] }, id, cookie.userInfo.token)
			} else {
				setErrorMessage("You can only vote once on a prediction")

			}
		} else {
			setErrorMessage("Must be logged in to vote")
		}
		getVotes()
		setRerender("")
	}

	async function getVotes() {
		if (cookie.userInfo) {
			const usernameData = { "username": cookie.userInfo.username }
			setPostVotes(await getPredictionVotesById(prediction._id!, usernameData))
		} else {
			setPostVotes(await getPredictionVotesById(prediction._id!, { "username": "" }))
		}
	}

	useEffect(() => {
		getVotes()
	}, [votes, rerender])

	return (
		<>
			<div className={"flex flex-col w-full items.center justify-center"}>
				<div className={"flex w-full items-center justify-center"}>
					{!prediction.completed
						&& <ThisOrThat callback={userVote} value={postVotes?.uservote?.vote} />
					}
					<div>{errorMessage}</div>
					<ProgressBar
						ratio={postVotes?.ratio}
						troughClassName={"w-full h-6 bg-cinna rounded-2xl"}
						barClassName={"h-6 bg-cyan-500 rounded-2xl"}
					/>
				</div >
				<div className={"flex justify-center"}>{prediction.completed && "Voting for this prediction has ended"}</div>
			</div>
		</>
	)
}

export default VoteScale;
