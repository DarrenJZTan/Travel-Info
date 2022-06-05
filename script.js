// Document Elements Variables 
const listedWords = document.getElementById("listedWords")
const info = document.getElementById('info')
const countryInput = document.getElementById("countryInput")
const submitButton = document.getElementById("submit")
const mainCard = document.getElementById("mainCard")
const background = document.getElementById('background')
const countryNameTitle = document.getElementById('countryNameTitle')
const countryName = document.getElementsByClassName('countryName')
const advise = document.getElementById('advise')
const countryCurrency = document.getElementById('countryCurrency')
const currencyCountryOut = document.getElementById('currencyCountryOut')
const currencyCountryInValue = document.getElementById('currencyCountryInValue')
const currencyCountryOutValue = document.getElementById('currencyCountryOutValue')
const officialLanguage = document.getElementById('officialLanguage')
const otherLanguages = document.getElementById('otherLanguages')
const otherLanguageParagraphTag = document.getElementById('otherLanguageParagraphTag')
const cCode = document.getElementById('cCode')
const ambulance = document.getElementById('ambulance')
const fire = document.getElementById('fire')
const police = document.getElementById('police')
const clock = document.getElementById("MyClockDisplay")
const nameOfTimezone = document.getElementById("nameOfTimezone")
const caution = document.getElementById('caution')
const water = document.getElementById('water')
const myChart = document.getElementById('myChart')
const ctx = myChart.getContext("2d");

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
/**
 * @type {number}
 * Used to store the rate of the country as a global scope variable  
 */
let USDRate;
/**
 * @type {array}
 * Variable to store rate of countries array
 */
let rates = []
/**
 * @type {string}
 * Variable to store name of timezone 
 */
let timezone = 'UTC'
/**
 * @type {array}
 * @type {array}
 * @type {array}
 * Variable to store temperature Average, Max and Min of the month of a country representatively
 */
let tAvg = [];
let tMax = [];
let tMin = [];
/**
 * @type {array}
 * The x Values in the chart (months of the year)
 */
var xValues = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/**
 * @type {object}
 * Create a obj to later distroy to empty the canvas
 */
let obj = new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      data: tMin,
      borderColor: "red",
      fill: false
    },{
      data: tAvg,
      borderColor: "green",
      fill: false
    },{
      data: tMax,
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
})

// Return
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
    /* Validation - adds the "is-invalid" class to countryInput if there is an error with the api
     *Note however the api defaults to Netherlands if a bad value is inputed
    */ 
    countryInput.classList.add("is-invalid")
  }
}
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

// Functions Blocks
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
 * displayCard() - Renders the card after data is obtain
 * removes the class d-none (display none) to display the card with information if the country name has been changed from "Country Name" to the correct name
 */
function displayCard() {
  if (countryNameTitle.innerHTML != "Country Name") {
    mainCard.classList.remove("d-none")
  }
}
/**
 * fillSelection() - fill in avaliable list of countries to input
 */
function fillSelection() {
  fetchAllCountries()
  .then(data => {
    for(let i = 0; i < data.length; i++) {
      countryInput.options[countryInput.options.length] = new Option(data[i].name, data[i].name)
    }
  })
}
/**
 * getRate(country) - get the rate of a country by looping through the array and returning rate if equals
 * @param {string} country the country that you want the rate of
 */
function getRate(country) {
  for(let i = 0; i < rates.length; i++) {
    if(country == rates[i].name) {
      return rates[i].rate
    }
  }
}
/**
 * calculate(rate) - using the USDRate, value (number) and rate 
 * @param {number} number the value you start with
 * @param {number} rate the rate
 */
function calculate(rate, number) {
  amountInUSD = number/USDRate
  let amountOut = amountInUSD * rate
  return amountOut
}
/**
 * changeOutput(input) - changes the output of currency based on the amount inputted (input)
 * @param {number} input the input amount calc of the selected country
 */
function changeOutput(input) {
  let rate = getRate(currencyCountryOut.value);
  let answer = calculate(rate, input)
  currencyCountryOutValue.value = answer.toFixed(2)
}
/**
 * removeAll(selectBox) - remove all options from a select input
 * @param {HTMLElement} selectBox the html element of select
 */
function removeAll(selectBox) {
  while (selectBox.options.length > 0) {
      selectBox.remove(0);
  }
}
/**
 * tick() - ticks the clock 
 * gets the date and time from a given timezone based on country selected and display it on the document
 */
