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

<<<<<<< Updated upstream
function onClick(beer) {
    removeAllChildNodes(beerInfoDiv);
    removeAllChildNodes(randomCard);
    const url = `${api}/random`;
=======
function onClick(evt) {

   removeAllChildNodes(randomCard);
>>>>>>> Stashed changes
    
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
<<<<<<< Updated upstream
    randomCard.appendChild(h2Tag);   
}

//Beer Info start
randomCard.addEventListener('click', beerInfo);
    
const beerInfoDiv = document.querySelector('div.beer-info');
                
function beerInfo() {
    removeAllChildNodes(beerInfoDiv);
    
    let description = [
        `${beer.description}`,
        `Volume: ${beer.volume.value} ${beer.volume.unit}`,
        `Alcohol by volume: ${beer.abv}`,
        `Food pairing: ${beer.food_pairing}`,
        `Brewers tips: ${beer.brewers_tips}`
    ];


    text = '<dl>';

    for (let i = 0; i < description.length; i++) {
        const descriptionInfo = description[i];
        text += '<dt>' + descriptionInfo + '</dt>';
    };

    text += '</dl>';

    let malt = beer.ingredients.malt;

    maltText = '<dt> Malt:';

    for (let i = 0; i < malt.length; i++){
        let maltInfo = malt[i];
        maltText += `<dd>${maltInfo.name} (${maltInfo.amount.value} 
            ${maltInfo.amount.unit})</dd>`;
    }

    maltText += '</dt>'

    let hops = beer.ingredients.hops;

    hopsText = '<dt> Hops:';

    for (let i = 0; i < hops.length; i++){
        let hopsInfo = hops[i];
        hopsText += `<dd>${hopsInfo.name} (${hopsInfo.amount.value} 
            ${hopsInfo.amount.unit}): Add: ${hopsInfo.add} Attribute: ${hopsInfo.attribute}</dd>`;
    }

    hopsText += '</dt>'

    yeastText = `<dt> Yeast: </dt> <dd>${beer.ingredients.yeast}</dd>`;
    
    const descriptionDiv = document.createElement('div');
    const ingredientsDiv = document.createElement('div');
    const maltP = document.createElement('p');
    const hopsP = document.createElement('p');
    const yeastP = document.createElement('p');
    
    beerInfoDiv.appendChild(beerImg);
    beerInfoDiv.appendChild(h2Tag);
    beerInfoDiv.appendChild(descriptionDiv);
    descriptionDiv.innerHTML = text;
    ingredientsDiv.innerText = 'Ingredients:';
    descriptionDiv.appendChild(ingredientsDiv);
    maltP.innerHTML = maltText;
    ingredientsDiv.appendChild(maltP);
    hopsP.innerHTML = hopsText;
    ingredientsDiv.appendChild(hopsP)
    yeastP.innerHTML = yeastText;
    ingredientsDiv.appendChild(yeastP);
    getRandomBeer(beer); //kommer ihåg vilket randomCard det var på sidan
}   //beer Info End
=======
    
    randomCard.appendChild(h2Tag);  
>>>>>>> Stashed changes

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

