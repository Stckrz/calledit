'use client'
import React, { useState, useEffect } from 'react';
import { updatePrediction, getPredictionVotesById } from '@/app/library/api/predictionfetch';
import { IVotesObject } from '@/app/models/predictionmodels';
import { useCookies } from 'react-cookie';
import ProgressBar from '@components/common/progressBar/progressBar';

interface VoteScaleProps {
	votes: any[],
	id: string
}

const VoteScale: React.FC<VoteScaleProps> = ({ votes, id }) => {
	const [postVotes, setPostVotes] = useState<IVotesObject>()
	const [errorMessage, setErrorMessage] = useState("")
	const [rerender, setRerender] = useState("")

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
			setPostVotes(await getPredictionVotesById(id, usernameData))
		} else {
			setPostVotes(await getPredictionVotesById(id, { "username": "" }))
		}
	}

	useEffect(() => {
		getVotes()
	}, [votes, rerender])


	return (
		<>
			<div className={"flex flex-col w-full "}>
				<div className={"flex w-full gap-1"}>
					<div
						onClick={() => { userVote("yes") }}
						className={"flex items-center g-1 justify-center text-seagreen"}>
						{postVotes?.uservote?.vote === "yes"
							? <div
								className={"h-5 aspect-square cursor-pointer rounded-full ring-2 bg-seagreen ring-seagreen"}>
							</div>
							: <div className={"h-5 aspect-square cursor-pointer rounded-full ring-2 ring-seagreen hover:bg-seagreen"}></div>
						}
					</div>

					<div
						className={"flex items-center gap-1 justify-center text-cinna"}
						onClick={() => { userVote("no") }}>
						{postVotes?.uservote?.vote === "no"
							? <div className={"h-5 aspect-square cursor-pointer rounded-full ring-2 ring-cinna bg-cinna"}></div>
							: <div className={"h-5 aspect-square cursor-pointer rounded-full ring-2 ring-cinna hover:bg-cinna shadow-2xl shadow-cinna"}></div>
						}
					</div>
					<ProgressBar  ratio={postVotes?.ratio} troughClassName={"w-full h-6 bg-cinna rounded-2xl"} barClassName={"h-6 bg-seagreen rounded-2xl"}/>
				</div>
				<div className={"text-cinna"}>{errorMessage}</div>
			</div>
		</>
	)
}

export default VoteScale;
