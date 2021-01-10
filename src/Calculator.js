import "./Calculator.scss";
import React from "react";

import Buttons from "./Buttons";
import { Formula, Output } from "./Display";

// CONSTANT VARIABLES
const DECIMAL = ".",
  DEFAULT_OUTPUT = "0",
  DEFAULT_FORMULA = "",
  DIGIT = /\d/,
  MAX_NUM_DIGITS = 8,
  MAX_DIGITS_REACHED_MESSAGE = "DIGIT LIMIT MET",
  OPERATORS = /[+*/-]/;

// Exported Component - Calculator Application
function App() {
  return (
    <div className="wrapper">
      <Calculator />
    </div>
  );
}

// Calculator Parent Component which contains the heavy logic
class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      output: DEFAULT_OUTPUT,
      formula: DEFAULT_FORMULA,
      evaluated: false,
    };

    // Binding statements
    this.displayMaxDigitsReached = this.displayMaxDigitsReached.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleZero = this.handleZero.bind(this);
  }

  // When the maximum number of digits that can fit on screen is exceeded, this method displays a 'MAX DIGITS' message with a 'blinking effect' by alternatively switching the display screen between the last value on the display screen and the message through set time intervals of 500ms (0.5s)
  displayMaxDigitsReached() {
    const currentValue = this.state.output;
    this.setState({ output: MAX_DIGITS_REACHED_MESSAGE });
    setTimeout(() => this.setState({ output: "" }), 500);
    setTimeout(
      () => this.setState({ output: MAX_DIGITS_REACHED_MESSAGE }),
      1000
    );
    setTimeout(() => this.setState({ output: "" }), 1500);
    setTimeout(() => this.setState({ output: currentValue }), 2000);
  }

  // Note: handleClear will clear both the output AND memory(formula)
  handleClear() {
    this.setState({
      output: DEFAULT_OUTPUT,
      formula: DEFAULT_FORMULA,
    });
  }

  handleDecimal() {
    if (
      !this.state.output.includes(DECIMAL) &&
      !OPERATORS.test(this.state.output)
    ) {
      this.setState({
        output: this.state.output + DECIMAL,
        formula: this.state.formula + DECIMAL,
      });
    }
  }

  // Uses eval() because the source is known unless code directly edited (source - string containing mathematical oerpations to be calculated)
  handleEvaluate() {
    if (this.state.evaluated === false) {
      // allow 5 decimal places
      let answer =
        // eslint-disable-next-line no-eval
        Math.round((eval(this.state.formula) + Number.EPSILON) * 100000) /
        100000;
      if (String(answer).length >= MAX_NUM_DIGITS) {
        answer = answer.toExponential(1);
      }
      this.setState({
        output: answer,
        formula: this.state.formula + "=" + answer,
        evaluated: true,
      });
    }
  }

  handleNumber(e) {
    // Make sure the maximum number of digits inputted already does not exceed set limit
    if (this.state.output.length > MAX_NUM_DIGITS) {
      this.displayMaxDigitsReached();
    } else {
      // Executes as within digit limit
      const number = e.target.value;
      // Checks for whether we need to either replace the oeprator with the number or simply add it onto the display with other inputted numbers. Both scenarios will add the number onto the formula expression.
      if (
        OPERATORS.test(this.state.output) ||
        this.state.output === DEFAULT_OUTPUT
      ) {
        this.setState({
          output: number,
          formula: this.state.formula + number,
        });
      } else {
        this.setState({
          output: this.state.output + number,
          formula: this.state.formula + number,
        });
      }
    }
  }

  handleOperator(e) {
    const operatorEntered = e.target.value;
    const formulaLength = this.state.formula.length;
    this.setState({ output: operatorEntered });

    // Helper function to check whether the last two characters in the formula are operators. Returns true or false which helps with control flow for what to do with the operator is inputted.
    const checkLastTwoAreOperators = (formula) => {
      const lastTwo = formula.slice(formula.length - 2);

      for (let char of lastTwo) {
        if (!OPERATORS.test(char)) {
          return false;
        }
      }
      return true;
    };

    // First check if the formula has already been evaluated, if so then we want to perform new operations on the provided answer.
    if (this.state.evaluated === true) {
      this.setState({
        formula:
          this.state.formula.slice(this.state.formula.indexOf("=") + 1) +
          operatorEntered,
        evaluated: false,
      });
    }
    // Check if the last character in the formula string is a digit, we can just add the operator onto the string for evaluation.
    else if (DIGIT.test(this.state.formula[formulaLength - 1])) {
      this.setState({ formula: this.state.formula + operatorEntered });
    }
    // Special exception for '-' operator because numbers can be negative as well in the formulae expression (e.g. 5 * -5 = -25). So check if the oeprator entered is negative and that the last two characters are NOT operators which we can then add the '-' operator onto the formulae expression for evaluation.
    else if (
      operatorEntered === "-" &&
      !checkLastTwoAreOperators(this.state.formula)
    ) {
      this.setState({ formula: this.state.formula + "-" });
    }
    // If the last two characters in the formula expression are operators and the operator entered is NOT the minus sign, replace the last two operators with the new operator entered. e.g. Entering '*' when display is '5+-' --> '5*'
    else if (
      checkLastTwoAreOperators(this.state.formula) &&
      operatorEntered !== "-"
    ) {
      this.setState({
        formula:
          this.state.formula.slice(0, formulaLength - 2) + operatorEntered,
      });
    }
    // Otherwise the operator entered is not compatible with the previous single operator and we simply replace it with the new one entered.
    else {
      this.setState({
        formula:
          this.state.formula.slice(0, formulaLength - 1) + operatorEntered,
      });
    }
  }

  handleZero() {
    // Check so that we do not add a zero onto the default value of 0. Prevents display with only two consecutive zeros. (e.g. 00 will not occur but 100 is okay)
    if (this.state.output !== DEFAULT_OUTPUT) {
      this.setState({
        output: this.state.output + DEFAULT_OUTPUT,
        formula: this.state.formula + DEFAULT_OUTPUT,
      });
    }
  }

  render() {
    return (
      <div className="calculator">
        <div className="display-wrapper">
          <div id="display-screen">
            <Formula formula={this.state.formula} />
            <Output output={this.state.output} />
          </div>
        </div>
        <Buttons
          handleClear={this.handleClear}
          handleDecimal={this.handleDecimal}
          handleEvaluate={this.handleEvaluate}
          handleNumber={this.handleNumber}
          handleOperator={this.handleOperator}
          handleZero={this.handleZero}
        />
        <Footer />
      </div>
    );
  }
}

// Credentials
const Footer = () => {
  return (
    <footer>
      <p>
        Calculator Designed by{" "}
        <a href="https://github.com/dphogit" target="_blank" rel="noreferrer">
          dphogit
        </a>
      </p>
    </footer>
  );
};

export default App;
