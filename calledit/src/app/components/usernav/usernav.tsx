import Link from "next/link";
const UserNav: React.FC = () => {
	return (
		<>
			<div className={"flex gap-1"}>
				<div>
					<Link href="/user/login">Login</Link>
				</div>
				<div>
					<Link href="/user/register">Register</Link>
				</div>
			</div>
		</>
	)
}
export default UserNav;
