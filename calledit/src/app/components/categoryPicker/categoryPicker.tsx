import React, { SetStateAction } from 'react';

interface CategoryPickerProps {
	setCategory: React.Dispatch<SetStateAction<string>>,
	category: string,
	categories: string[]
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({ setCategory, category, categories=[] }) => {
	return (
		<>
			<div className={"flex h-full w-full bg-cyan-500 rounded"}>
				<div className={"flex items-center w-full justify-evenly"}>
					{categories.map((item) => {
						return (
						item === category ?
							<div className={"cursor-pointer bg-cyan-700 w-full flex items-center justify-center p-1"} key={item} onClick={() => { setCategory(item) }}>{item}</div>
							:
							<div className={"cursor-pointer hover:bg-cyan-700 w-full flex items-center justify-center p-1"} key={item} onClick={() => { setCategory(item) }}>{item}</div>
						)
					})
					}
				</div>
			</div>
		</>
	)
}

export default CategoryPicker
