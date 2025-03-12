# Advanced Calculator

A modern, feature-rich web calculator with advanced mathematical functions and dark/light mode support.

## Features

- Basic arithmetic operations
- Advanced mathematical functions:
  - Custom power calculations (xʸ)
  - Custom root calculations (ʸ√x)
  - Percentage calculations
- Ergonomic interface:
  - Number grouping with commas
  - Copy results to clipboard
  - In-display error messages
- Calculation history panel
- Dark/Light theme support
- Responsive design for all devices
- Keyboard support

## Project Structure

```
src/
├── styles/
│   └── styles.css    # Main stylesheet
└── scripts/
    ├── utils.js      # Utility functions and theme handling
    ├── history.js    # History management
    ├── calculator.js # Core calculator functionality
    └── main.js       # Application initialization
```

## Usage

1. Open `index.html` in a modern web browser
2. Use the calculator through:
   - Mouse clicks on the calculator buttons
   - Keyboard input for numbers and operations
3. Advanced functions:
   - xʸ: Enter base number, click xʸ, enter exponent
   - ʸ√x: Enter number, click ʸ√x, enter root degree
   - %: Calculate percentages of numbers
4. Additional features:
   - Copy results using the copy button
   - View calculation history in the side panel
   - Toggle between dark and light themes
   - Clear history or individual calculations

## Technical Details

The calculator is built using vanilla JavaScript with a modular architecture:

- ES6 Classes for core functionality
- Local Storage for theme preference and history
- Error handling with on-screen messages
- Performance optimizations:
  - Efficient number formatting
  - DOM element caching
  - Optimized calculation handling
- Responsive CSS Grid layout
- Keyboard event handling

## Keyboard Shortcuts

- Numbers: `0-9`
- Operations: 
  - Add: `+`
  - Subtract: `-`
  - Multiply: `*`
  - Divide: `/`
- Decimal: `.`
- Calculate: `Enter` or `=`
- Clear: `Escape`
- Delete: `Backspace`
- Percentage: `%`

## Browser Support

Supports all modern browsers with ES6 compatibility:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is licensed under the MIT License - see the LICENSE file for details.