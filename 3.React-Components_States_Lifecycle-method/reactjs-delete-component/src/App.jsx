import {useState} from 'react';
import Hello from "./component/Hello.jsx";

function App() {
    const [show, setShow] = useState(true);

    return (
        <div style={{textAlign: "center", marginTop: 50}}>
            {show && <Hello />}
            <button onClick={() => setShow(false)}>Delete the component</button>
        </div>
    );
}

export default App;