/**
 * Basic arithmetic operations
 */
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return null;
    return a / b;
}

/**
 * Performs arithmetic operation based on operator
 * @param {string} operator - The operator to use
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number|null} Result of the operation or null if invalid
 */
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '×': return multiply(a, b);
        case '÷': return divide(a, b);
        case 'x': return a ** b;
        case '√': return Math.sqrt(a);
        default: return null;
    }
}

/**
 * Format number with commas while preserving decimals
 * @param {string} number - Number to format
 * @returns {string} Formatted number
 */
function formatNumberWithCommas(number) {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

/**
 * Initialize theme based on saved preference
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.querySelector('.theme-toggle').textContent = savedTheme;
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.querySelector('.theme-toggle').textContent = newTheme;
}
