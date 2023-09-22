/*variable declaration */
// Select increment, decrement buttons along with its warning text
const incrementCount = document.getElementById("increment");
const decrementCount = document.getElementById("decrement");
const warning = document.getElementsByClassName("warning");
const warningText = document.getElementById("warningText");
const dateCheck = document.getElementById("dateCheck");
const movieCheck = document.getElementById("movieCheck");
const thirdRow = document.getElementById("thirdRow");
const ageWarning = document.getElementById("ageWarning");

// Select total count
const totalCount = document.getElementById("counting");
// Variable to track count
var count = 0;

// Display initial count value and hide warning text along with third row
totalCount.value = count;
warningText.style.display = "none";
dateCheck.style.display = "none";
movieCheck.style.display = "none";
ageWarning.style.opacity = 0.0;
thirdRow.style.display = "none";

// array to store show times availability
const showTimes = ["10:30AM", "9:30AM", "11:10AM", "17:15PM", "14:45PM", "21:00PM"];

var theaterData = []; // array to store both theater + available movies
var eachCities = []; // Array to store unique cities 
var eachMovieList = []; // seprate array to store different available movies in each city

// array that store gender options
const eachGender = ["Male", "Female", "Prefer not to say"];

/*classes and function */
// class that store theater and its movie details
class MovieTheater {
  constructor(city, moviesName) {
    this.city = city;
    this.moviesName = moviesName;
  }
}

// function that populate the class with movies theaters and its associate movies
function buildArray() {
  theaterData.push(new MovieTheater("Burlington", ["Harry Potter", "Avenger", "Twilight"]));
  theaterData.push(new MovieTheater("Hamilton", ["The Matrix", "Forrest Gump"]));
  theaterData.push(new MovieTheater("Oakvile", ["Saving Private Ryan"]));

  // store each city into the array uniquely 
  for (let cityTheater of theaterData) {
    if (!eachCities.includes(cityTheater.city)) {
      eachCities.push(cityTheater.city);
    }
  }

  // iterate through theater array and movies array to make list of different movie
  theaterData.forEach(theater => {
    let movies = theater.moviesName;
    movies.forEach(movieNumb => {
      eachMovieList.push(movieNumb);
    })
  })
}

// populate gender options from array to select drop down list 
function selectGender() {
  const genderSelect = document.getElementById("gender");
  genderSelect.innerHTML = "<option value=0 selected> Select gender</option>";
  for (let gender of eachGender) {
    genderSelect.innerHTML += `<option>${gender}</option>`;
  }
}

// function onload on the body and put different city value into the select list
function createList() {
  buildArray();
  selectGender();
  const selectCity = document.getElementById("city");
  selectCity.innerHTML = "<option value=0 selected> Select a city</option>";
  for (let city of eachCities) {
    selectCity.innerHTML += `<option>${city}</option>`;
  }
}

// function that checks the value of radio button that is being selected
function checkRadio() {
  var selectedLocation = document.querySelector('input[name="location"]:checked');
  if (selectedLocation !== null) {
    var locationValue = selectedLocation.value;
    return locationValue;
  }
  return 1;
}

/* function creates each different list of movies on select drop down 
based on different theater location 's */
function createMovieList() {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = "<option value=0 selected> Select a movie</option>"

  const radioValue = checkRadio();  // check the theater location
  for (let i = 0; i < radioValue && i < eachMovieList.length; i++) {
    const displayMovies = eachMovieList[i];
    movieList.innerHTML += `<option>${displayMovies}</option>`
  }
}

/* function that checks which city is being selected to only display 
its according theater location. If nothing is selected,theater's location
will be hidden */
function getSelectedCity() {
  const selectedIndex = document.getElementById("city").selectedIndex - 1;
  const radioBurlington = document.getElementById("radio-Burlington");
  const radioHamilton = document.getElementById("radio-Hamilton");
  const radioOakville = document.getElementById("radio-Oakville");

  radioBurlington.style.display = "none";
  radioOakville.style.display = "none";
  radioHamilton.style.display = "none";

  if (selectedIndex == 1) { // hamilton
    radioHamilton.style.display = "flex";
  } else if (selectedIndex == 0) { // burlington
    radioBurlington.style.display = "flex";
  } else if (selectedIndex == 2) { // oakville
    radioOakville.style.display = "flex";
  }
}

// display available show times based on movie list selected
function randomShowTimes() {
  const buttonShow = document.getElementsByClassName("button");
  for (var i = 0; i < showTimes.length; i++) {
    buttonShow[i].textContent = showTimes[i];
  }
}

// shuffle each different show time elements in the array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* whenever the elements inside the movie list drop down is changed, 
it randomizes different show time button positions */
document.getElementById("movieList").addEventListener("change", function () {
  shuffleArray(showTimes);
  randomShowTimes();
})

