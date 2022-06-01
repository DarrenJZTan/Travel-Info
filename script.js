// Document Elements Variables 
/**
 * @const {element}
 */
const listedWords = document.getElementById("listedWords")
/**
 * @const {element}
 */
const info = document.getElementById('info')
/**
 * @const {element}
 */
const countryInput = document.getElementById("countryInput")
/**
 * @const {element}
 */
const submitButton = document.getElementById("submit")
/**
 * @const {element}
 */
const mainCard = document.getElementById("mainCard")
/**
 * @const {element}
 */
const background = document.getElementById('background')
/**
 * @const {element}
 */
const countryName = document.getElementById('countryName')

// Variables 
/**
 * @type {array}
 * Used to cycle through given set of words and display them onto the page
 */
let words = ["Health & Vaccines", "Weather", "Visa Requirements", "Currency", "Language"]
/**
 * @type {number}
 * Used to indicate the index of the words that are being cycled through 
 * Starting at 1
 */
let wordsIndex = 1


//Return
/** 
 * fetchCountryData() - Returns the data of a given country - name, advise, currency, language...  as JSON data 
 * @param {string} country Use to get a certain country's information
 * @return {object} countryData JSON object containing the names advise currency language telephone timezone vaccinations water and weather of a country
 */
const fetchCountryData = async (country) => {
  try { 
    const response = await fetch(`https://travelbriefing.org/${country}?format=json`)
    const countryData = await response.json();
    return countryData
  } catch(err) {
    /*Validation - adds the "is-invalid" class to countryInput if there is an error with the api
     *Note however the api defaults to Netherlands if a bad value is inputed
    */ 
    countryInput.classList.add("is-invalid")
  }
}

//Return
/** 
 * fetchAllCountries() - Returns the data of all countries in the api as JSON data 
 * @return {object} JSON object containing all countries within the api
 */
 const fetchAllCountries = async () => {
  try { 
    const response = await fetch(`https://travelbriefing.org/countries.json`)
    const countriesList = await response.json();
    return countriesList
  } catch(err) {
    alert(err)
  }
}

//Functions Blocks
/**
 * displayListOfWords() - display a set list of words from an given array
 * @param {array} array Used to cycle through given set of words and display them onto the page
 */
function displayListOfWords(array) {
  if (wordsIndex < array.length) {
    listedWords.innerHTML = array[wordsIndex];
    wordsIndex++;
  } else {
    wordsIndex = 0;   
    listedWords.innerHTML = array[wordsIndex];
    wordsIndex++;
  }
}
/**
 * checkValue() - check that the country is a valid country within the countries in the api
 * @param {country} string Compares the country to list of countries in the api
 */

// function checkValue(country) {
//   fetchAllCountries()
//   .then(value => {
//     console.log(value)
//     for (let i = 0; i < value.length; i++) {
//       console.log(value[i].name)
      
//     }
//   })
// }

//EventListeners
/**
 * displayListOfWords() - display a set list of words from an given array
 * @param {array} array Used to cycle through given set of words and display them onto the page
 */
submitButton.addEventListener('click', (e)=> {
  //Prevents form from refreshing the page
  e.preventDefault();
  //Runs the function fetchCountryData with the countryInput value when the form is submitted 
  fetchCountryData(countryInput.value)
  .then(
    countryName.innerHTML = countryInput.value,
    info.classList.add("d-none"),
    mainCard.classList.remove("d-none")
  )
  .then(
    data => {
      //Sets the background Image to a random image of the set country
      background.style.backgroundImage = `url('https://source.unsplash.com/random/?${data.names.full}')`
      countryName.innerHTML = data.names.full
    }
  )
})



//Timer Function (setInterval)
setInterval(
  function () {
    displayListOfWords(words);
  }, 1000);

//Run Functions





const tick = (timezone) => {
  let date = new Date();
  let hours = date.getHours() + timezone;
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let session = "Error"
  if (hours > 12) {
    session = "PM"
    hours -= 12
  } else if (hours < 10) {
    session = "AM"
    hours = "0" + hours
  } else {
    session = "AM"
  }
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  let time = hours + ":" + minutes + ":" + seconds + " " + session
  document.getElementById("MyClockDisplay").innerText = time
}

window.setInterval(tick(), 1000);

var xValues = [100,200,300,400,500,600,700,800,900,1000];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
      borderColor: "red",
      fill: false
    },{
      data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
      borderColor: "green",
      fill: false
    },{
      data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});

fetchData('Australia')