function tick() {
  /**
   * @type {Date}
   * returns the current time in internal format
   */
  let date = new Date();
  /**
   * @type {string}
   * stores the date string with timezone calculation into strTime
   * toLocaleString() - method returns a string representing the object after being overridden by derived objects for locale-specific purposes
   * @param {string} timezone the name of the timezone that is affecting the date
   */
  let strTime = date.toLocaleString("en-GB", { timeZone: timezone });
  /**
   * @type {string}
   * spliting the strTime string by the ", " and storing into splitStr
   */
  let splitStr = strTime.split(", ")
  /**
   * @type {string}
   * spliting the second half splitStr string by the ":" and storing them into hours, minutes, and seconds representatively
   */
  let hours = splitStr[1].split(":")[0]
  let minutes = splitStr[1].split(":")[1]
  let seconds = splitStr[1].split(":")[2]
  /**
   * @type {string}
   * set default session as error and switch session basic on time of day
   */
  let session = "Error"
  if (hours > 12) {
    session = "PM"
    hours -= 12
  } else if (hours < 10) {
    session = "AM"
    hours = hours
  } else {
    session = "AM"
  }
  let time = hours + ":" + minutes + ":" + seconds + " " + session
  clock.innerText = time
}

// EventListeners
// Callback when event click on search button happens
submitButton.addEventListener('click', (e)=> {
  // Prevents form from refreshing the page
  e.preventDefault();
  // Runs the function fetchCountryData with the countryInput value when the form is submitted 
  fetchCountryData(countryInput.value)
  .then(
    // Form Section information is removed when input is submitted
    info.classList.add("d-none"),
  )
  .then(
    // Use Data to:
    data => {
      console.log(data)
      // Background
      // Set the Background Image to a random image of the set country
      background.style.backgroundImage = `url('https://source.unsplash.com/random/?${data.names.full}')`

      // Advise
      // Set the advise to the advise given
      /**
       * @type {string}
       * Variable to append advise text 
       */
      let adviseText = ''
      // Loop through advises and append each of the advise and advise source to the variable
      for (let advise in data.advise) {
        adviseText += 
        `<div class="mb-3">
          <p>${data.advise[advise].advise}</p>
          <a href=${data.advise[advise].url} target="_blank">${data.advise[advise].url}</a>
        </div>`
      }
      if (adviseText == '') {
        adviseText = `Unfortunately we do not have travel advises for ${data.names.name}`
      }
      // Set innerHTML with advise variable
      advise.innerHTML = adviseText

      // Title
      // Set Title to the full name of the country
      countryNameTitle.innerHTML = data.names.full
      
      // Change all element with class of countryName to the name of the country
      for (var i = 0; i < countryName.length; i++) {
        countryName[i].innerHTML = data.names.name;
      }

      // Currency
      // Set Currency decription HTML to the correct country data
      if (data.currency.symbol) {
        countryCurrency.innerHTML = data.currency.name + ` (${data.currency.symbol})`
      } else {
        countryCurrency.innerHTML = data.currency.name
      }
      
      // Set Currency converter to correct data
      USDRate = data.currency.rate
      rates = data.currency.compare

      // Remove all options before adding the new options
      removeAll(currencyCountryOut);
      // Create options in Currency output
      for(let i = 0; i < data.currency.compare.length; i++) {
        currencyCountryOut.options[currencyCountryOut.options.length] = new Option(data.currency.compare[i].name, data.currency.compare[i].name)
      }

      // Change the currency output when data is loaded in
      let amountInVal = currencyCountryInValue.value;
      changeOutput(amountInVal)

      // Language
      // Set language decription HTML to the correct country data
      /**
       * @type {array}
       * Variable to store official language of a country array
       */
      let officialLanguageArray = [];
      /**
       * @type {array}
       * Variable to store NON official language of a country array
       */
      let nonOfficialLanguageArray = [];

      // Loops the languages and separate then into official and non official languages 
      // Pushing the result into respective arrays
      for(let i = 0; i < data.language.length; i++) {
        if (data.language[i].official == "Yes") {
          officialLanguageArray.push(data.language[i].language)
        }
        if (data.language[i].official == "No") {
          nonOfficialLanguageArray.push(data.language[i].language)
        }    
      }
      // Remove null language
      if(!data.language) {
        officialLanguage.parentElement.innerHTML = 'Not enough data'
      }
      // Conditional if official language array is a certain length - insert text
      if(officialLanguageArray.length == 0) {
        officialLanguage.parentElement.innerHTML = 'Not enough data'
      } else if(officialLanguageArray.length == 1) {
        officialLanguage.innerHTML = 'is ' + officialLanguageArray.toString();
      } else if (officialLanguageArray.length == 2) {
        officialLanguage.innerHTML = 'are ' + officialLanguageArray[0] + ' and ' + officialLanguageArray[1]
      } else {
        const newArr = officialLanguageArray.slice(0, -2);
        officialLanguage.innerHTML = 'are ' + newArr.join(', ') + ', ' +officialLanguageArray.slice(-2)[0] + ' and ' + officialLanguageArray.slice(-2)[1]
      }

      // Conditional if non official language array is a certain length - insert text
      if(nonOfficialLanguageArray.length == 0) {
        otherLanguageParagraphTag.classList.add('d-none')
      } else if (nonOfficialLanguageArray.length == 1) {
        otherLanguageParagraphTag.classList.remove('d-none')
        otherLanguages.innerHTML = 'is ' + nonOfficialLanguageArray[0];
      } else if (nonOfficialLanguageArray.length == 2) {
        otherLanguageParagraphTag.classList.remove('d-none')
        otherLanguages.innerHTML = 'are ' + nonOfficialLanguageArray[0] + ' and ' + nonOfficialLanguageArray[1];
      } else {
        const newArr = nonOfficialLanguageArray.slice(0, -2);
        otherLanguages.innerHTML = 'are ' + newArr.join(', ') + ', ' + nonOfficialLanguageArray.slice(-2)[0] + ' and ' + nonOfficialLanguageArray.slice(-2)[1]
      }
      
      // Emergency Number
      // Calling code
      cCode.innerHTML = data.telephone.calling_code
      // Ambulance
      ambulance.innerHTML = data.telephone.ambulance
      // fire
      fire.innerHTML = data.telephone.fire
      // police
      police.innerHTML = data.telephone.police

      // Timezone/Clock
      //Set the timezone to timezone of country
      timezone = data.timezone.name
      nameOfTimezone.innerHTML = data.timezone.name

      // Vaccinations/Health Caution
      // Set the health risk 
      /**
       * @type {string}
       * Variable to append vaccinations text 
       */
      let vacText = ''
      // Loop through vaccinations and append each of the disease and advise to the variable
      for (let i = 0; i < data.vaccinations.length; i++) {
        vacText += 
        `<div class="mb-3">
          <p class="fw-bold lead">${data.vaccinations[i].name}</p>
          <p>${data.vaccinations[i].message}</p>
        </div>`
      }
      // If there is no vaccination advise avaliable
      if( vacText == '' ){
        vacText = 'There are no vaccinations required or we do not have the information, please travel with caution'
      }
      caution.innerHTML = vacText

      // Water
      if(data.water.full) {
        water.innerHTML = data.water.full
      } else if(data.water.short){
        water.innerHTML = data.water.short
      } else {
        water.parentElement.innerHTML = 'No data'
      }

      // Weather
      /**
       * @type {array}
       * Variable hard coded weather data for temp average, max and min for each of the months
       */
      tAvg = [data.weather.January.tAvg, data.weather.February.tAvg, data.weather.March.tAvg, data.weather.April.tAvg, data.weather.May.tAvg, data.weather.June.tAvg, data.weather.July.tAvg, data.weather.August.tAvg, data.weather.September.tAvg, data.weather.October.tAvg, data.weather.November.tAvg, data.weather.December.tAvg]
      tMax = [data.weather.January.tMax, data.weather.February.tMax, data.weather.March.tMax, data.weather.April.tMax, data.weather.May.tMax, data.weather.June.tMax, data.weather.July.tMax, data.weather.August.tMax, data.weather.September.tMax, data.weather.October.tMax, data.weather.November.tMax, data.weather.December.tMax]
      tMin = [data.weather.January.tMin, data.weather.February.tMin, data.weather.March.tMin, data.weather.April.tMin, data.weather.May.tMin, data.weather.June.tMin, data.weather.July.tMin, data.weather.August.tMin, data.weather.September.tMin, data.weather.October.tMin, data.weather.November.tMin, data.weather.December.tMin]

      //Clear Canvas
      ctx.clearRect(0, 0, myChart.width, myChart.height);
      // Destroy Object
      obj.destroy();
      // Set Object with data
      obj = new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            data: tMin,
            label: "Average Maximum Temperature",
            borderColor: "red",
            fill: false
          },{
            data: tAvg,
            label: "Average Temperature",
            borderColor: "green",
            fill: false
          },{
            data: tMax,
            label: "Average Minimum Temperature",
            borderColor: "blue",
            fill: false
          }]
        },
        options: {
          legend: {display: false}
        }
      })
    }
  )
})

// Callback when event change value of country 1 happens
currencyCountryInValue.addEventListener('change', (e) => {
  let amountInVal = e.target.value;
  changeOutput(amountInVal)
})
// Callback when event change what country 2 is
currencyCountryOut.addEventListener('change', () => {
  let amountInVal = currencyCountryInValue.value;
  changeOutput(amountInVal)
}) 

//Timer Function (setInterval) for every second
setInterval(
  function () {
    displayListOfWords(words);
    displayCard();
    tick();
  }, 1000);

//Run Function One time only
fillSelection();