// calculate total sum of #ofTickets user buying and display the result
function updateTotal() {
  const totalAmount = document.getElementById("totalAmount");
  const ticketPrice = parseFloat(totalAmount.dataset.price);
  const ticketQuantity = parseInt(totalCount.value, 10);
  const ticketSum = (ticketPrice * ticketQuantity) * 100 / 100;
  totalAmount.value = "$" + ticketSum;
}

// customized date picker to only pick today's date or future date
var today = new Date().toISOString().split('T')[0];
document.getElementById("date").setAttribute("min", today);

// function that increments number of ticket
function handleIncrement() {
  const secondList = document.getElementById("movieList");
  const dateInput = document.getElementById("date").value;

  /* check if user has selected movie and chose available date and only
  only increments if those two conditions have been applied. If neither
  chosen, display according warning text*/
  if (secondList.value == 0) {
    movieCheck.style.display = "block";
  } else if (secondList.value > 0 || !dateInput) {
    dateCheck.style.display = "block";
    movieCheck.style.display = "none";

    /* increment the ticket only if either date + movie list has selected   */
  } else if (secondList.value > 0 || dateInput) {
    count++;
    thirdRow.style.display = "flex";
    totalCount.value = count;
    totalCount.style.backgroundColor = "initial";
    dateCheck.style.display = "none";
    movieCheck.style.display = "none";
    totalCount.style.color = "initial";
    decrementCount.style.opacity = 1.0;
    warningText.style.display = "none";

    // change the text color of total amout to its initial state 
    document.querySelectorAll('#counting, #totalAmount').forEach(function (element) {
      element.style.backgroundColor = "initial";
    });
  }

  // automatically set #ofTicket to 0 if value is <0 and not defined
  if (isNaN(totalCount.value) || totalCount.value < 0) {
    value = 0;
  }
  updateTotal(); // calculate the total sum of tickets that customer selecting
}

// decrement option for number of tickets
function handleDecrement() {
  // allow to decrement if customer purchased at least 1 ticket
  if (count > 0) {
    count--;
    totalCount.value = count;
    decrementCount.style.opacity = 1.0;
  }
  // change text color of total amount + its input type if user attempts to have negative value
  else if (count === 0) {
    document.querySelectorAll('#counting, #totalAmount').forEach(function (element) {
      element.style.backgroundColor = "#B3001B";
      element.style.color = "initial";
      element.style.borderRadius = "8px";
    });
    decrementCount.style.opacity = 0.1;
    warningText.style.display = "block";
    document.getElementById("totalAmount").style.color = "initial";

    // automatically set #ofTicket to 0 if value is <0 and not defined
  } else if (isNaN(totalCount.value) || totalCount.value < 0) {
    value = 0;
  }
  updateTotal(); // calculate the total sum of tickets
}

// check if user age is less than 20 once click submit butotn
document.getElementById("submit").addEventListener('click', function (event) {
  const ageValue = document.querySelector('[name="age"]');
  const ageWarning = document.getElementById("ageWarning");

  event.preventDefault(); // prevent the form to be submitted

  // display warning text according to age condition 
  if (ageValue.value < 20) {
    ageValue.style.backgroundColor = "red";
    ageWarning.style.opacity = 1.0;
  }
  // only lead to result page is age greater than 20 
  else if (ageValue.value >= 20) {
    ageValue.style.backgroundColor = "#283618";
    ageWarning.style.opacity = 0.0;
    location.assign("./pages/report.html");
  }
})

// highlight input box that user hasn't filled
function notFilled(e) {
  e.preventDefault();
  e.target.classList.add('invalid');
}

// remove input box that user has filled
function isFilled(e) {
  e.target.classList.remove('invalid');
}

// check if user has filled all required input and select drop down list
const form = document.querySelector('form');
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('invalid', notFilled);
  input.addEventListener('input', isFilled);
});

document.querySelectorAll('select').forEach(select => {
  select.addEventListener('invalid', notFilled);
  select.addEventListener('change', isFilled);
});

// validate form submission before redirect to new page
function retrieveData() {
  const valid = form.reportValidity();
  if (valid) {
    saveData();
    location.assign("./pages/report.html");
  }
}

/*Show time buttons display. only allow one button is clicked at a time*/
const buttons = document.getElementsByClassName("button");
function buttonClick(event) {
  const selectedButton = event.target;
  for (const button of buttons) {
    button.classList.remove('selected');
  }
  // Apply styles to the selected button
  selectedButton.classList.add('selected');
}
for (const button of buttons) {
  button.addEventListener('click', buttonClick);
}

// display carousel available movies on header
const swiper = new Swiper('.swiper', {
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});




