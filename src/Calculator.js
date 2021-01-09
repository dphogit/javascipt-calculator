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
          <div id="display">
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
      <button id="AC" className="two-span">
        AC
      </button>
      <button id="divide">/</button>
      <button id="multiply">x</button>
      <button id="seven">7</button>
      <button id="eight">8</button>
      <button id="nine">9</button>
      <button id="subtract">-</button>
      <button id="four">4</button>
      <button id="five">5</button>
      <button id="six">6</button>
      <button id="add">+</button>
      <button id="one">1</button>
      <button id="two">2</button>
      <button id="three">3</button>
      <button id="zero" className="two-span">
        0
      </button>
      <button id="decimal">.</button>
      <button id="equals">=</button>
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
