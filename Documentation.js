//* Maintaining Code GIT
//1. For version control, use git (end of story)
//2. This will allow you to keep track of versions and collaborate with others
//3. Track issues .ext

//* Maintaining Code Documentation
//1. It is also important to document our code 
//2. This will allow others to understand our code and how it works
//3. It will also helps us understand our own code 6months down the track
//4. When you first start out you may find you add in comments explaining every line of code
//5. This is fine when you start out as it is more of a learning exercise 
//6. But in the real world our comments should just provided a high level overview of what the code does

//* What should you comment
//1. The purpose of the script
//2. Properties/Variables 
//3. Functions/Methods
//4. Parameters

//! Example Variables
/**
 * @type {number}
 */
let tax = 10
/**
 * @const {string}
 */
const name = "string"

//! Example Return
/** 
 * getISS() - Returns the current position of the ISS as JSON
 *
 * @return {object} JSON object containing the current position of the ISS
 */
async function getISS() {
  const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
  const data = await response.json();
  return data;
}

//! Example Params
/**
 * simpleAdd() - Returns the sum of two numbers
 *  
 * @param {number} a The number value one to add
 * @param {number} b The number value two to add
 * @return {number} returns the sum of a and b
 */
function simpleAdd(a, b) {
  return a + b;
}

//* Why is this important?
//Such comments allow us to understand the purpose of the function and use it the right way without looking in its code.

//? Without such comments the following situation is possible:
//1. You (or your colleague) open the code written some time ago, and see that it’s “suboptimal”.
//2. You think: “How stupid I was then, and how much smarter I’m now”, and rewrite using the “more obvious and correct” variant.
//3. …The urge to rewrite was good. But in the process you see that the “more obvious” solution is actually lacking. You even dimly remember why, because you already tried it long ago. You revert to the correct variant, but the time was wasted.

//* Paper Work Documentation
//1. For larger project you are often required to generate documentation
//2. Similar to what you would read when looking up Mozilla JavaScript documentation
//3. This allows other developers to understand your code and and continue the project
//Example: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

//4. Fortunately there are tools that can turn your comments into documentation
//5. You just have to follow there rules
//6. One example of this is https://jsdoc.app/