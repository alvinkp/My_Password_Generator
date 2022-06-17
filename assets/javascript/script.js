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

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
