// Separate child components of the Calculator parent component
// These make up the display which is seen as one on the actual app.

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

export { Formula, Output };
