'use client'
import React from 'react';
// import ConfirmPredictions from '@components/confirmPredictions/confirmPredictions';
import { useCookies } from 'react-cookie';
import PredictionFeed, { FeedType } from '@/app/components/predictionFeed/predictionFeed';


const Dashboard: React.FC = () => {
	const [cookie, setCookie] = useCookies(['userInfo'])
	return (
		<>
			<div className={"flex flex-col items-center justify-center w-full"}>
				{cookie.userInfo
					? <div className={"w-full flex flex-col items-center justify-center"}>
						{/* <ConfirmPredictions username={cookie.userInfo.username} token={cookie.userInfo.token} /> */}
						<PredictionFeed username={cookie.userInfo?.username} feedType={FeedType.ConfirmPrediction}/>
					</div>
					: <div>No user currently logged in</div>
				}
			</div>
		</>
	)
}

export default Dashboard
