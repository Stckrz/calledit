'use client'
import { RxHamburgerMenu } from 'react-icons/rx';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import UserNav from '../usernav/usernav';

const HamburgerNav: React.FC = () => {
	return (
		<>
			<div>
				<RxHamburgerMenu size={"3em"} />

				<div className={"h-16 flex items-center justify-between border border-b-gray-500 bg-cyan-500"}>
					<div
						className={"h-full w-112 bg-cyan-500 border border-black flex items-center justify-center rounded"}
					>
						<Link href="">
							<div className={"flex items-center justify-center gap-1"}>
								<AiOutlineHome size={"1.5em"} />
								Home
							</div>
						</Link>
					</div>
					<div className={"w-auto h-full bg-cyan-500 flex items-center justify-center rounded"}>navigation</div>
					<div className={"h-full w-112 bg-cyan-500 flex items-center justify-center rounded"}><UserNav /></div>
				</div>
			</div>
		</>
	)
}
export default HamburgerNav;
