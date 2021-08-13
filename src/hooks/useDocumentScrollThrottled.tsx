import { useEffect, useState } from "react";
import { throttle } from "lodash";

type callbackProps = {
	previousScrollTop: number;
	currentScrollTop: number;
};

const useDocumentScrollThrottled = (
	callback: ({ previousScrollTop, currentScrollTop }: callbackProps) => void
) => {
	const [, setScrollPosition] = useState<number>(0);
	let previousScrollTop: number = 0;

	const handleDocumentScroll = () => {
		const { scrollTop: currentScrollTop } =
			document.documentElement || document.body;

		setScrollPosition((previousPosition) => {
			previousScrollTop = previousPosition;
			return currentScrollTop;
		});

		callback({ previousScrollTop, currentScrollTop });
	};
	const handleDocumentScrollThrottled = throttle(handleDocumentScroll, 250);

	useEffect(() => {
		window.addEventListener("scroll", handleDocumentScrollThrottled);

		return () =>
			window.removeEventListener("scroll", handleDocumentScrollThrottled);
	}, []);
};

export default useDocumentScrollThrottled;
