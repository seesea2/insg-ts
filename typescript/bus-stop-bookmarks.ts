
export function add(busStop) {
	const storageStr = localStorage.getItem('busStopBookmarks');
	let bookmarks = [];
	if(storageStr) {
		bookmarks = JSON.parse(storageStr);
	}
	bookmarks.push(busStop);
	localStorage.setItem('busStopBookmarks', JSON.stringify(bookmarks));
}

export function exist(busStopCode) {
	let storageStr = localStorage.getItem('busStopBookmarks');
	if(!storageStr) {
		return false;
	}
	const bookmarks = JSON.parse(storageStr);
	for(let i = 0; i < bookmarks.length; ++i) {
		if(busStopCode === bookmarks[i].BusStopCode) {
			return true;
		}
	}
	return false;
}

export function remove(busStopCode) {
	let storageStr = localStorage.getItem('busStopBookmarks');
	if(!storageStr) {
		return true;
	}
	const bookmarks = JSON.parse(storageStr);
	for(let i = 0; i < bookmarks.length; ++i) {
		if(busStopCode === bookmarks[i].BusStopCode) {
			bookmarks.splice(i, 1);
			localStorage.setItem('busStopBookmarks', JSON.stringify(bookmarks));
			return true;
		}
	}
	return true;
}

export function getAll() {
	const storageStr = localStorage.getItem('busStopBookmarks');
	let bookmarks = [];
	if(storageStr) {
		bookmarks = JSON.parse(storageStr);
	}
	return bookmarks;	
}

