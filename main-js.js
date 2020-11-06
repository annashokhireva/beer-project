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
    h2Tag = document.createElement('h2');

    beerImg = new Image (54.4, 212.2);
    beerImg.src = beer.image_url;

    randomCard.appendChild(beerImg);

    h2Tag.textContent = beer.name;
    randomCard.appendChild(h2Tag);   
}

//modal start
randomCard.addEventListener('click', popUp);
    
const divModal = document.querySelector('.divModal')
const modalBeer = document.querySelector('.bg-modal')
const modalClose = document.querySelector('.close')
                
function popUp(randomCard) {
    removeAllChildNodes(divModal);
                        
    modalBeer.style.display = "flex";
    modalClose.addEventListener("click", function(){
        modalBeer.style.display = "none";
    })
    
    const beerABV = beer.abv
    const beerVol = beer.volume
    const beerIngredients = beer.ingredients
    const beerHops = beer.hops
    const beerPairing = beer.food_pairing
    const beerTips = beer.brewers_tips

    const pAbv = document.createElement('p');
    const pVol = document.createElement('p');
    const pInred = document.createElement('p')
    const pHops = document.createElement('p')
    const pPair = document.createElement('p');
    const pTips = document.createElement('p');

    const pAbvNode = document.createTextNode(beerABV)
    const pVolNode = document.createTextNode(beerVol)
    const pInredNode = document.createTextNode(beerIngredients)
    const pHopsNode = document.createTextNode(beerHops)
    const pPairNode = document.createTextNode(beerPairing);
    const pTipsNode = document.createTextNode(beerTips)

    pAbv.appendChild(pAbvNode);
    pVol.appendChild(pVolNode);
    pInred.appendChild(pInredNode)
    pHops.appendChild(pHopsNode)
    pPair.appendChild(pPairNode);
    pTips.appendChild(pTipsNode);

    divModal.appendChild(beerImg);
    divModal.appendChild(h2Tag)
    divModal.appendChild(pAbv)
    divModal.appendChild(pVol)
    divModal.appendChild(pInred)
    divModal.appendChild(pHops)
    divModal.appendChild(pPair)
    divModal.appendChild(pTips)

    getRandomBeer(beer) //kommer ihåg vilket randomCard det var på sidan
}   //modal End



searchBtn.addEventListener('click', onSearchClicked);

function onSearchClicked(e) {
    
    const url = 'search.html';
    document.location.href = url;
}