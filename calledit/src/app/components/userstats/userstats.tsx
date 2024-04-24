interface UserStatsProps {
	user: any
}

const UserStats: React.FC<UserStatsProps> = ({ user }) => {

	return (
		<>
			<div className={"flex flex-col items-center border border-gray rounded p-2 bg-gray-300 h-full"}>
				<div>{user.username}</div>
				<div>{user.rank}</div>
				<div>{user.score}</div>
			</div>
		</>
	)
}
export default UserStats;
