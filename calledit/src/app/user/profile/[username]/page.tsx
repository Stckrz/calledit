'use client'
import React, { useEffect, useState } from 'react';
import { getUserByUsername } from '@/app/library/api/userfetch';
import { IUser, iUserInitial } from '@/app/models/usermodels';
import PredictionFeed, { FeedType } from '@/app/components/predictionFeed/predictionFeed';

interface UserProfileProps {
	params: {
		username: string
	},
	searchParams: {}
}
const UserProfile: React.FC<UserProfileProps> = (params) => {
	const username = params.params.username
	const [user, setUser] = useState<IUser>(iUserInitial)

	async function getUserData() {
		setUser(await getUserByUsername(username))
	}
	// votes userposts
	useEffect(() => {
		getUserData()
	}, [params])

	return (
		<>
			<div className={"h-full w-full flex items-center justify-center border-cinna"}>
				{user.username ?
					<div className={"flex flex-col w-full md:w-1/2 lg:w-3/4 h-full"}>
						<div className={"w-full flex justify-between"}>
							<div>{`${user.username}'s Profile`}</div>
							<div>{user.score}</div>
							
						</div>
						<div className={"flex flex-col"}>
							<PredictionFeed username={username} feedType={FeedType.UserFeed}/>
						</div>
					</div>
					: <div>user not found..</div>
				}
			</div>
		</>
	)
}
export default UserProfile;
