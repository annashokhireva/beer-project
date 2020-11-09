const formElement = document.querySelector('form');
const beerList = document.querySelector('div.beer-list');
const prevBtn = document.querySelector('div.prev-btn');
const nextBtn = document.querySelector('div.next-btn');
const goBack = document.querySelector('.go-back');

/* Endrat namn från api till apiEndpoint för klarhet */
const apiEndpoint = 'https://api.punkapi.com/v2/beers';
const perPage = 10;
let currentPage = 1;
let beers = [];

/* gömt kod behöver lite arbete för att fungera. Mäste kolla med Niklas */
// let url = '';

// if(window.sessionStorage.url) {
//   url = JSON.parse(window.sessionStorage.url);
// }

/* cashe start */
if(window.sessionStorage.beers) {
  beers = JSON.parse(window.sessionStorage.beers);
}

// function saveUrl(form){
//   window.sessionStorage.input = JSON.stringify(form);
// }

function saveBeerList(beerData) {
  window.sessionStorage.beers = JSON.stringify(beerData);
}
/* cashe end */

render(beers);


formElement.addEventListener('submit', function(e) {
  e.preventDefault();
  removeAllChildNodes(beerList);
  getData(render);  
  nextBtn.classList.remove('hidden');
});


prevBtn.addEventListener('click', function () {

  if (currentPage > 1) {
    currentPage--;
    
    getData(render);

    removeAllChildNodes(beerList);

    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');  
  }

  if (currentPage <= 1){
    prevBtn.classList.add('hidden');
  }
});


/* Fungerande pagiantion */
nextBtn.addEventListener('click', function () {

  if (beers.length >= 10) {
    currentPage++;
   
    getData(render);

    removeAllChildNodes(beerList);
    
    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');  
  }

  if (beers.length != 10){
    nextBtn.classList.add('hidden'); 
  }
    
});

/* hämtar search parametrar från alla input och adderar till url*/
function getQueryString(form) {
  let query = new URLSearchParams();

  query.set('per_page', perPage);
  query.set('page', currentPage);

  let inputField = form.querySelectorAll('input');

  for(input of inputField) {
    const value = input.value.trim();

    if(value){
      query.set(input.name, input.value);  
    }
  }
  //saveUrl(form);
  return query.toString();
}


function removeAllChildNodes(parent){

    while (parent.firstChild) {
  
      parent.removeChild(parent.firstChild);
    }
}


function getData(callback) {
  prevBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  url = apiEndpoint + '?' + getQueryString(formElement);

  fetch(url, {cache: "force-cache"})
    .then(res => res.json())
    .then(beerData => {
      beers = beerData;
      saveBeerList(beerData); /* Cashar senaste besökt öl listan */
      callback(beers);
    })
    .catch(error => console.log(error));
}

function render(beers) {

  const ulElement = document.createElement('ul');

  ulElement.addEventListener('click', onUlClicked);

  for (let i = 0; i < beers.length; i++) {

    beer = beers[i];

    const liElement = document.createElement('li');
    liElement.setAttribute('name', beer.id);
    liElement.textContent = beer.name;

    ulElement.appendChild(liElement);
    
  }

  beerList.appendChild(ulElement); 
}



/* varför finns den där funktionen här? Den gör ingeting. Eller?*/

// function renderFirstBeer(beerData) {

//   const firstBeer = beerData[0];

//   const pElement = document.createElement('p');

//   pElement.textContent = firstBeer.name;

//   beerList.appendChild(pElement);
//}

/* Ranger */
function abvRanger() {

  var parent = document.querySelector(".price-slider");
  if (!parent) return;

  var
    rangeS = parent.querySelectorAll("input[type=range]"),
    numberS = parent.querySelectorAll("input[type=number]");

  rangeS.forEach(function (el) {
    el.oninput = function () {
      var slide1 = parseFloat(rangeS[0].value),
        slide2 = parseFloat(rangeS[1].value);

      if (slide1 > slide2) {
        [slide1, slide2] = [slide2, slide1];
      }

      numberS[0].value = slide1;
      numberS[1].value = slide2;
    }
  });

  numberS.forEach(function (el) {
    el.oninput = function () {
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


goBack.addEventListener('click', onDiceClicked);

function onDiceClicked() {
    
    const url = 'index.html';
    document.location.href = url;
}

function onUlClicked(e) {
    
  alert('hej :)');
}