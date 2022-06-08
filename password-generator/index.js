const inputPassword = document.querySelector('.input-password');
const passLength = document.querySelector('.length-number');
const passRange = document.querySelector('.range');
const generateBtn = document.querySelector('.generate');
const checkbox = document.querySelectorAll('[type="checkbox"]');
const copyBtn = document.querySelector('.copy');
const passwordStrength = document.querySelector('.password-strength');
const output = document.querySelector('.output');
let password = document.querySelector('.password');

let arrDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// prettier-ignore
let arrLettersLowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
// prettier-ignore
let arrLettersUppercase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
// prettier-ignore
let arrSpecialChars = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", "|", '/' , "\"", '\'', "<", ">", "?", ':', ';'];

// range slider
passLength.textContent = inputPassword.value;
inputPassword.addEventListener('input', () => {
  passRange.style.width = `${(inputPassword.value * 100) / inputPassword.max}%`;
  passLength.textContent = inputPassword.value;

  if (inputPassword.value < 5) {
    inputPassword.value = 5;
    passLength.textContent = inputPassword.value;
    passRange.style.width = `${
      (inputPassword.value * 100) / inputPassword.max
    }%`;
  }
});

// add toggle switch buttons active status
let passProperties = {
  digits: true,
  lowercase: false,
  uppercase: false,
  specialChars: false,
};

checkbox.forEach((button) => {
  button.addEventListener('change', () => {
    // button.classList.toggle('active');
    passProperties[button.id] = !passProperties[button.id];
  });
});

// copy button
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(password.textContent);
});

// could you randexp.js to generate random string(just to know)
const generatePassword = () => {
  let arr = [];
  let length = passLength.textContent;
  let generatedPass = '';
  // password.textContent = '';
  if (passProperties.digits) {
    arr = arr.concat(arrDigits);
  }

  if (passProperties.lowercase) {
    arr = arr.concat(arrLettersLowercase);
  }
  if (passProperties.uppercase) {
    arr = arr.concat(arrLettersUppercase);
  }
  if (passProperties.specialChars) {
    arr = arr.concat(arrSpecialChars);
  }

  while (length > 0) {
    const randNum = Math.floor(Math.random() * arr.length);
    generatedPass += arr[randNum];
    length--;
  }

  if (arr == 0) {
    password.textContent = '';
  } else password.textContent = generatedPass;

  if (password.textContent == '') {
    password.textContent = 'CHOOSE OPTION BELOW';
    password.classList.add('password--empty');
    console.log('hey');
  } else {
    password.classList.remove('password--empty');
  }
};

output.addEventListener('click', (event) => {
  if (event.target.classList.contains('password')) {
    navigator.clipboard.writeText(password.textContent);
    const tooltip = document.querySelector('.tooltip-pass');
    tooltip.classList.add('tooltip--active');
    setTimeout(() => {
      tooltip.classList.remove('tooltip--active');
    }, 1000);
  }
  if (event.target.classList.contains('copy')) {
    const tooltip = document.querySelector('.tooltip-pass');
    tooltip.classList.add('tooltip--active');
    setTimeout(() => {
      tooltip.classList.remove('tooltip--active');
    }, 1000);
  }
});

generatePassword(); // generate password by default
generateBtn.addEventListener('click', generatePassword);
