interface ProgressBarProps {
	ratio?: number
	troughClassName?: string
	barClassName?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ratio, troughClassName = "w-full h-2 bg-cyan-500", barClassName = "bg-cinna h-2" }) => {

	return (
		<>
			<div className={troughClassName}>
				<div className={barClassName} style={{ width: `${ratio}%` }}>
				</div>
			</div>
		</>
	)
}

export default ProgressBar
