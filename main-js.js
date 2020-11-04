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

function getData(url) {

    fetch(url)
    .then(response => response.json())
    .then(data => {

        beer = data[0];

        getRandomBeer(beer);
        
    })
    .catch(error => console.log(error));
}

randomBtn.addEventListener('click', onClick);

function onClick(beer) {

    removeAllChildNodes(randomCard);
    const url = `${api}/random`;
    
    getData(url);  
    
}

function getRandomBeer(beer){
    let h2Tag = document.createElement('h2');

    beerImg = new Image (54.4, 212.2);
    beerImg.src = beer.image_url;

    randomCard.appendChild(beerImg);

    h2Tag.textContent = beer.name;
    randomCard.appendChild(h2Tag);  
}

searchBtn.addEventListener('click', onSearchClicked);

function onSearchClicked(e) {
    
    const url = 'search.html';
    document.location.href = url;
}