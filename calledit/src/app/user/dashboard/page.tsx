'use client'
import React from 'react';
import ConfirmPredictions from '@components/confirmPredictions/confirmPredictions';
import { useCookies } from 'react-cookie';


const Dashboard: React.FC = () => {
	const [cookie, setCookie] = useCookies(['userInfo'])
	return (
		<>
			<div className={"flex flex-col items-center justify-center w-full h-full"}>
			{cookie.userInfo 
				? <ConfirmPredictions username={cookie.userInfo.username} token={cookie.userInfo.token} />
				: <div>No user currently logged in</div>
			}
			</div>
		</>
	)
}

export default Dashboard
