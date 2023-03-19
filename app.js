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

let storedProducts = localStorage.getItem("products");
if (storedProducts) {
  state.allProductsArray = JSON.parse(storedProducts);
} else {
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
  localStorage.setItem("products", JSON.stringify(state.allProductsArray));
}

function getRandomIndex() {
  return Math.floor(Math.random() * state.allProductsArray.length);
}

function renderImgs() {
  let indices = [];

  while (indices.length < 3) {
    let newIndex = getRandomIndex();

    if (!indices.includes(newIndex)) {
      indices.push(newIndex);
    }
  }

  let indexOne = indices.pop();

  let indexTwo = indices.pop();

  let indexThree = indices.pop();

  imgOne.src = state.allProductsArray[indexOne].photo;
  imgOne.alt = state.allProductsArray[indexOne].name;
  state.allProductsArray[indexOne].views++;

  imgTwo.src = state.allProductsArray[indexTwo].photo;
  imgTwo.alt = state.allProductsArray[indexTwo].name;
  state.allProductsArray[indexTwo].views++;

  imgThree.src = state.allProductsArray[indexThree].photo;
  imgThree.alt = state.allProductsArray[indexThree].name;
  state.allProductsArray[indexThree].views++;

  localStorage.setItem("products", JSON.stringify(state.allProductsArray));
}

function renderChart() {
  let voteData = [];
  let viewData = [];
  let labelData = [];

  for (let i = 0; i < state.allProductsArray.length; i++) {
    voteData.push(state.allProductsArray[i].votes);
    viewData.push(state.allProductsArray[i].views);
    labelData.push(state.allProductsArray[i].name);
  }

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labelData,
      datasets: [
        {
          label: "Votes",
          data: voteData,
          backgroundColor: "#006400",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Views",
          data: viewData,
          backgroundColor: "#fc7300",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      layout: {
        padding: 30,
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 15,
            },
          },
        },
      },

      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
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
    //renderChart();
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
  renderChart();
}

imgContainer.addEventListener("click", handleClick);
resultsButton.addEventListener("click", handleShowResults);

renderImgs();
