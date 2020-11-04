const api = 'https://api.punkapi.com/v2/beers';
const formElement = document.querySelector('form');
const beerList = document.querySelector('div.beer-list');
const countButtons = document.querySelector('div.count-buttons');

let beers = [];
  

formElement.addEventListener('submit', onSubmit);

const removeAllChildNodes = (parent) => {

    while (parent.firstChild) {

        parent.removeChild(parent.firstChild);
    }
}

function onSubmit(evt) {
    removeAllChildNodes(beerList);
    
    const searchStr = evt.target[0].value;

    const url = `${api}?beer_name=${searchStr}`;

    getData(url, render);    
    evt.preventDefault();
}

function getData(url, callback) {
    
    fetch(url)
    .then(res => res.json())
    .then(beers => {

        callback(beers);
    })
    .catch(error => console.log(error));
}

function render(beers) {
    
    const ulElement = document.createElement('ul');

    //ulElement.addEventListener('click');

    for (let i = 0; i < beers.length; i++) {
        
        beer = beers[i];
        
        const liElement = document.createElement('li');
        liElement.setAttribute('name', beer.id);
        liElement.textContent = beer.name;

        ulElement.appendChild(liElement);
    }

    beerList.appendChild(ulElement);

    countButtons.classList.remove('hidden')
}

function renderFirstBeer(beers) {

    const firstBeer = beers[0];

    const pElement = document.createElement('p');

    pElement.textContent = firstBeer.name;
    
    beerList.appendChild(pElement);
}
