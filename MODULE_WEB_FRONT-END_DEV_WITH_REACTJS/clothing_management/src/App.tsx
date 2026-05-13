import {Routes, Route} from 'react-router-dom'
import ProductListPage from './pages/ProductListPage'
import ProductEditPage from './pages/ProductEditPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<ProductListPage/>}/>
            <Route path="/edit/:id" element={<ProductEditPage/>}/>
        </Routes>
    )
}

export default App
