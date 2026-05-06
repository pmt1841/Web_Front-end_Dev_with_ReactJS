import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TransactionPage from "./pages/TransactionPage";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/Navbar";

function App() {
    return (
        <Router>
            <Navbar /> {}
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionPage />} />
                <Route path="/categories" element={<CategoryPage />} />
            </Routes>
        </Router>
    );
}

export default App;