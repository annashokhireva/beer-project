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

function onSubmit(e) {
    removeAllChildNodes(beerList);
    
    const searchStr = e.target[0].value;

    const url = `${api}?beer_name=${searchStr}`;

    getData(url, render);    
    e.preventDefault();
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

function abvRanger() {

    var parent = document.querySelector(".price-slider");
    if(!parent) return;
  
    var
      rangeS = parent.querySelectorAll("input[type=range]"),
      numberS = parent.querySelectorAll("input[type=number]");
  
    rangeS.forEach(function(el) {
      el.oninput = function() {
        var slide1 = parseFloat(rangeS[0].value),
              slide2 = parseFloat(rangeS[1].value);
  
        if (slide1 > slide2) {
          [slide1, slide2] = [slide2, slide1];
        }
  
        numberS[0].value = slide1;
        numberS[1].value = slide2;
      }
    });
  
    numberS.forEach(function(el) {
      el.oninput = function() {
          var number1 = parseFloat(numberS[0].value),
          number2 = parseFloat(numberS[1].value);
  
        if (number1 > number2) {
          var tmp = number1;
          numberS[0].value = number2;
          numberS[1].value = tmp;
        }
  
        rangeS[0].value = number1;
        rangeS[1].value = number2;
  
      }
    });
  
  }
  
abvRanger();