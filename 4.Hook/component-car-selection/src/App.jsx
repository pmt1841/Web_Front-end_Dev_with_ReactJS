import {useState} from "react";

function App() {
    let carList = ["Honda", "BMW", "Toyota", "Suzuki", "Mercedes"];
    let colorList = ["Black", "White", "Grey", "Red", "Blue"];

    const [selectedCar, setSelectedCar] = useState({car: carList[0], color: colorList[0]});

    const handleCarChange = (e) => {
        const newCar = e.target.value;
        setSelectedCar(prevState => ({
            ...prevState,
            car: newCar
        }));
    };

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setSelectedCar(prevState => ({
            ...prevState,
            color: newColor
        }));
    };

    return (
        <div>
            <h2>Choose brand:</h2>
            <select onChange={handleCarChange}>
                {carList.map((car) => (
                    <option value={car}>{car}</option>
                ))}
            </select>

            <h2>Choose color:</h2>
            <select onChange={handleColorChange}>
                {colorList.map((color) => (
                    <option value={color}>{color}</option>
                ))}
            </select>

            <h3>You selected a {selectedCar.color} {selectedCar.car}</h3>
        </div>
    );

}

export default App;