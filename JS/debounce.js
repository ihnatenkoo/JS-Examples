const fetchUrl = (url) => {
	console.log(`Fetching ${url}...`);
};

function debounce(callback, delay) {
	let timer = null;

	return (...args) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			callback(...args);
		}, delay);
	};
}

const fetching = debounce(fetchUrl, 300);

fetching(1);
fetching(2);
fetching(3);
fetching(4);
fetching(5);
