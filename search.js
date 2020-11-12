const searchParams = new URLSearchParams(window.location.search);
const formElement = document.querySelector('form');
const beerList = document.querySelector('div.beer-list');
const prevBtn = document.querySelector('div.prev-btn');
const nextBtn = document.querySelector('div.next-btn');
const goBack = document.querySelector('.go-back');
const apiEndpoint = 'https://api.punkapi.com/v2/beers';
const perPage = 10;
let currentPage = 1;
let beers = [];
let beersCash = {};

sessionStorage.setItem("origin", window.location.href);


function saveBeerList(data) {
  beersCash['page' + currentPage] = data;
  window.sessionStorage.beersCash = JSON.stringify(beersCash);
}


formElement.addEventListener('submit', function (e) {
  e.preventDefault();
  removeAllChildNodes(beerList);
  getData(render);
  nextBtn.classList.remove('hidden');
  window.sessionStorage.removeItem('beersCash');
});


prevBtn.addEventListener('click', function () {

  if (currentPage > 1) {
    currentPage--;

    if (window.sessionStorage.beersCash) {
      let beersCash = window.sessionStorage.beersCash;

      beersCash = JSON.parse(beersCash);
      console.log(beersCash);

      if (beersCash['page' + currentPage]) {
        removeAllChildNodes(beerList);

        render(beersCash['page' + currentPage]);
      }
      nextBtn.classList.remove('hidden');
    }

    else {
      getData(render);

      prevBtn.classList.remove('hidden');
      nextBtn.classList.remove('hidden');
    }
  }

  if (currentPage <= 1) {
    prevBtn.classList.add('hidden');
  }
});


nextBtn.addEventListener('click', function () {
  if (beers.length >= 10) {
    currentPage++;

    if (window.sessionStorage.beersCash) {
      let beersCash = window.sessionStorage.beersCash;

      beersCash = JSON.parse(beersCash);
      console.log(beersCash);
      removeAllChildNodes(beerList);
      if (beersCash['page' + currentPage]) {

        render(beersCash['page' + currentPage]);
      }

      else {
        getData(render);
      }
      nextBtn.classList.remove('hidden');
      prevBtn.classList.remove('hidden');
    }

    else {
      getData(render);

      prevBtn.classList.remove('hidden');
      nextBtn.classList.remove('hidden');
    }
  }
});


function getQueryString(form) {
  let query = new URLSearchParams();

  query.set('per_page', perPage);
  query.set('page', currentPage);

  let inputField = form.querySelectorAll('input');

  for (input of inputField) {
    const value = input.value.trim();

    if (value) {
      query.set(input.name, input.value);
    }
  }

  return query.toString();
}


function removeAllChildNodes(parent) {

  while (parent.firstChild) {

    parent.removeChild(parent.firstChild);
  }
}


function getData(callback) {
  prevBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  url = apiEndpoint + '?' + getQueryString(formElement);
  console.log(url);
  fetch(url, { cache: "force-cache" })
    .then(res => res.json())
    .then(data => {
      beers = data;
      saveBeerList(data);
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

  if (beers.length < 1){
    beerList.innerText = 'No beers found...';
    nextBtn.classList.add('hidden');
  }
  
  beerList.appendChild(ulElement);
}


function abvRanger() {

  let parent = document.querySelector(".abv-slider");
  if (!parent) return;

  let
    rangeS = parent.querySelectorAll("input[type=range]"),
    numberS = parent.querySelectorAll("input[type=number]");

  rangeS.forEach(function (e) {
    e.oninput = function () {
      let slide1 = parseFloat(rangeS[0].value),
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
      let number1 = parseFloat(numberS[0].value),
        number2 = parseFloat(numberS[1].value);

      if (number1 > number2) {
        let tmp = number1;
        numberS[0].value = number2;
        numberS[1].value = tmp;
      }

      rangeS[0].value = number1;
      rangeS[1].value = number2;
    }
  });
}

abvRanger();


function whenBrewed() {

  let parent = document.querySelector(".test");
  if (!parent) return;

  let dateInputs = parent.querySelectorAll("input[type=text]");

  dateInputs.forEach(function (e) {
    e.oninput = function () {

      let brewedAfter = dateInputs[0].value.split('-'),
        brewedBefore = dateInputs[1].value.split('-');

      for (let i = 0; i < brewedAfter.length; i++) {
        let brewedAfterMonth = parseInt(brewedAfter[0], 10),
          brewedAfterYear = parseInt(brewedAfter[1], 10);

        for (let i = 0; i < brewedBefore.length; i++) {
          let brewedBeforeMonth = parseInt(brewedBefore[0], 10),
            brewedBeforeYear = parseInt(brewedBefore[1], 10);

          if (brewedAfterYear > brewedBeforeYear) {
            dateInputs[0].setCustomValidity("Brewed After must be less than Brewed Before");
            dateInputs[1].setCustomValidity("Brewed Before must be greater than Brewed After");
          }

          else if (brewedAfterYear === brewedBeforeYear & brewedAfterMonth >= brewedBeforeMonth) {
            dateInputs[0].setCustomValidity("Brewed After must be less than Brewed Before");
            dateInputs[1].setCustomValidity("Brewed Before must be greater than Brewed After");
          }

          else {
            dateInputs[0].setCustomValidity("");
            dateInputs[1].setCustomValidity("");
          }
        }
      }

    }
  });
}

whenBrewed();

goBack.addEventListener('click', onDiceClicked);

function onDiceClicked() {

  const url = 'index.html';
  document.location.href = url;
}


function onUlClicked(e) {

  const id = e.target.getAttribute('name');
  const url = `beerinfo.html?name=${id}`;
  document.location.href = url;
}