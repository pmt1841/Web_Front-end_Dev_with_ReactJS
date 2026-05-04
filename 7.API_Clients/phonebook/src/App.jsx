import {BrowserRouter, Routes, Route} from "react-router-dom";
import ListContact from "./components/ListContact";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/contacts" element={<ListContact/>}/>
          <Route path="/contacts/add" element={<AddContact/>}/>
          <Route path="/contacts/:id/edit" element={<EditContact/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App