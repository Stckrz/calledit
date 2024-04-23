'use client'
import React from 'react';
import { useCookies } from 'react-cookie';
import PredictionFeed, { FeedType } from '@/app/components/predictionFeed/predictionFeed';

const Dashboard: React.FC = () => {

	const [cookie, setCookie] = useCookies(['userInfo'])
	return (
		<>
			<div className={"flex flex-col items-center justify-center w-3/4 self-center"}>
				{cookie.userInfo
					? <div className={"w-full flex flex-col items-center justify-center"}>
						<PredictionFeed username={cookie.userInfo?.username} feedType={FeedType.ConfirmPrediction} />
					</div>
					: <div>No user currently logged in</div>
				}
			</div>
		</>
	)
}

export default Dashboard
