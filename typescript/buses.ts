const button = document.querySelector('button');
const input = document.querySelector('input');

export function getBusArrival() {
	let busStopCode = (input.value || '').trim();
	if(!busStopCode) {
		return false;
	}

	window.location.assign('/bus-arrival?busStop=' + busStopCode;
}

button.addEventListener('click', getBusArrival);
input.addEventListener('keyup', e => {
	if(e.keyCode === 13) {
		getBusArrival()
	}
});

