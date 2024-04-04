import { useEffect } from 'react';

export const useClickOutside = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (ref.current && !ref.current.contains(e.target)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	})
}
