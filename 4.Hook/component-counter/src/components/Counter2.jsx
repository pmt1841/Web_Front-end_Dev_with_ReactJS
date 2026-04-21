import useIncrement from "../hooks/useIncrement.jsx";

function Counter2() {
    const [count2, increase2] = useIncrement(2);

    return (
        <div>
            <h2>Count 2: {count2}</h2>
            <button onClick={increase2}>Add 2</button>
        </div>
    )
}

export default Counter2;