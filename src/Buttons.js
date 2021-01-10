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

export default Buttons;
