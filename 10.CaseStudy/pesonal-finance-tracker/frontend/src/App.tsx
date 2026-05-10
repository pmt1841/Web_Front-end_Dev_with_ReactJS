import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {DashboardPage} from "./components/Dashboard";
import {TransactionPage} from "./components/Transaction";
import {CategoryPage} from "./components/Category";
import Navbar, {drawerWidth} from "./components/Navbar";
import {Box} from "@mui/material";

function App() {
    return (
        <Router>
            <Box sx={{display: 'flex'}}>
                <Navbar/>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        ml: {sm: `${drawerWidth}px`},
                        width: {sm: `calc(100% - ${drawerWidth}px)`},
                        minHeight: '100vh',
                        bgcolor: '#f5f5f5',
                        mt: {xs: 8, sm: 0}
                    }}
                >
                    <Routes>
                        <Route path="/" element={<DashboardPage/>}/>
                        <Route path="/transactions" element={<TransactionPage/>}/>
                        <Route path="/categories" element={<CategoryPage/>}/>
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;