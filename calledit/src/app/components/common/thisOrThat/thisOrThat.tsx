import React, {useEffect} from 'react';
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5';

interface ThisOrThatProps {
	callback: Function,
	value?: boolean
}

const ThisOrThat: React.FC<ThisOrThatProps> = ({ callback, value = null }) => {

	const handleClick = (selectedValue: boolean) => {
		callback(selectedValue)	
	}

	useEffect(()=>{
		value
		},[handleClick])

		return (
			<>
				<div className={"flex"}>
				{value !== false &&
					<button
						disabled={value !== null && true}
						onClick={() => { callback(true) }}
						className={"btn-square"}>
						<IoCheckmarkSharp size={"1em"} />
					</button>
				}
				{value !== true &&
					<button
						disabled={value !== null && true}
						onClick={() => { callback(false) }}
						className={"btn-square bg-cinna hover:bg-red-700"}>
						<IoCloseSharp size={"1em"} />
					</button>
				}
				</div>
			</>
		)
}
export default ThisOrThat
