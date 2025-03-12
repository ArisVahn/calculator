/**
 * Initialize calculator and set up event listeners
 */
(function() {
    const calculator = new Calculator();
    initTheme();

    // Set up button event listeners
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => calculator.appendNumber(button.innerText));
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerText === '%') {
                calculator.percentage();
            } else {
                calculator.handleOperator(button.innerText);
            }
        });
    });

    document.querySelectorAll('.function').forEach(button => {
        button.addEventListener('click', () => {
            calculator.handleFunction(button.innerText);
        });
    });

    document.querySelector('.equals').addEventListener('click', () => {
        calculator.calculate();
    });

    document.querySelector('.clear').addEventListener('click', () => {
        calculator.clear();
    });

    document.querySelector('.delete').addEventListener('click', () => {
        calculator.delete();
    });

    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
    document.querySelector('.clear-history').addEventListener('click', () => calculator.history.clear());
    document.querySelector('.copy-result').addEventListener('click', () => calculator.copyToClipboard());

    // History item click handler
    document.querySelector('.history-list').addEventListener('click', (e) => {
        const historyItem = e.target.closest('.history-item');
        if (historyItem) {
            calculator.displayValue = historyItem.dataset.result;
            calculator.updateDisplay();
        }
    });

    // Keyboard support
    document.addEventListener('keydown', e => {
        if (e.key >= '0' && e.key <= '9') {
            calculator.appendNumber(e.key);
        } else if (e.key === '.') {
            calculator.appendDecimal();
        } else if (e.key === '+' || e.key === '-') {
            calculator.handleOperator(e.key);
        } else if (e.key === '*') {
            calculator.handleOperator('×');
        } else if (e.key === '/') {
            calculator.handleOperator('÷');
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            calculator.calculate();
        } else if (e.key === 'Backspace') {
            calculator.delete();
        } else if (e.key === 'Escape') {
            calculator.clear();
        } else if (e.key === '%') {
            calculator.percentage();
        }
    });
})();
