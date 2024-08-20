export const useDebounce = (func: (...args: any[]) => void, timeOut = 3000) => {
	let timer: ReturnType<typeof setTimeout>;

	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(null, args);
		}, timeOut);
	};
};

export default useDebounce