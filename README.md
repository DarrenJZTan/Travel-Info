# Travel Information 1.0.0
 
### Welcome to my travel information application

This application is an example portfolio task that will demonstrate and display how I can work with an API and Node.

This Project was created as an assignment piece for Holmesglen - Certificate IV in Information Technology (Web Development) ICTPRG302 Apply introductory programming techniques [11091]

### What does this project entail?
- Getting data from an API [travelbriefing.org](https://travelbriefing.org/api)
- Displaying the information of a selected country in a card: 
**Information includes:**
- Full name
- Travel advice
- Safety of tap water
- Timezone and displays a clock 
- Currency and currency conversion
- Language spoken
- Weather Averages and displaying them on a chart using **Chart.js**
- Vaccination and health cautions
- Telephone/ emergency numbers

### Dependencies
- bootstrap: "^5.1.3"

### Updates and Improvements
**1.0.0 Updates:**
**Packages:**
- Switched to node bootstrap package
- Added gitignore for node_modules
- Changed Chart.js to updated version

**HTML and JS Changes:**
- Change from form input to dynamic select input
- Grouped all countryNames as a class and targeted all of the class to be able to display each
- Remove dummy text
- Added elements and id's for many of the elements that require dynamic change
- Change some documentation
- Change some names of functions and elements

**New functions and features:**
- Created displayCard function which displays the card only a country is selected and button is push
- Created a currency exchanged
- Added a clock that obtains the time in that region (Takes into account the timezone)
- Added Languages information
- Added Telephone information
- Added Vaccination information
- Added Weather information and created a chart to display it in

**Bug fixes:**
- Remove selectBox options after selecting a new country (would create new options everytime)
- Add text if data returns a null value or no value
- Chart overlapping and not removing old chart before adding a new one

### Special Thanks To
- Holmesglen
- Daniel Fitzsimmons

If you have any comments, questions or suggest feel free to contact me

<sub><sup>Project was started on May 12 2022</sub></sup>

<sub><sup>Current version was completed on June 5 2022</sub></sup>