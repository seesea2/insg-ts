export function getMovieList() {

let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
	if(this.readyState == 4 && this.status == 200) {
let	movieList = JSON.parse(this.responseText);

let elmList = document.getElementById('movielist');
elmList.html = '';
movieList.forEach(movie => {
let div = document.createElement("DIV");
div.className = 'col-md-3';

let elm = document.createElement("LABEL");
elm.innerHTML = movie;
elm.style.cursor = 'pointer';
elm.addEventListener('click', ()=>{
		let elmVideo = document.getElementById('videoplayer');
		elmVideo.src = 'https://movies.insg.xyz/' + movie;
		elmVideo.load();
		elmVideo.play();
	elmVideo.scrollIntoView();

}
div.appendChild(elm);
elmList.appendChild(div);
});

	}
};

xhttp.open('GET', 'https://insg.xyz/api/movies', true);
xhttp.send();
}

getMovieList();


