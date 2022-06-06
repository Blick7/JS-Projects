const firstNumber = document.querySelector('.first-number');
const secondNumber = document.querySelector('.second-number');
const operationBtns = document.querySelectorAll('.operation');
const numberBtns = document.querySelectorAll('.number');
const clearAll = document.querySelector('.clear-all');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');

class Calculator {
  constructor(firstNumberHtmlElem, secondNumberHtmlElem) {
    this.firstNumberHtmlElem = firstNumberHtmlElem;
    this.secondNumberHtmlElem = secondNumberHtmlElem;
    this.clearDisplay();
  }

  clearDisplay() {
    this.firstNumber = '';
    this.secondNumber = '';
    this.operation = null;
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

    if (isNaN(first) || isNaN(second)) return;

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
      case '%': // todo: make it separate func
        result = first / 100;
        break;
      default:
        return;
    }
    this.firstNumber = result;
    this.operation = null;
    this.secondNumber = '';
  }

  displayUpdate() {
    this.firstNumberHtmlElem.textContent = this.firstNumber;
    this.secondNumberHtmlElem.textContent = this.secondNumber;
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
  console.log(clearAll);
  calculator.clearDisplay();
  calculator.displayUpdate();
});

clear.addEventListener('click', () => {
  calculator.deleteLastSymbol();
  calculator.displayUpdate();
});
