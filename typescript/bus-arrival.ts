import {add, exist} from './bus-stop-bookmarks.ts';

const h3 = document.querySelector('h3');
const button = document.querySelector('button#refresh');
const btnBookmark = document.querySelector('button#bookmark');
const btnBack = document.querySelector('button#back');
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');
const spinner = document.querySelector('div#refresh');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const busStopCode = urlParams.get('busStop');

let currentBusStop;

export function calculateArrivalTime(bus) {
	if (!bus || !bus.EstimatedArrival) {
		return 'NA';
	}

	const date = new Date(bus.EstimatedArrival);
	if (date.valueOf() - Date.now() < 0) {
		return 'Arrived';
	}

	const diffMinutes = (date.valueOf() - Date.now()) / 1000 / 60;
	if (diffMinutes < 1) {
		return '1 min';
	} else {
		return diffMinutes.toFixed(0) + ' mins';
	}
}

export function getLoadColour(bus) {
	if(bus.Load == 'SEA')
		return 'bg-success';
	else if(bus.Load == 'SDA')
		return 'bg-info';
	else if(bus.Load == 'LSD')
		return 'bg-warning'

}

export function refresh() {
	if(!busStopCode) {
		return false;
	}

	spinner.classList.remove('d-none');
	table.classList.add('d-none');
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			const getRslt = JSON.parse(this.responseText);
			console.log(getRslt);
			currentBusStop = getRslt.busStop;

			h3.innerHTML = getRslt.busStop.Description;

			tbody.innerHTML = '';
			getRslt.busArrival.Services.forEach(service => {
				const tr = document.createElement('TR');
				const th = document.createElement('TH');
				th.setAttribute('scope', 'row');
				th.innerHTML = service.ServiceNo;
				tr.appendChild(th);
				let td = document.createElement('TD');
				td.innerHTML = calculateArrivalTime(service.NextBus);
				td.setAttribute('class', getLoadColour(service.NextBus));
				tr.appendChild(td);

				td = document.createElement('TD');
				td.innerHTML = calculateArrivalTime(service.NextBus2);
				td.setAttribute('class', getLoadColour(service.NextBus2));
				tr.appendChild(td);
				td = document.createElement('TD');
				td.innerHTML = calculateArrivalTime(service.NextBus3);
				td.setAttribute('class', getLoadColour(service.NextBus3));
				tr.appendChild(td);

				tbody.appendChild(tr);
			});
			spinner.classList.add('d-none');
			table.classList.remove('d-none');
			console.log(busStopCode);
			if(!exist(busStopCode)) {
				btnBookmark.classList.remove('d-none');
			} else {
				btnBookmark.classList.add('d-none');
			}
		}
	}
	xhttp.open('GET', '/api/lta/bus/busArrival/' + busStopCode);
	xhttp.send();
}

button.addEventListener('click', refresh);
refresh();
btnBookmark.addEventListener('click', () => {
	btnBookmark.classList.add('d-none');
	add(currentBusStop);
});
btnBack.addEventListener('click', () => {
	window.history.back();
});

