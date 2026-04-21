import useIncrement from "../hooks/useIncrement.jsx";

function Counter1() {
    const [count1, increase1] = useIncrement(1);

    return (
        <div>
            <h2>Count 1: {count1}</h2>
            <button onClick={increase1}>Add 1</button>
        </div>
    )
}

export default Counter1;