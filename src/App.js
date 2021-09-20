import { useState } from "react";
import "./App.css";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-"];

  const calculate = () => {
    if(!ops.includes(calc.slice(-1))) {
	    setCalc(eval(calc.toString()).toString());
    }
    else {
      setCalc("Invalid Operation !");
      setResult("");
      setTimeout(() => clearEntry(), 1000);
    }
  }

  const deleteLast = () => {
	if(calc == "") {
		return;
	}
	const value = calc.slice(0,-1);
	setCalc(value);
  setResult("");
  }

  const clearEntry = () => {
    setCalc("");
    setResult("");
  }

  const updateCalc = (value) => {
    if(
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1))
    ) {
      return;
    }

    setCalc(calc + value);

    if(!ops.includes(value)) {
      setResult(eval(calc + value.toString()));
    }
    else{
      setResult("");
    }
  };

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="title">Calculator</div>
        <div className="display">
          { result ? <span>({ result })</span> : "" }
		  &nbsp;
          {calc || "0"}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}> +</button>
          <button onClick={() => updateCalc("-")}>-</button>

          <button onClick={ deleteLast }>DEL</button>
          <button onClick={ clearEntry }>CE</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
