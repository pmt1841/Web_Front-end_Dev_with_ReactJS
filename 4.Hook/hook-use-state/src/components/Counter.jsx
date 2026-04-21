import {useState} from "react";

function Counter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div style={{textAlign: "center", marginTop: 40}}>
            <h2>Counter: {count}</h2>
            <button onClick={handleClick}>Click</button>
        </div>
    )
}

export default Counter;