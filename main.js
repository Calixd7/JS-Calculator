function inputDigit(digit) {
    const { displayValue, checker } = calculator
  
    if (checker === true) {
      calculator.displayValue = digit
      calculator.checker = false
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit
    }
  }
  //getting decimal point to show
  function inputDecimal(dot) {
    if (calculator.checker === true) {
        calculator.displayValue = "0."
      calculator.checker = false 
      return
    }
  
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot 
    }
  }
  //getting the operators to work  
  function handleOperator(nextOperator) {
    const {  firstnumber, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue) 
    
    if (operator && calculator.checker)  {
      calculator.operator = nextOperator 
      return 
    }
  
  //verify first number is null and input value is not a nan value
    if ( firstnumber == null && !isNaN(inputValue)) {
      calculator.firstnumber = inputValue 
    } else if (operator) {
      const result = calculate( firstnumber, inputValue, operator) 
  
      calculator.displayValue = `${parseFloat(result.toFixed(3))}` 
      calculator.firstnumber = result 
    }
  
    calculator.checker = true 
    calculator.operator = nextOperator 
  }
  //function used after operator is used after second number
  function calculate( firstnumber,secondnumber, operator) {
    if (operator === '+') {
      return  firstnumber +secondnumber 
    } else if (operator === '-') {
      return  firstnumber -secondnumber 
    } else if (operator === '*') {
      return  firstnumber *secondnumber 
    } else if (operator === '/') {
      return  firstnumber /secondnumber 
    }
  
    return secondnumber 
  }
  //reset calculator when clear is clicked
  function resetCalculator() {
    calculator.displayValue = '0' 
    calculator.firstnumber = null 
    calculator.checker = false 
    calculator.operator = null 
  }
  //used to update display 
  function updateDisplay() {
    const display = document.querySelector('.calculator-display') 
    display.value = calculator.displayValue 
  }
  
  updateDisplay() 
  //handle key clicks
  const keys = document.querySelector('.calculator-keys') 
  keys.addEventListener('click', event => {
    const target = event.target
    const  value  = target.value 
    if (!target.matches('button')) {
      return 
    }
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value);
        break;
      case '.':
        inputDecimal(value);
        break;
      case 'all-clear':
        resetCalculator();
        break;
      default:
        //checks if key is integer
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }
  
    updateDisplay();
  });
    