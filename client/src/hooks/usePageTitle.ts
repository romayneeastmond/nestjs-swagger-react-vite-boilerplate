import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | My App`;
	}, [title]);
};

export default usePageTitle;