import { SetStateAction } from "react"

interface PaginationProps {
	setPage: React.Dispatch<SetStateAction<number>>,
	page: number,
	entryCount: number,
	entryLimit: number
}
const Pagination: React.FC<PaginationProps> = ({ setPage, page, entryCount, entryLimit }) => {
	const pages = Math.floor(entryCount / entryLimit) + 1
	const pageArray = []

	for (let i = 0; i < pages; i++) {
		pageArray.push(i + 1)
	}

	return (
		<>
			<div className={"flex items-center justify-end h-full"}>
				<div className={"flex items-center justify-center bg-gray-100 rounded select-none"}>
					<div
						className={"flex items-center justify-center m-0.5 rounded bg-cyan-500 px-1 cursor-pointer"}
						onClick={() => { page > 1 && setPage(page - 1) }}
					>
						{"<"}
					</div>
					{
						pageArray.map((page) => {
							return (
								<div
									key={page}
									className={"flex items-center justify-center h-1/2 m-0.5 rounded bg-cyan-500 px-1 cursor-pointer"}
									onClick={() => { setPage(page) }}>
									{page}
								</div>
							)
						})
					}
					<div
						className={"flex items-center justify-center h-1/2 m-0.5 rounded bg-cyan-500 px-1 cursor-pointer"}
						onClick={() => { page < pages && setPage(page + 1) }}
					>
						{">"}
					</div>
				</div>
			</div>
		</>
	)
}

export default Pagination;
