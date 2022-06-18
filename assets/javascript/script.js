// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  // Display Prompts
  var passLength = prompt('Password length: (MUST be a minimum 8 but no more than 128)', '8');
  
  // Check if passLength is valid, meaning its 8 or more, 128 or less and is a number 
  if(passLength < 8 || passLength > 128 || isNaN(passLength)){
    var errorMsg = alert('Password length is invalid or something other than a whole number was entered, please try again');
  }
  // If the passLength is valid then proceed with the rest of the prompts
  else{
  
  // In order from top to bottom, ask user if they want to include: lowercase letters, UPPERCASE LETTERS, Numbers, Special Characters
  var passLowercase = confirm('Include lowercase letters?\nOk = Yes\nCancel = No');
  var passUppercase = confirm('Include uppercase letters?\nOk = Yes\nCancel = No');
  var passNumbers = confirm('Include Numbers?\nOk = Yes\nCancel = No');
  var passSpecialCharacters = confirm('Include Special Characters?\nOk = Yes\nCancel = No');
  }
  // Password Generator function that's based on the answers provided by the previous prompts
  function generatePassword(length, lowercase, uppercase, numbers, SpecialChars){
    var generatedPass = [];
  
  // Random letter generator with option to capitalize returned letter
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
  
  // Random Number Generator
  function randomNumberGenerator() { 
    return Math.floor(Math.random() * 10)
  };
  // Random Special Character Generator
  function randomSpecialCharacterGenerator() {
    var specialCharArray = [ "\\", "!", '\"', "#", "$", "%", "&", "\'","(",")", "*", "+" , "," , "-", "." , "/",":",";","<", "=",">", "?", "@", "[","]" ,"^", "_", "`", "{", "|", "}", "~"];
    var mySpecialCharacter = specialCharArray[Math.floor(Math.random() * specialCharArray.length)];
    
    return mySpecialCharacter; 
  }
}

// Compiles selected password criteria into an array.
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
// Generates characters based on selected Criteria
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
    console.log("Something went terribly wrong if you're seeing this!");
}
return myCharacter;
}
//  Preloads generatedpass array with one of each type of selected criteria
function preloadGeneratedPass() {
for(var i = 0; i < selectedCriteria.length; i++){
  generatedPass.push(buildPassword(selectedCriteria[i]));
}
return generatedPass;
}

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
