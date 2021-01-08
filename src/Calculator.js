import "./Calculator.scss";
import React from "react";

function App() {
  return (
    <div className="wrapper">
      <Calculator />
    </div>
  );
}

// Calculator component will contain the heavy logic
class Calculator extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="calculator">
        <div className="display-wrapper">
          <div className="display">
            <Output />
            <Formula />
          </div>
        </div>
        <Buttons />
      </div>
    );
  }
}

// Buttons - child component of the Calculator parent component
const Buttons = (props) => {
  return (
    <div className="buttons">
      <p>Buttons</p>
    </div>
  );
};

// Screens - these are child components of the Calculator parent component

// User can see the entire formula leading up to the final answer e.g. 9 + 6 = 15
const Formula = (props) => {
  return (
    <div className="formula">
      <p>Formula</p>
    </div>
  );
};

// Displays the current input/answer e.g. entering 9 will replace the screen with 9.
const Output = (props) => {
  return (
    <div className="output">
      <p>Output</p>
    </div>
  );
};

export default App;
