import {BrowserRouter, Routes, Route} from "react-router-dom";
import ListBook from "./components/ListBook";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListBook/>}/>
                <Route path="/add" element={<AddBook/>}/>
                <Route path="/edit/:id" element={<EditBook/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
