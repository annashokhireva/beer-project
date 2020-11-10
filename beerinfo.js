const mainElement = document.querySelector('main');
const beerInfoDiv = document.querySelector('div.beer-info');
const searchParams = new URLSearchParams(window.location.search);
const api = 'https://api.punkapi.com/v2/beers';
const id = searchParams.get('name');
const url = `${api}/${id}`;


getData(url, render);

function getData(url, callback) {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        
        callback(data);
    })
    .catch(error => console.log(error));
}


function render(data) {
    const beer = data[0];

    const name = beer.name;
    const description = beer.description;
    const brewersTips = beer.brewers_tips;
    const abv = beer.abv;
    const volume = beer.volume;//Loop
    const ingredients = beer.ingredients;//loop
    const hops = beer.hops;//?
    const foodPairing = beer.food_pairing;

    const h1Tag = document.createElement('h1');
    const pTips = document.createElement('p');
    const pDescription = document.createElement('p');
    const pAbv = document.createElement('p');
    const pVolume = document.createElement('p')
    const pIngredients = document.createElement('p')
    const pHops = document.createElement('p')
    const pPairing = document.createElement('p')

    h1Tag.textContent = name;
    pTips.textContent = brewersTips;
    pDescription.textContent = description;
    pAbv.textContent = abv;
    pVolume.textContent = volume;
    pIngredients.textContent = ingredients;
    pHops.textContent = hops;
    pPairing.textContent = foodPairing;
    
    beerImg = new Image (54.4); 
    beerImg.src = beer.image_url;
    mainElement.appendChild(beerImg);

    mainElement.appendChild(h1Tag);
    mainElement.appendChild(pTips);
    mainElement.appendChild(pDescription);
    mainElement.appendChild(pAbv);
    mainElement.appendChild(pVolume);
    mainElement.appendChild(pIngredients);
    mainElement.appendChild(pHops);
    mainElement.appendChild(pPairing)

    const backButton = document.createElement('button');
    backButton.textContent = "Go Back";
    mainElement.appendChild(backButton);

    backButton.addEventListener('click', goBack)
} 

function goBack() {
    window.history.back();
}