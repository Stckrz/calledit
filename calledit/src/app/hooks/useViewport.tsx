'use client'
import { useEffect, useState } from 'react';

export const useViewport = () => {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		// if (typeof window !== undefined) {
			const handleResize = () => {
				setWidth(window.innerWidth);
			}
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		// }
	}, [window.innerWidth])

	return { width }
}
