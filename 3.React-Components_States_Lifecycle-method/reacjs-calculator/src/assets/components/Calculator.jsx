import {useState} from 'react';

function Calculator() {
    const [firstNumber, setFirstNumber] = useState("");
    const [secondNumber, setSecondNumber] = useState("");
    const [result, setResult] = useState("");

    const calculate = (operator) => {
        const firstOperand = parseInt(firstNumber);
        const secondOperand = parseInt(secondNumber);

        if (isNaN(firstOperand) || isNaN(secondOperand)) {
            setResult("Vui lòng nhập đủ 2 số");
            return;
        }

        switch (operator) {
            case "+":
                setResult(String(firstOperand + secondOperand));
                break;
            case "-":
                setResult(String(firstOperand - secondOperand));
                break;
            case "*":
                setResult(String(firstOperand * secondOperand));
                break;
            case "/":
                setResult(secondOperand === 0 ? "KHÔNG thể chia cho 0" : String(firstOperand / secondOperand));
                break;
            default:
                setResult("Phép toán KHÔNG hợp lệ!");
        }
    }

    const handleReset = () => {
        setResult("");
        setFirstNumber("");
        setSecondNumber("");
    }

    return (
        <div>
            <h2>App Máy tính</h2>
            <input
                type="number"
                value={firstNumber}
                onChange={(e) => setFirstNumber(e.target.value)}
            />
            <br/>
            <input
                type="number"
                value={secondNumber}
                onChange={(e) => setSecondNumber(e.target.value)}
            />

            <h3>Kết quả: {result}</h3>

            <div>
                <button onClick={() => calculate("+")}>+</button>
                <button onClick={() => calculate("-")}>-</button>
                <button onClick={() => calculate("*")}>x</button>
                <button onClick={() => calculate("/")}>/</button>
            </div>

            <button onClick={handleReset}>Làm mới</button>
        </div>
    );
}

export default Calculator;