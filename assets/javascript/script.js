// Assignment Code
var generateBtn = document.querySelector("#generate");
var passWasGenerated;

// ******** from W3DOCS: https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
function shuffleArray(array) {
  var curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    var randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    var tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

// ******** from MDN reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// =====================================  Write password to the #password input
function writePassword() {
  passWasGenerated = false;
  // Display Prompts
  var passLength = prompt('Password length: (MUST be a minimum 8 but no more than 128)', '8');
  
  // Check if passLength is valid, meaning its 8 or more, 128 or less and is a number 
  if(passLength < 8 || passLength > 128 || isNaN(passLength)){
    
    // Check if the user clicked cancel on the prompt
    if(passLength === null){
    alert('Password Generation cancelled by user.');
    return;
    }
    // Check if they entered a non-number or a number outside of the specified range
    else{
    alert('Password length is invalid or you didn\'t enter a number, please try again!');
    return;
    }
    
  }
  // If the passLength is valid and hasn't been cancelled then proceed with the rest of the prompts
  else{
  // In order from top to bottom, ask user if they want to include: lowercase letters, UPPERCASE LETTERS, Numbers, Special Characters
  var passLowercase = confirm('Include lowercase letters?\nOk = Yes\nCancel = No');
  var passUppercase = confirm('Include uppercase letters?\nOk = Yes\nCancel = No');
  var passNumbers = confirm('Include Numbers?\nOk = Yes\nCancel = No');
  var passSpecialCharacters = confirm('Include Special Characters?\nOk = Yes\nCancel = No');
  }

  // ======================== Password Generator function that's based on the answers provided by the previous prompts
  function generatePassword(length, lowercase, uppercase, numbers, SpecialChars){
    var generatedPass = [];
  
  // ======================== Random letter generator with option to capitalize returned letter
  function randomLetterGenerator(shouldCapitalize) {
    var letters ="abcdefghijklmnopqrstuvwxyz";
    var myLetter = letters[Math.floor(Math.random() * letters.length)];
    
    if(shouldCapitalize){
      return myLetter.toUpperCase();
    }
    else {
      return myLetter;
    }
  }
  
  //========================== Random Number Generator
  function randomNumberGenerator() { 
    return Math.floor(Math.random() * 10)
  };

  // ========================= Random Special Character Generator
  function randomSpecialCharacterGenerator() {
    var specialCharArray = [ "\\", "!", '\"', "#", "$", "%", "&", "\'","(",")", "*", "+" , "," , "-", "." , "/",":",";","<", "=",">", "?", "@", "[","]" ,"^", "_", "`", "{", "|", "}", "~"];
    var mySpecialCharacter = specialCharArray[Math.floor(Math.random() * specialCharArray.length)];
    
    return mySpecialCharacter; 
  }

  // ========================= Compiles selected password criteria into an array.
  function gatherSelectedCriteria(){
      var myArrayOfCriteria = [];
      if(passLowercase){
        myArrayOfCriteria.push('lower');
      }
      
      if(passUppercase) {
        myArrayOfCriteria.push('upper');
      }
      if(passNumbers) {
        myArrayOfCriteria.push('num');
      }
      if(passSpecialCharacters){
        myArrayOfCriteria.push('special');
      }
      
      return myArrayOfCriteria;
  }

  // Stores compiled password criteria as a variable
  var selectedCriteria = gatherSelectedCriteria();

  // Check if user selected any criteria, if none are selected show alert. If there is at least one criteria selected the generated the password
  if(selectedCriteria.length === 0){
    alert("No options were chosen. Please try again.");
    return;
  }
  else{
  // ========================= Generates characters based on selected Criteria
  function buildPassword(criteria){
    var myCharacter;
    switch (criteria){
      case 'lower':
        myCharacter = randomLetterGenerator();
        break;
      case 'upper':
        myCharacter = randomLetterGenerator(true);
        break;
      case 'num':
        myCharacter = randomNumberGenerator();
        break;
      case 'special':
        myCharacter = randomSpecialCharacterGenerator();
        break;
        default:
          console.log("Default Case hit")
      }
    return myCharacter;
  }

  //  ======================== Preloads generatedPass array with one of each type of selected criteria
  function preloadGeneratedPass() {
    for(var i = 0; i < selectedCriteria.length; i++){
      generatedPass.push(buildPassword(selectedCriteria[i]));
    }
    return generatedPass;
  }

  preloadGeneratedPass();

  // Generates the rest of password criteria at random
  for (var i = 0; i < length - selectedCriteria.length; i++){
    generatedPass.push(buildPassword(selectedCriteria[getRandomInt(selectedCriteria.length)]));
  } 
  

  // generatedPass.join('');
  var shuffledPass = shuffleArray(generatedPass);
  passWasGenerated = true;
  return shuffledPass.join(''); 
  }

}

  // Call generatePassword, store it and update the HTML element so the user can see their generated password
  var password = generatePassword(passLength, passLowercase, passUppercase, passNumbers, passSpecialCharacters);
  var passwordText = document.querySelector("#password");
  
  // Check if password was generated, if not leave existing text, if it was then update the html element with the generated password
  if(passWasGenerated){
    passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);