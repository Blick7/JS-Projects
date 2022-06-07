const firstNumber = document.querySelector('.first-number');
const secondNumber = document.querySelector('.second-number');
const operationBtns = document.querySelectorAll('.operation');
const numberBtns = document.querySelectorAll('.number');
const clearAll = document.querySelector('.clear-all');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');
const percent = document.querySelector('.percent');

class Calculator {
  constructor(firstNumberHtmlElem, secondNumberHtmlElem) {
    this.firstNumberHtmlElem = firstNumberHtmlElem;
    this.secondNumberHtmlElem = secondNumberHtmlElem;
    this.clearDisplay();
  }

  clearDisplay() {
    this.firstNumber = '';
    this.secondNumber = '';
    this.operation = undefined;
  }

  deleteLastSymbol() {
    console.log(this.firstNumber);
    this.firstNumber = this.firstNumber.slice(0, this.secondNumber.length - 1);
    console.log(this.firstNumber);
  }

  appendNumber(number) {
    if (this.firstNumber.includes('.') && number === '.') return;
    this.firstNumber = this.firstNumber + number;
  }

  chooseOperation(operation) {
    if (this.firstNumber === '') return;
    if (this.secondNumber !== '') {
      this.calculate();
    }
    this.operation = operation;
    this.secondNumber = this.firstNumber;
    this.firstNumber = '';
  }

  calculate() {
    let result;
    const first = Number(this.firstNumber);
    const second = Number(this.secondNumber);

    if (isNaN(first) || isNaN(second)) {
      return;
    }

    switch (this.operation) {
      case '/':
        result = second / first;
        break;
      case '*':
        result = second * first;
        break;
      case '-':
        result = second - first;
        break;
      case '+':
        result = second + first;
        break;
        // case '%':
        //   result = second / first;
        //   console.log(this.operation);
        break;
      default:
        return;
    }
    this.firstNumber = result;
    this.operation = undefined;
    this.secondNumber = '';
  }

  calcPercent() {
    let result;
    const first = Number(this.firstNumber);
    const second = Number(this.secondNumber);

    if (this.operation === undefined) {
      result = first / 100;
    }

    switch (this.operation) {
      case '/':
        result = (second * 100) / first;
        break;
      case '*':
        result = second * (first / 100);
        break;
      case '-':
        result = second - (first / 100) * second;
        break;
      case '+':
        result = second + (first / 100) * second;
        break;
      default:
        return;
    }
    this.firstNumber = result;
    this.operation = undefined;
    this.secondNumber = '';
  }

  displayNumber(number) {
    const stringNum = number.toString();
    const intNum = parseFloat(stringNum.split('.')[0]);
    const decimalNum = stringNum.split('.')[1];
    let intDisplay;
    if (isNaN(intNum)) {
      intDisplay = '';
    } else {
      intDisplay = intNum.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    if (decimalNum != null) {
      return `${intDisplay}.${decimalNum}`;
    } else {
      return intDisplay;
    }
    // const floatNum = parseFloat(number);
    // if (isNaN(floatNum)) return '';
    // return floatNum.toLocaleString('en');
  }

  displayUpdate() {
    this.firstNumberHtmlElem.textContent = this.displayNumber(this.firstNumber);
    // this.secondNumberHtmlElem.textContent = this.secondNumber;
    if (this.operation != undefined) {
      this.secondNumberHtmlElem.textContent = `${this.displayNumber(
        this.secondNumber
      )} ${this.operation}`;
    } else {
      this.secondNumberHtmlElem.textContent = '';
    }
  }
}

const calculator = new Calculator(firstNumber, secondNumber);

numberBtns.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerHTML);
    calculator.displayUpdate();
  });
});

operationBtns.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.textContent);
    calculator.displayUpdate();
  });
});

equals.addEventListener('click', () => {
  calculator.calculate();
  calculator.displayUpdate();
});

clearAll.addEventListener('click', () => {
  calculator.clearDisplay();
  calculator.displayUpdate();
});

clear.addEventListener('click', () => {
  calculator.deleteLastSymbol();
  calculator.displayUpdate();
});

percent.addEventListener('click', () => {
  calculator.calcPercent();
  calculator.displayUpdate();
});
