const searchParams = new URLSearchParams(window.location.search);
const randomCard = document.querySelector('.random-card');
const randomBtn = document.querySelector('button.random-btn');
const searchBtn = document.querySelector('button.search-btn');
const api = 'https://api.punkapi.com/v2/beers';

const removeAllChildNodes = (parent) => {

    while (parent.firstChild) {

        parent.removeChild(parent.firstChild);
    }
}

function getData(url, callback) {

    fetch(url)
    .then(response => response.json())
    .then(data => {

        callback(data)
        //getRandomBeer(beer);
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

function getRandomBeer(data){       //Skapar upp bild och namn på ranombeer
    const beer = data[0]
    
    h2Tag = document.createElement('h2');

    beerImg = new Image (54.4, 212.2);
    beerImg.src = beer.image_url;

    randomCard.appendChild(beerImg);
    h2Tag.setAttribute('name', beer.id); 
    h2Tag.textContent = beer.name;
    
    randomCard.appendChild(h2Tag);  

    h2Tag.addEventListener('click', beerInfo);
}

function beerInfo(evt) {
    
    const id = evt.target.getAttribute('name');
    const url = `beerinfo.html?name=${id}`;
    document.location.href = url;
}

searchBtn.addEventListener('click', onSearchClicked);

function onSearchClicked() {
    
    const url = 'search.html';
    document.location.href = url;
}

