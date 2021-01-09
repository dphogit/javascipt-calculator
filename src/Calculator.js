import "./Calculator.scss";
import React from "react";

// TODO - Overall clean up code and put into appropriate files

// Constant variables
const DECIMAL = ".",
  DEFAULT_OUTPUT = "0",
  DEFAULT_FORMULA = "",
  DIGIT = /\d/,
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
    };

    // Binding statements
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleZero = this.handleZero.bind(this);
  }

  // Note: handleClear will clear both the output AND memory(formula)
  handleClear() {
    this.setState({
      output: DEFAULT_OUTPUT,
      formula: DEFAULT_FORMULA,
    });
  }

  // TODO - Implement handleDecimal functionality
  handleDecimal() {
    if (
      !this.state.output.includes(DECIMAL) &&
      !OPERATORS.test(this.state.output)
    ) {
      this.setState({ output: this.state.output + DECIMAL });
    }
  }

  handleNumber(e) {
    const number = e.target.value;
    // If operator or it is default display (i.e. 0), replace the entire display with this number and add the number onto the formula expression
    if (
      OPERATORS.test(this.state.output) ||
      this.state.output === DEFAULT_OUTPUT
    ) {
      this.setState({
        output: number,
        formula: this.state.formula + number,
      });
    }
    // Otherwise, add the number onto the output string (i.e. For 2+ digit numbers) and formula expression
    else {
      this.setState({
        output: this.state.output + number,
        formula: this.state.formula + number,
      });
    }
  }

  // TODO - Tidy Up handleNumber code
  handleOperator(e) {
    const operatorEntered = e.target.value;
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

    if (DIGIT.test(this.state.formula[this.state.formula.length - 1])) {
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
          this.state.formula.slice(0, this.state.formula.length - 2) +
          operatorEntered,
      });
    } else {
      this.setState({
        formula:
          this.state.formula.slice(0, this.state.formula.length - 1) +
          operatorEntered,
      });
    }
  }

  handleZero() {
    if (this.state.output !== DEFAULT_OUTPUT) {
      this.setState({
        output: this.state.output + DEFAULT_OUTPUT,
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
          handleNumber={this.handleNumber}
          handleOperator={this.handleOperator}
          handleZero={this.handleZero}
        />
      </div>
    );
  }
}

// Buttons - child component of the Calculator parent component
const Buttons = (props) => {
  return (
    <div className="buttons">
      <button id="clear" className="two-span" onClick={props.handleClear}>
        Clear
      </button>
      <button id="divide" onClick={props.handleOperator} value="/">
        /
      </button>
      <button id="multiply" onClick={props.handleOperator} value="*">
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
      <button id="subtract" onClick={props.handleOperator} value="-">
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
      <button id="add" onClick={props.handleOperator} value="+">
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
      <button id="equals">=</button>
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

export default App;
