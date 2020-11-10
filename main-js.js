const searchParams = new URLSearchParams(window.location.search);
const randomCard = document.querySelector('.random-card');
const randomBtn = document.querySelector('button.random-btn');
const searchBtn = document.querySelector('button.search-btn');
const api = 'https://api.punkapi.com/v2/beers';


let randomBeer = [];

if(window.sessionStorage.randomBeer) {
    randomBeer = JSON.parse(window.sessionStorage.randomBeer);
  } 
  
function saveRandomBeer(randomBeerData) {
window.sessionStorage.randomBeer = JSON.stringify(randomBeerData);
}

window.onbeforeunload = function(){
    sessionStorage.setItem("origin", window.location.href);
}

window.onload = function(){
    if(window.location.href === sessionStorage.getItem("origin")){
        sessionStorage.clear();
    }

    else {
        getRandomBeer(randomBeer);
    }
}


function removeAllChildNodes(parent) {

    while (parent.firstChild) {

        parent.removeChild(parent.firstChild);
    }
}

function getData(url, callback) {

    fetch(url)
    .then(response => response.json())
    .then(beerData => {
       
        callback(beerData);
    })
    .catch(error => console.log(error));
}


randomBtn.addEventListener('click', onClick);


function onClick(evt) {

   removeAllChildNodes(randomCard);
    
    const url = `${api}/random`;
    
    getData(url, getRandomBeer); 
    evt.preventDefault(); 
}

function getRandomBeer(randomBeerData){       //Skapar upp bild och namn på ranombeer
    if (randomBeerData.length > 0){
    const beer = randomBeerData[0]
    
    h2Tag = document.createElement('h2');

    beerImg = new Image (54.4);
    beerImg.src = beer.image_url;

    randomCard.appendChild(beerImg);
    randomCard.setAttribute('name', beer.id); 
    h2Tag.textContent = beer.name;
    
    randomCard.appendChild(h2Tag);  

    randomCard.addEventListener('click', beerInfo);

    saveRandomBeer(randomBeerData);
    }
}


function beerInfo(evt) {
    const id = randomCard.getAttribute('name');
    const url = `beerinfo.html?name=${id}`;
    document.location.href = url;
}


searchBtn.addEventListener('click', onSearchClicked);


function onSearchClicked() {
    
    const url = 'search.html';
    document.location.href = url;
}

