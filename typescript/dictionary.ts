const button = document.querySelector('button');
const input = document.querySelector('input');
const definitionsElm  = document.querySelector('#definitions');

export function search() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			const	dict = JSON.parse(this.responseText);

			definitionsElm.innerHTML = '';
			if(!dict.lexicalEntries)
				return;

			const li = document.createElement("LI");
			li.className = 'list-group-item active';
			li.innerHTML = 'Definitions:';
			definitionsElm.appendChild(li);

			dict.lexicalEntries.forEach(lexicalEntry  => {
				if(!lexicalEntry.entries)
					return;
				lexicalEntry.entries.forEach(entry => {
					const li = document.createElement("LI");
					li.className = 'list-group-item';
					li.innerHTML = entry;
					definitionsElm.appendChild(li);
				});
			});
		}
	}
	xhttp.open('GET', '/api/dictionary/oxford/' + input.value);
	xhttp.send();

}

button.addEventListener('click', search);
input.addEventListener('keyup', (e)=>{
	if(e.keyCode === 13) {
		search();
	}
});

