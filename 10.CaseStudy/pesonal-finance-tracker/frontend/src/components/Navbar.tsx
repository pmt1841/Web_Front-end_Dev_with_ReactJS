import { useState } from 'react';
import {
    Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Divider, Toolbar, Typography, Box, IconButton, AppBar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CategoryIcon from '@mui/icons-material/Category';
import { Link, useLocation } from 'react-router-dom';

export const drawerWidth = 240;

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Tổng quan', icon: <DashboardIcon />, path: '/' },
        { text: 'Giao dịch', icon: <ReceiptLongIcon />, path: '/transactions' },
        { text: 'Danh mục', icon: <CategoryIcon />, path: '/categories' },
    ];

    // Nội dung bên trong Sidebar (dùng chung cho cả Mobile và Desktop)
    const drawerContent = (
        <Box sx={{ color: 'white' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 2 }}>
                <AccountBalanceWalletIcon />
                <Typography variant="h6" noWrap sx={{ fontWeight: 'bold' }}>
                    Finance App
                </Typography>
            </Toolbar>
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            <List sx={{ px: 1, mt: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            onClick={() => setMobileOpen(false)} // Tự đóng khi chọn menu trên mobile
                            sx={{
                                borderRadius: '8px',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
                                },
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                            }}
                        >
                            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            {/* 1. Header di động: Chỉ hiện trên Mobile */}
            <AppBar
                position="fixed"
                sx={{
                    display: { sm: 'none' }, // Ẩn trên màn hình từ 'sm' trở lên
                    backgroundColor: '#2e7d32',
                }}
            >
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Finance App
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* 2. Drawer cho Mobile: Hiện khi bấm Hamburger */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#2e7d32' },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* 3. Drawer cho Desktop: Luôn hiện cố định */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#2e7d32' },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Navbar;