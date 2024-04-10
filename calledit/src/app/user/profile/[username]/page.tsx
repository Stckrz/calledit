'use client'
import React, { useEffect, useState } from 'react';
import { getUserByUsername } from '@/app/library/api/userfetch';
import { IUser, iUserInitial } from '@/app/models/usermodels';
import PredictionFeed from '@/app/components/predictionFeed/predictionFeed';

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
					<div className={"flex flex-col w-full md:w-1/2 h-full"}>
						<div>
							{`${user.username}'s Profile`}
						</div>
						<div className={"flex flex-col"}>
							<PredictionFeed username={username}/>
						</div>
					</div>
					: <div>user not found..</div>
				}
			</div>
		</>
	)
}
export default UserProfile;
