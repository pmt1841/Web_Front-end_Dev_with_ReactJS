import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#2e7d32" }}>
            <Toolbar>
                <AccountBalanceWalletIcon sx={{ mr: 2 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Finance App
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">Tổng quan</Button>
                    <Button color="inherit" component={Link} to="/transactions">Giao dịch</Button>
                    <Button color="inherit" component={Link} to="/categories">Danh mục</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;