import {getAll} from './bus-stop-bookmarks.ts'


const button = document.querySelector('button#get');
const btnToggle = document.querySelector('button#toggle');
const input = document.querySelector('input');
const table = document.querySelector('table#nearby');
const tbody = document.querySelector('tbody#nearby');
const spinner = document.querySelector('span#toggleSpinner');
const divBookmark = document.querySelector('div#bookmark');
const tbodyBookmark = document.querySelector('tbody#bookmark');

let nearbyBusStops = [];
window.nearbyBusStops = [];

export function getBusArrival(pStopCode?: string) {
	let busStopCode;
	if(pStopCode) {
		busStopCode = pStopCode;
	}
	else {
		busStopCode = (input.value || '').trim();
	}
	if(!busStopCode) {
		return false;
	}

	window.location.assign('/bus-arrival?busStop=' + busStopCode;
}

export function toggleNearbyBusStops() {
	if(window.nearbyBusStops.length > 0) {
		table.classList.add('d-none');
		return window.nearbyBusStops = [];
	}

	if(navigator && navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(pos => {
			console.log(pos);
			if(pos && pos.coords){
				getNearbyBusStops(pos.coords);
			}
		}, error => {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					//  text = 'Request for Geolocation is denied.';
					break;
				case error.POSITION_UNAVAILABLE:
					//  text = 'Location information is unavailable.';
					break;
				case error.TIMEOUT:
					//  text = 'Request to get location timed out.';
					break;
				default:
					// case error.UNKNOWN_ERROR:
					// text = 'An unknown error occurred.';
					break;
			}
		}
	} else {
		// promp error.
	}
}

export function getNearbyBusStops(coords: Coordinates) {
	spinner.classList.remove('d-none');

	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			const stops = JSON.parse(this.responseText);

			console.log(stops);
			window.nearbyBusStops = stops;

			tbody.innerHTML = '';
			window.nearbyBusStops.forEach(stop => {
				const tr = document.createElement('TR');
				const th = document.createElement('TH');
				th.setAttribute('scope', 'row');
				// th.innerHTML = stop.busStop.BusStopCode;
				let btn = document.createElement('BUTTON');
				btn.classList.add('btn');
				btn.innerHTML = stop.busStop.BusStopCode;
				btn.addEventListener('click', () => {
					getBusArrival(stop.busStop.BusStopCode);
				});
				th.appendChild(btn);
				tr.appendChild(th);
				let td = document.createElement('TD');
				// td.innerHTML = stop.busStop.Description;
				btn = document.createElement('BUTTON');
				btn.classList.add('btn');
				btn.innerHTML = stop.busStop.Description;
				btn.addEventListener('click', () => {
					getBusArrival(stop.busStop.BusStopCode);
				});
				td.appendChild(btn);
				tr.appendChild(td);

				tbody.appendChild(tr);
			});
			table.classList.remove('d-none');
			spinner.classList.add('d-none');
		}
	}
	xhttp.open('GET', '/api/lta/bus/nearbyBusStops?latitude=' + coords.latitude + '&longitude=' + coords.longitude);
	xhttp.send();
}

export function getBookmarks() {
	const bookmarks = getAll();
	console.log('getBookmarks -> bookmarks: ', bookmarks);
	tbodyBookmark.innerHTML = '';
	if(bookmark.length == 0) {
		divBookmark.classList.add('d-none');
		return;
	}

	bookmarks.forEach(bookmark => {
		const tr = document.createElement('TR');
		const th = document.createElement('TH');
		th.setAttribute('scope', 'row');
		// th.innerHTML = bookmark.BusStopCode;
		let btn = document.createElement('BUTTON');
		btn.classList.add('btn');
		btn.innerHTML = bookmark.BusStopCode;
		btn.addEventListener('click', () => {
			getBusArrival(bookmark.BusStopCode);
		});
		th.appendChild(btn);
		tr.appendChild(th);
		let td = document.createElement('TD');
		// td.innerHTML = bookmark.Description;
		btn = document.createElement('BUTTON');
		btn.classList.add('btn');
		btn.innerHTML = bookmark.Description;
		btn.addEventListener('click', () => {
			getBusArrival(bookmark.BusStopCode);
		});
		td.appendChild(btn);
		tr.appendChild(td);
		tbodyBookmark.appendChild(tr);
	});
	divBookmark.classList.remove('d-none');
}


button.addEventListener('click', () => {
	getBusArrival()
});

input.addEventListener('keyup', e => {
	if(e.keyCode === 13) {
		getBusArrival()
	}
});

btnToggle.addEventListener('click', toggleNearbyBusStops);
getBookmarks();

if(window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
	location.reload(true);
}

