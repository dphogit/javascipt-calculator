import "./Calculator.scss";
import React from "react";

// Constant variables
const DECIMAL = ".",
  DEFAULT_OUTPUT = "0",
  DEFAULT_FORMULA = "",
  DIGIT = /\d/,
  MAX_NUM_DIGITS = 8,
  MAX_DIGITS_REACHED_MESSAGE = "DIGIT LIMIT MET",
  OPERATORS = /[+*/-]/;

function App() {
  return (
    <div className="wrapper">
      <Calculator />
    </div>
  );
}

// Calculator component will contain the heavy logic
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

  // When the maximum number of digits that can fit on screen is exceeded, display message with 'blinking effect'
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
    if (this.state.output.length > MAX_NUM_DIGITS) {
      this.displayMaxDigitsReached();
    } else {
      const number = e.target.value;
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

    const checkLastTwoAreOperators = (formula) => {
      const lastTwo = formula.slice(formula.length - 2);

      for (let char of lastTwo) {
        if (!OPERATORS.test(char)) {
          return false;
        }
      }
      return true;
    };

    if (this.state.evaluated === true) {
      this.setState({
        formula:
          this.state.formula.slice(this.state.formula.indexOf("=") + 1) +
          operatorEntered,
        evaluated: false,
      });
    } else if (DIGIT.test(this.state.formula[formulaLength - 1])) {
      this.setState({ formula: this.state.formula + operatorEntered });
    } else if (
      operatorEntered === "-" &&
      !checkLastTwoAreOperators(this.state.formula)
    ) {
      this.setState({ formula: this.state.formula + "-" });
    } else if (
      checkLastTwoAreOperators(this.state.formula) &&
      operatorEntered !== "-"
    ) {
      this.setState({
        formula:
          this.state.formula.slice(0, formulaLength - 2) + operatorEntered,
      });
    } else {
      this.setState({
        formula:
          this.state.formula.slice(0, formulaLength - 1) + operatorEntered,
      });
    }
  }

  handleZero() {
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

// Buttons - child component of the Calculator parent component
const Buttons = (props) => {
  return (
    <div className="buttons">
      <button
        id="clear"
        className="two-span operator"
        onClick={props.handleClear}
      >
        CLEAR
      </button>
      <button
        id="divide"
        className="operator"
        onClick={props.handleOperator}
        value="/"
      >
        /
      </button>
      <button
        id="multiply"
        className="operator"
        onClick={props.handleOperator}
        value="*"
      >
        x
      </button>
      <button id="seven" onClick={props.handleNumber} value="7">
        7
      </button>
      <button id="eight" onClick={props.handleNumber} value="8">
        8
      </button>
      <button id="nine" onClick={props.handleNumber} value="9">
        9
      </button>
      <button
        id="subtract"
        className="operator"
        onClick={props.handleOperator}
        value="-"
      >
        -
      </button>
      <button id="four" onClick={props.handleNumber} value="4">
        4
      </button>
      <button id="five" onClick={props.handleNumber} value="5">
        5
      </button>
      <button id="six" onClick={props.handleNumber} value="6">
        6
      </button>
      <button
        id="add"
        className="operator"
        onClick={props.handleOperator}
        value="+"
      >
        +
      </button>
      <button id="one" onClick={props.handleNumber} value="1">
        1
      </button>
      <button id="two" onClick={props.handleNumber} value="2">
        2
      </button>
      <button id="three" onClick={props.handleNumber} value="3">
        3
      </button>
      <button id="zero" className="two-span" onClick={props.handleZero}>
        0
      </button>
      <button id="decimal" onClick={props.handleDecimal}>
        .
      </button>
      <button id="equals" className="operator" onClick={props.handleEvaluate}>
        =
      </button>
    </div>
  );
};

// Screens - these are child components of the Calculator parent component

// User can see the entire formula leading up to the final answer e.g. 9 + 6 = 15
const Formula = (props) => {
  return (
    <div className="formula">
      <p>{props.formula}</p>
    </div>
  );
};

// Displays the current input/answer e.g. entering 9 will replace the screen with 9 (one value at a time)
const Output = (props) => {
  return (
    <div className="output" id="display">
      <p>{props.output}</p>
    </div>
  );
};

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
