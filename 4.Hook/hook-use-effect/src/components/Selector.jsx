import {useState, useEffect} from "react";

function Selector() {
    const [selected, setSelected] = useState("0");
    const [valueSelected, setValueSelected] = useState("");

    const choice = (e) => {
        setSelected(e.target.value);
    };

    useEffect(() => {
        switch (selected) {
            case "0":
                setValueSelected("Java");
                break;
            case "1":
                setValueSelected("Angular");
                break;
            case "2":
                setValueSelected("Javascript");
                break;
            case "3":
                setValueSelected("PHP");
                break;
            default:
                setValueSelected("Unknown");
        }
    }, [selected]);

    return (
        <div style={{ textAlign: "center", padding: 30 }}>
            <label>Khóa học: </label>
            <select onChange={choice}>
                <option value="0">Java</option>
                <option value="1">Angular</option>
                <option value="2">Javascript</option>
                <option value="3">Php</option>
            </select>
            <h2>Your selected: {valueSelected}</h2>
        </div>
    );
}

export default Selector;