/**
 * Manages calculation history with local storage persistence
 */
class CalculatorHistory {
    /**
     * Initialize history from local storage
     */
    constructor() {
        this.history = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
        this.updateDisplay();
    }

    /**
     * Add new calculation to history
     * @param {string} calculation - Calculation expression
     * @param {number} result - Result of calculation
     */
    add(calculation, result) {
        this.history.unshift({ calculation, result });
        if (this.history.length > 10) this.history.pop();
        this.save();
        this.updateDisplay();
    }

    /**
     * Clear all history
     */
    clear() {
        this.history = [];
        this.save();
        this.updateDisplay();
    }

    /**
     * Save history to local storage
     */
    save() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    }

    /**
     * Update history panel in the UI
     */
    updateDisplay() {
        const historyList = document.querySelector('.history-list');
        historyList.innerHTML = this.history
            .map(item => `<div class="history-item" data-result="${item.result}">
                ${item.calculation} = ${item.result}
            </div>`)
            .join('');
    }
}
