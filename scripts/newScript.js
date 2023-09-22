// class that store user details 
class userDetails {
  constructor(firstNameValue, lastNameValue, ageValue, emailValue, cityValue, moviePicked,
    datePicked, ticketNumb, ticketTotal) {
    this.firstNameValue = firstNameValue;
    this.lastNameValue = lastNameValue;
    this.ageValue = ageValue;
    this.emailValue = emailValue;
    this.cityValue = cityValue;
    this.moviePicked = moviePicked;
    this.datePicked = datePicked;
    this.ticketNumb = ticketNumb;
    this.ticketTotal = ticketTotal;
  }
}

const userArray = [] // declare array 

// function put user input from form to declared array and class
function putUserInput() {
  var userfName = document.getElementById("fname").value;
  var userlName = document.getElementById("lname").value;
  var userAge = document.getElementById("age").value;
  var userEmail = document.getElementById("email").value;
  var citySelections = document.getElementById("city");
  var userCity = citySelections.options[citySelections.selectedIndex].text;
  var movieList = document.getElementById("movieList");
  var userMovies = movieList.options[movieList.selectedIndex].text;
  var userDate = document.getElementById("date").value;
  var userTicket = document.getElementById("counting").value;
  var userTotal = document.getElementById("totalAmount").value;

  userArray.push(new userDetails
    (userfName, userlName, userAge, userEmail, userCity, userMovies, userDate,
      userTicket, userTotal));
}


/* save data to local storage */
function saveData() {
  putUserInput();
  for (let i = 0; i < userArray.length; i++) {
    localStorage.setItem("firstName", userArray[i].firstNameValue);
    localStorage.setItem("lastName", userArray[i].lastNameValue);
    localStorage.setItem("ageValue", userArray[i].ageValue);
    localStorage.setItem("emailValue", userArray[i].emailValue);
    localStorage.setItem("cityValue", userArray[i].cityValue);
    localStorage.setItem("userMovies", userArray[i].moviePicked);
    localStorage.setItem("datePicked", userArray[i].datePicked);
    localStorage.setItem("ticketNumb", userArray[i].ticketNumb);
    localStorage.setItem("ticketTotal", userArray[i].ticketTotal);
  }
}

// load report on the new html file with its label
function loadReport() {
  document.getElementById("movieTitle").innerHTML = localStorage.userMovies;
  document.getElementById("outdate").value = localStorage.datePicked;
  document.getElementById("outcity").value = localStorage.cityValue;
  document.getElementById("outfName").value = localStorage.firstName;
  document.getElementById("outlName").value = localStorage.lastName;
  document.getElementById("outemail").value = localStorage.emailValue;
  document.getElementById("outAge").value = localStorage.ageValue;
  document.getElementById("outtickNumb").value = localStorage.ticketNumb;
  document.getElementById("outtotal").value = localStorage.ticketTotal;
}

// Go back to previous page
function goToIndex() {
  location.assign("../index.html");
}
