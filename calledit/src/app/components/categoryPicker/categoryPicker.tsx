import React, { SetStateAction } from 'react';
import { categoryArray } from '@/app/library/objects/categoryArray';

interface CategoryPickerProps {
	setCategory: React.Dispatch<SetStateAction<string>>
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({ setCategory }) => {
	return (
		<>
			<div className={"flex flex-col w-full"}>
				<div className={"flex items-center justify-evenly border bg-cyan-500 relative rounded"}>
					{categoryArray.map((item) => {
						return (
							<div key={item} onClick={() => { setCategory(item) }}>{item}</div>
						)
					})
					}
				</div>
			</div>
		</>
	)
}

export default CategoryPicker
