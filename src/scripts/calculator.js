/**
 * Main calculator functionality
 */
class Calculator {
    /**
     * Initialize calculator with default state
     */
    constructor() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.justGotResult = false;
        this.waitingForPower = false;
        this.waitingForRoot = false;
        this.baseNumber = null;
        this.history = new CalculatorHistory();
    }

    /**
     * Reset calculator to initial state
     */
    clear() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.justGotResult = false;
        this.waitingForPower = false;
        this.waitingForRoot = false;
        this.baseNumber = null;
        this.updateDisplay();
    }

    /**
     * Delete last digit from display
     */
    delete() {
        if (this.waitingForSecondOperand) return;
        if (this.displayValue.length === 1) {
            this.displayValue = '0';
        } else {
            this.displayValue = this.displayValue.slice(0, -1);
        }
        this.updateDisplay();
    }

    /**
     * Add digit to display
     * @param {string} number - Digit to append
     */
    appendNumber(number) {
        if (this.justGotResult) {
            this.displayValue = number;
            this.justGotResult = false;
            this.firstOperand = null;
        } else if (this.waitingForSecondOperand || this.waitingForPower || this.waitingForRoot) {
            this.displayValue = number;
            this.waitingForSecondOperand = false;
        } else {
            this.displayValue = this.displayValue === '0' ? number : this.displayValue + number;
        }
        this.updateDisplay();
    }

    /**
     * Add decimal point to display
     */
    appendDecimal() {
        if (this.justGotResult || this.waitingForSecondOperand ||
            this.waitingForPower || this.waitingForRoot) {
            this.displayValue = '0.';
            this.justGotResult = false;
            this.waitingForSecondOperand = false;
        } else if (!this.displayValue.includes('.')) {
            this.displayValue += '.';
        }
        this.updateDisplay();
    }

    /**
     * Display error message on calculator screen
     * @param {string} message - Error message to display
     */
    showError(message) {
        const errorElement = document.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
        setTimeout(() => {
            errorElement.classList.remove('visible');
        }, 3000);
    }

    /**
     * Calculate power of a number
     */
    power(base, exponent) {
        if (base === 0 && exponent < 0) {
            this.showError("Cannot divide by zero!");
            return null;
        }
        return Math.pow(base, exponent);
    }

    /**
     * Calculate nth root of a number
     */
    nthRoot(number, n) {
        if (n === 0) {
            this.showError("Root degree cannot be zero!");
            return null;
        }
        if (number < 0 && n % 2 === 0) {
            this.showError("Cannot calculate even root of a negative number!");
            return null;
        }
        return Math.pow(number, 1/n);
    }

    /**
     * Handle function button press
     * @param {string} func - Function name
     */
    handleFunction(func) {
        const current = parseFloat(this.displayValue);
        
        switch(func) {
            case '√':
                if (current < 0) {
                    this.showError("Cannot calculate square root of a negative number!");
                    return;
                }
                const sqrt = this.nthRoot(current, 2);
                if (sqrt === null) return;
                this.displayValue = sqrt.toString();
                this.history.add(`√${current}`, sqrt);
                break;
            case 'xʸ':
                this.baseNumber = current;
                this.waitingForPower = true;
                this.displayValue = '0';
                break;
            case 'ʸ√x':
                this.baseNumber = current;
                this.waitingForRoot = true;
                this.displayValue = '0';
                break;
        }
        
        this.updateDisplay();
    }

    /**
     * Handle operator button press
     * @param {string} operator - Operator symbol
     */
    handleOperator(operator) {
        if (this.waitingForPower || this.waitingForRoot) {
            this.calculate();
        }

        const inputValue = parseFloat(this.displayValue);

        if (this.firstOperand === null) {
            this.firstOperand = inputValue;
        } else if (!this.waitingForSecondOperand) {
            const result = operate(this.operator, this.firstOperand, inputValue);
            
            if (result === null) {
                this.showError("Cannot divide by zero!");
                this.clear();
                return;
            }
            
            this.displayValue = result.toString();
            this.firstOperand = result;
        }

        this.waitingForSecondOperand = true;
        this.operator = operator;
        this.justGotResult = false;
        this.updateDisplay();
    }

    /**
     * Handle percentage calculation
     */
    percentage() {
        const currentValue = parseFloat(this.displayValue);
        
        if (this.operator && this.firstOperand !== null) {
            const percentValue = (currentValue / 100) * this.firstOperand;
            this.displayValue = percentValue.toString();
        } else {
            this.displayValue = (currentValue / 100).toString();
        }
        
        this.updateDisplay();
    }

    /**
     * Calculate result based on current state
     */
    calculate() {
        if (this.waitingForPower) {
            const exponent = parseFloat(this.displayValue);
            const result = this.power(this.baseNumber, exponent);
            if (result === null) {
                this.clear();
                return;
            }
            const calculation = `${this.baseNumber}^${exponent}`;
            this.displayValue = result.toString();
            this.history.add(calculation, result);
            this.waitingForPower = false;
            this.baseNumber = null;
            this.justGotResult = true;
        } else if (this.waitingForRoot) {
            const n = parseFloat(this.displayValue);
            const result = this.nthRoot(this.baseNumber, n);
            if (result === null) {
                this.clear();
                return;
            }
            const calculation = `${n}√${this.baseNumber}`;
            this.displayValue = result.toString();
            this.history.add(calculation, result);
            this.waitingForRoot = false;
            this.baseNumber = null;
            this.justGotResult = true;
        } else if (this.operator && this.firstOperand !== null && !this.waitingForSecondOperand) {
            const secondOperand = parseFloat(this.displayValue);
            const calculation = `${this.firstOperand} ${this.operator} ${secondOperand}`;
            
            let result = operate(this.operator, this.firstOperand, secondOperand);

            if (result === null) {
                this.showError("Cannot divide by zero!");
                this.clear();
                return;
            }

            result = Math.round(result * 1000000) / 1000000;
            this.history.add(calculation, result);
            this.displayValue = result.toString();
            this.firstOperand = null;
            this.operator = null;
            this.waitingForSecondOperand = false;
            this.justGotResult = true;
        }
        this.updateDisplay();
    }

    /**
     * Copy result to clipboard (without commas)
     */
    copyToClipboard() {
        navigator.clipboard.writeText(this.displayValue)
            .then(() => {
                const copyBtn = document.querySelector('.copy-result');
                copyBtn.textContent = '✓';
                setTimeout(() => copyBtn.textContent = 'copy', 1000);
            })
            .catch(() => this.showError('Failed to copy to clipboard'));
    }

    /**
     * Update calculator display
     */
    updateDisplay() {
        const currentDisplay = document.querySelector('.current-operand');
        const previousDisplay = document.querySelector('.previous-operand');
        
        // Format current display value with commas
        currentDisplay.textContent = formatNumberWithCommas(this.displayValue);
        
        if (this.waitingForPower) {
            previousDisplay.textContent = `${formatNumberWithCommas(this.baseNumber)} ^`;
        } else if (this.waitingForRoot) {
            previousDisplay.textContent = `${formatNumberWithCommas(this.baseNumber)} ʸ√`;
        } else if (this.operator != null) {
            previousDisplay.textContent = `${formatNumberWithCommas(this.firstOperand)} ${this.operator}`;
        } else {
            previousDisplay.textContent = '';
        }
    }
}
