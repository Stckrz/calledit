import { useState, useRef, SetStateAction } from "react";
import { useClickOutside } from "@/app/hooks/useClickOutside";

interface DropdownProps {
	options: string[],
	callback: React.Dispatch<SetStateAction<string>>,
	value?: string
}

const Dropdown: React.FC<DropdownProps> = ({ options, value = "click to select", callback }) => {
	const dropdownRef = useRef(null);
	const [isShown, setIsShown] = useState(false);
	useClickOutside(dropdownRef, () => { setIsShown(false) })

	const selectCategoryHandler = (category: string) => {
		setIsShown(false);
		callback(category);
	}

	return (
		<>
			<div className={"w-full"}>
				<input onClick={() => { setIsShown(!isShown) }} className={"input-primary relative"} readOnly placeholder={"Click to select"} value={value}></input>
				{isShown &&
					<div ref={dropdownRef} className={"absolute w-80 input-primary p-1 m-0 bg-gray-50 text-gray-600 z-40"}>
						{options.map((item) => {
							return (
								<div className={"hover:bg-cyan-500 p-1 rounded bg-gray-50 text-gray-600 "} key={item} onClick={() => { selectCategoryHandler(item) }}>
									{item}
								</div>
							)
						})
						}
					</div>
				}
			</div>
		</>
	)
}

export default Dropdown;
