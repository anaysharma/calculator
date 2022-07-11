class Calculator {
	constructor (previusInputDisplay, currentInputDisplay) {
		this.previusInputDisplay = previusInputDisplay;
		this.currentInputDisplay = currentInputDisplay;
		this.clear();
	}

	clear () {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}

	delete () {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber (number) {
		if ((number === '.' && this.currentOperand.includes('.')) || this.currentOperand.length >= 12) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation (operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute () { 
		let result;
		const prev = parseFloat(this.previousOperand);
		const curr = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(curr)) return;
		switch (this.operation) {
			case '+':
				result = prev + curr;
				break;
			case '-':
				result = prev - curr;
				break;
			case '×':
				result = prev * curr;
				break;
			case '÷':
				result = prev / curr;
				break;
			default:
				return;
		}
		this.currentOperand = result;
		this.operation = undefined;
		this.previousOperand = '';
	}

	getDisplayNumber (number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	update () {
		this.currentInputDisplay.innerText = this.getDisplayNumber(this.currentOperand);
		if (this.operation != null) {
			this.previusInputDisplay.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		} else {
			this.previusInputDisplay.innerText = '';
		}
	}
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-clear]');
const previusInputDisplay = document.querySelector('[data-previous-input]');
const currentInputDisplay = document.querySelector('[data-current-input]');

const calculator = new Calculator(previusInputDisplay, currentInputDisplay);

numberButtons.forEach( button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.update();
	})
});

operationButtons.forEach( button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.update();
	})
})

equalsButton.addEventListener('click', button => {
	calculator.compute();
	calculator.update();
})

allClearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.update();
})

clearButton.addEventListener('click', button => {
	calculator.delete();
	calculator.update();
})

