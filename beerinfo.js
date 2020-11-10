const mainElement = document.querySelector('main');
const searchParams = new URLSearchParams(window.location.search);
const apiEndpoint = 'https://api.punkapi.com/v2/beers';
const id = searchParams.get('name');
const url = `${apiEndpoint}/${id}`;

sessionStorage.setItem("origin", window.location.href);

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

    //removeAllChildNodes(beerInfoDiv);
    
    let description = [
        `${beer.description}<br><br>`,
        `Volume: ${beer.volume.value} ${beer.volume.unit}<br><br>`,
        `Alcohol by volume: ${beer.abv}%<br><br>`,
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
    descriptionDiv.classList.add('description-div');
    const ingredientsDiv = document.createElement('div');
    const maltP = document.createElement('p');
    const hopsP = document.createElement('p');
    const yeastP = document.createElement('p');
    const h2Tag = document.createElement('h2');

    h2Tag.textContent = beer.name;

    const beerImg = new Image (54.4); 
    beerImg.src = beer.image_url;

    mainElement.appendChild(beerImg);
    mainElement.appendChild(h2Tag);
    mainElement.appendChild(descriptionDiv);
    descriptionDiv.innerHTML = text;
    ingredientsDiv.innerText = 'Ingredients:';
    descriptionDiv.appendChild(ingredientsDiv);
    maltP.innerHTML = maltText;
    ingredientsDiv.appendChild(maltP);
    hopsP.innerHTML = hopsText;
    ingredientsDiv.appendChild(hopsP)
    yeastP.innerHTML = yeastText;
    ingredientsDiv.appendChild(yeastP);
    const backButton = document.createElement('button');
    backButton.textContent = "Go Back";
    mainElement.appendChild(backButton);

    backButton.addEventListener('click', goBack)
} 

function goBack() {
    window.history.back();
}