let selections = 25;

let state = {
  allProductsArray: [],
};

let imgContainer = document.getElementById("duck");
let imgOne = document.getElementById("img-one");
let imgTwo = document.getElementById("img-two");
let imgThree = document.getElementById("img-three");
let resultsButton = document.getElementById("results-button");
let resultsList = document.getElementById("results-list");

function Duck(name, fileExtension = "jpg") {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  state.allProductsArray.push(this);
}

let bag = new Duck("bag");
let banana = new Duck("banana");
let bathrooom = new Duck("bathroom");
let boots = new Duck("boots");
let breakfast = new Duck("breakfast");
let bubblegum = new Duck("bubblegum");
let chair = new Duck("chair");
let cthulhu = new Duck("cthulhu");
let dogDuck = new Duck("dog-duck");
let dragon = new Duck("dragon");
let pen = new Duck("pen");
let petSweep = new Duck("pet-sweep");
let scissors = new Duck("scissors");
let shark = new Duck("shark");
let sweep = new Duck("sweep");
let tauntaun = new Duck("tauntaun");
let unicorn = new Duck("unicorn");
let waterCan = new Duck("water-can");
let wineGlass = new Duck("wine-glass");

function getRandomIndex() {
  return Math.floor(Math.random() * state.allProductsArray.length);
}

function renderImgs() {
  let indexOne = getRandomIndex();
  let indexTwo = getRandomIndex();
  let indexThree = getRandomIndex();

  while (
    indexOne === indexTwo ||
    indexOne === indexThree ||
    indexTwo === indexThree
  ) {
    indexOne = getRandomIndex();
    indexTwo = getRandomIndex();
    indexThree = getRandomIndex();
  }

  imgOne.src = state.allProductsArray[indexOne].photo;
  imgOne.alt = state.allProductsArray[indexOne].name;
  state.allProductsArray[indexOne].views++;

  imgTwo.src = state.allProductsArray[indexTwo].photo;
  imgTwo.alt = state.allProductsArray[indexTwo].name;
  state.allProductsArray[indexTwo].views++;

  imgThree.src = state.allProductsArray[indexThree].photo;
  imgThree.alt = state.allProductsArray[indexThree].name;
  state.allProductsArray[indexThree].views++;
}

function handleClick(event) {
  selections--;

  let imgClicked = event.target.alt;
  for (let i = 0; i < state.allProductsArray.length; i++) {
    if (imgClicked === state.allProductsArray[i].name) {
      state.allProductsArray[i].votes++;
      console.log(imgClicked, state.allProductsArray[i].votes);
    }
  }

  renderImgs();

  if (selections === 0) {
    imgContainer.removeEventListener("click", handleClick);
  }
  console.log(selections);
}

function handleShowResults() {
  if (selections === 0) {
    for (let i = 0; i < state.allProductsArray.length; i++) {
      let liElem = document.createElement("li");
      liElem.textContent = `${state.allProductsArray[i].name} had ${state.allProductsArray[i].votes} votes, and was seen ${state.allProductsArray[i].views} times.`;
      resultsList.append(liElem);
    }
  }
}

imgContainer.addEventListener("click", handleClick);
resultsButton.addEventListener("click", handleShowResults);

renderImgs();
