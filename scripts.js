var operator = null;
var accumulator = 0;

function getContentClick(event) {
    const value = event.target.innerHTML;
    filterAction(value);
}

function isNumber(value) {
    for (let i = 0; i <= 9; i++) {
        if (value === i.toString()) {
           return true;
        }
    }
    if (value === ',') return true;
    return false;
}

function isOperation(value) {
    if (value === '+' || value === '-' ||  value === 'X' || value === '/' || value === '%' ) return true;
    return false;
}

const filterAction = (value) => {
    isNumber(value) ? addInputOnScreen(value) : null;
    isOperation(value) ? setOperation(value) : null;
    value === '+/-' ? changeSign() : null;
    value === '=' ? calculation() : null;
    value === 'AC' ? resetCalculator() : null;
}

function addInputOnScreen(inputNumber) {
    const screenCollection = document.getElementsByClassName('calculator__screen')[0];
    const screenValue = screenCollection.value;
    
    /* will runs once and prevents zero from being added to numbers 1-9 */
    if(screenValue === "0" && screenValue.length === 1 && inputNumber !== ",") {
        screenCollection.value = inputNumber;
    }
     /* write zero comma in case of clicking decimal*/
    else if (screenValue === "" && inputNumber == ",") {
        screenCollection.value = 0 + inputNumber; 
    }
    else {
    /*last clicked value is added*/
         screenCollection.value = screenValue + inputNumber;
    }
}

function setOperation(operator) {
    /*the multiplication symbol is transformed to operate*/
    if (operator === 'X' ) operator = '*';
    /*set current operator */
    this.operator = operator;
    /*call the main function */
    calculation(); 
}
function changeSign() { 
    console.log('Im in change sign');
    const screenCollection = document.getElementsByClassName('calculator__screen')[0];
    /*declare values of the operation and convert strings to numbers*/
    let accumulatorNumber = convertToNumber(this.accumulator);
    let inputNumber = convertToNumber(screenCollection.value);  
    let resultOperation = 0; 
    /*make the sign change*/ 
    accumulatorNumber === 0 ? resultOperation = - inputNumber : resultOperation = - accumulatorNumber;
    saveResultOnScreen(resultOperation, screenCollection)
}

function doOperation(accumulatorNumber, inputNumber, operator) {
         switch(operator) {
            case '+': 
                return accumulatorNumber + inputNumber;
            case '-':   
                /*to avoid subtracting zero - number and turning it to negative*/
                if (accumulatorNumber !== 0) return  accumulatorNumber - inputNumber;
                return inputNumber
            case '*':  
                if (accumulatorNumber !== 0) return accumulatorNumber * inputNumber;
                return inputNumber
            case '/':  
                if (accumulatorNumber !== 0) return accumulatorNumber / inputNumber;
                return inputNumber
            case '%': 
                return inputNumber / 100;
            default:    
               /* by default the result is the one on the screen*/
                return accumulatorNumber;
        }
}

function saveResultOnScreen(resultOperation, screenCollection) {
    resultOperation = convertToString(resultOperation);
    this.accumulator = resultOperation;
    screenCollection.value = "";
    screenCollection.placeholder = resultOperation;
}


/*
* Main function that performs all the calculation and 
* displays the result on the screen 
*/

function calculation() {
    const screenCollection = document.getElementsByClassName('calculator__screen')[0];
    const screenValue = screenCollection.value;
    console.log('Im in calculation');
    if (screenValue !== "") {
        /*declare values of the operation and convert strings to numbers*/
        let accumulatorNumber = convertToNumber(this.accumulator);
        let inputNumber = convertToNumber(screenValue);  
        /*do the calculation*/
        let resultOperation = doOperation(accumulatorNumber, inputNumber, this.operator)
        /*save it on screen*/
       saveResultOnScreen(resultOperation, screenCollection);
  }
} 

/*
* Arrow type function declaration because it does not generate 
* any return, just clear the values and restore the calculator
*/
const resetCalculator= () => {
    const screenCollection = document.getElementsByClassName('calculator__screen')[0];
    screenCollection.value = 0;
    accumulator = 0;
    operator = null; 
}

/*
* Converts a string to a float number separated by '.' 
*/
function convertToNumber(stringValue) {
    /*ensure the value to parseFloat(string) */
    let numberValue = stringValue;
    if (typeof stringValue != "number") {
        stringValue = stringValue.replace(',' , '.' );
        numberValue = parseFloat(stringValue);
    }
    return numberValue;
}

/*
* Converts a number to a string separated by ',' 
*/
function convertToString(numberValue) {
    let stringValue = numberValue.toString(); 
    stringValue = stringValue.replace('.', ',');
    return stringValue;
}