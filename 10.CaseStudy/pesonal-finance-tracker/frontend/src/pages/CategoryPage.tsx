import {useState, useEffect} from "react";
import {
    Typography, Container, Box, Button, Tabs, Tab,
    Card, CardContent, CardActions, IconButton, Divider, Stack,
    Grid, CircularProgress, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, ToggleButton, ToggleButtonGroup, DialogContentText
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Icons from '@mui/icons-material';

import api from "../services/api";
import type {Category} from "../types/interface";
import * as React from "react";

// 1. Danh sách Icon và Màu sắc cho Modal
const AVAILABLE_ICONS = [
    "Fastfood", "DirectionsCar", "Home", "Receipt", "School", "Work",
    "CardGiftcard", "MedicalServices", "ShoppingBag", "AccountBalance", "Flight", "LocalBar"
];

const AVAILABLE_COLORS = [
    "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
    "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#ffeb3b",
    "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"
];

// Helper hiển thị Icon động
const DynamicIcon = ({name, color}: { name: string, color?: string }) => {
    const IconComponent = (Icons[name as keyof typeof Icons] as React.ElementType) || Icons.Category;
    return <IconComponent sx={{color: color}}/>;
};

const CategoryPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- State cho Modal Thêm/Sửa ---
    const [openFormModal, setOpenFormModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [name, setName] = useState("");
    const [type, setType] = useState<"EXPENSE" | "INCOME">("EXPENSE");
    const [selectedIcon, setSelectedIcon] = useState("Category");
    const [selectedColor, setSelectedColor] = useState("#4caf50");

    // --- State cho Modal Xóa ---
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    // 2. Hàm gọi API lấy dữ liệu
    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await api.get<Category[]>("/categories");
            setCategories(response.data);
        } catch (err) {
            console.error("Lỗi tải danh mục:", err);
            alert("Không thể tải danh sách danh mục.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // --- Xử lý sự kiện Form Thêm/Sửa ---
    const handleAddClick = () => {
        setEditingCategory(null);
        setName("");
        setType(tabIndex === 0 ? "EXPENSE" : "INCOME");
        setSelectedIcon("Category");
        setSelectedColor("#4caf50");
        setOpenFormModal(true);
    };

    const handleEditClick = (cat: Category) => {
        setEditingCategory(cat);
        setName(cat.name);
        setType(cat.transactionType);
        setSelectedIcon(cat.icon || "Category");
        setSelectedColor(cat.color || "#4caf50");
        setOpenFormModal(true);
    };

    const handleSave = async () => {
        if (!name.trim()) {
            alert("Vui lòng nhập tên danh mục!");
            return;
        }

        const payload = {name, transactionType: type, icon: selectedIcon, color: selectedColor};
        try {
            if (editingCategory) {
                await api.put(`/categories/${editingCategory.id}`, payload);
            } else {
                await api.post("/categories", payload);
            }
            setOpenFormModal(false);
            fetchCategories(); // Gọi lại data sau khi lưu
        } catch (err) {
            console.error("Lỗi lưu danh mục:", err);
            alert("Lỗi khi lưu danh mục!");
        }
    };

    // --- Xử lý sự kiện Xóa ---
    const handleDeleteClick = (cat: Category) => {
        setCategoryToDelete(cat);
        setOpenDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!categoryToDelete) return;
        try {
            await api.delete(`/categories/${categoryToDelete.id}`);
            setOpenDeleteModal(false);
            fetchCategories(); // Gọi lại data sau khi xóa
        } catch (err) {
            console.error("Lỗi xóa danh mục:", err);
            alert("Không thể xóa danh mục này (có thể do đã có giao dịch sử dụng).");
        }
    };

    const filteredCategories = categories.filter(cat =>
        tabIndex === 0 ? cat.transactionType === "EXPENSE" : cat.transactionType === "INCOME"
    );

    return (
        <Container maxWidth="lg">
            {/* Header */}
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 3}}>
                <Typography variant="h4" sx={{fontWeight: "bold"}}>Quản lý Danh Mục</Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleAddClick}
                        sx={{backgroundColor: "#2e7d32", "&:hover": {backgroundColor: "#1b5e20"}}}>
                    Thêm Danh Mục
                </Button>
            </Box>

            {/* Tabs */}
            <Box sx={{borderBottom: 1, borderColor: 'divider', mb: 3}}>
                <Tabs value={tabIndex} onChange={(_, val) => setTabIndex(val)}
                      sx={{
                          '& .MuiTab-root': {fontWeight: 'bold'},
                          '& .Mui-selected': {color: tabIndex === 0 ? '#d32f2f !important' : '#2e7d32 !important'},
                          '& .MuiTabs-indicator': {backgroundColor: tabIndex === 0 ? '#d32f2f' : '#2e7d32'}
                      }}>
                    <Tab label="Khoản Chi"/>
                    <Tab label="Khoản Thu"/>
                </Tabs>
            </Box>

            {/* Danh sách Thẻ */}
            {isLoading ? (
                <Box sx={{display: 'flex', justifyContent: 'center', py: 5}}><CircularProgress/></Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredCategories.map((category) => {
                        const displayColor = category.color || (category.transactionType === "EXPENSE" ? "#f44336" : "#4caf50");
                        return (
                            <Grid size={{xs: 12, sm: 6, md: 4}} key={category.id}>
                                <Card sx={{
                                    borderRadius: 3, boxShadow: 1, borderTop: `4px solid ${displayColor}`,
                                    transition: "0.2s", "&:hover": {transform: "translateY(-4px)", boxShadow: 4},
                                    height: '100%', display: 'flex', flexDirection: 'column'
                                }}>
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Stack direction="row" spacing={2} sx={{mb: 1.5, alignItems: "center"}}>
                                            <Box sx={{
                                                p: 1.5, borderRadius: '50%', bgcolor: `${displayColor}1A`,
                                                color: displayColor, display: 'flex'
                                            }}>
                                                <DynamicIcon name={category.icon || "Category"}/>
                                            </Box>
                                            <Typography variant="h6"
                                                        sx={{fontWeight: "bold"}}>{category.name}</Typography>
                                        </Stack>
                                    </CardContent>
                                    <Divider/>
                                    <CardActions sx={{justifyContent: "flex-end", p: 1}}>
                                        <IconButton sx={{color: "#2e7d32"}} onClick={() => handleEditClick(category)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton sx={{color: "#d32f2f"}} onClick={() => handleDeleteClick(category)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                    {filteredCategories.length === 0 && (
                        <Grid size={12}>
                            <Typography color="text.secondary" sx={{py: 5, textAlign: "center"}}>
                                Chưa có danh mục nào trong mục này.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            )}

            {/* 3. MODAL THÊM / SỬA (Màu Xanh #2e7d32) */}
            <Dialog open={openFormModal} onClose={() => setOpenFormModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{backgroundColor: "#2e7d32", color: "white", fontWeight: "bold", textAlign: 'center'}}>
                    {editingCategory ? "Chỉnh Sửa Danh Mục" : "Thêm Danh Mục Mới"}
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3} sx={{mt: 1}}>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <ToggleButtonGroup
                                color={type === "INCOME" ? "success" : "error"}
                                value={type} exclusive onChange={(_, val) => val && setType(val)}
                            >
                                <ToggleButton value="EXPENSE" sx={{px: 4, fontWeight: 'bold'}}>Khoản Chi</ToggleButton>
                                <ToggleButton value="INCOME" sx={{px: 4, fontWeight: 'bold'}}>Khoản Thu</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <TextField
                            label="Tên danh mục"
                            fullWidth value={name}
                            onChange={(e) => setName(e.target.value)}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 30,
                                },
                            }}
                            required/>

                        <Box>
                            <Typography variant="subtitle2" sx={{mb: 1, fontWeight: 'bold'}}>Chọn màu đại
                                diện:</Typography>
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                                {AVAILABLE_COLORS.map(color => (
                                    <Box key={color} onClick={() => setSelectedColor(color)}
                                         sx={{
                                             width: 32,
                                             height: 32,
                                             borderRadius: '50%',
                                             bgcolor: color,
                                             cursor: 'pointer',
                                             border: selectedColor === color ? '3px solid #333' : 'none'
                                         }}
                                    />
                                ))}
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" sx={{mb: 1, fontWeight: 'bold'}}>Chọn biểu
                                tượng:</Typography>
                            <Grid container spacing={1}>
                                {AVAILABLE_ICONS.map(iconName => (
                                    <Grid size={{xs: 3, sm: 2}} key={iconName} sx={{textAlign: 'center'}}>
                                        <IconButton onClick={() => setSelectedIcon(iconName)}
                                                    sx={{
                                                        border: selectedIcon === iconName ? `2px solid ${selectedColor}` : '1px solid #ddd',
                                                        bgcolor: selectedIcon === iconName ? `${selectedColor}11` : 'transparent'
                                                    }}>
                                            <DynamicIcon name={iconName}
                                                         color={selectedIcon === iconName ? selectedColor : '#666'}/>
                                        </IconButton>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{p: 2}}>
                    <Button onClick={() => setOpenFormModal(false)} color="inherit">Hủy</Button>
                    <Button onClick={handleSave} variant="contained"
                            sx={{backgroundColor: "#2e7d32", "&:hover": {backgroundColor: "#1b5e20"}}}>
                        Lưu Danh Mục
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 4. MODAL XÁC NHẬN XÓA (Màu Đỏ #d32f2f) */}
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{backgroundColor: "#d32f2f", color: "white", fontWeight: "bold", textAlign: "center"}}>
                    Xác nhận xóa
                </DialogTitle>
                <DialogContent sx={{pt: 3, pb: 1, textAlign: 'center'}}>
                    <DialogContentText sx={{fontSize: '1.1rem'}}>
                        Bạn có chắc chắn muốn xóa danh mục <br/>
                        <strong style={{color: "#d32f2f"}}>{categoryToDelete?.name}</strong> không?
                    </DialogContentText>
                    <DialogContentText sx={{mt: 1, fontSize: '0.9rem', color: "text.secondary"}}>
                        Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{p: 2, justifyContent: "center", gap: 1}}>
                    <Button onClick={() => setOpenDeleteModal(false)} color="inherit" variant="outlined"
                            sx={{width: 100}}>
                        Hủy
                    </Button>
                    <Button onClick={confirmDelete} variant="contained" startIcon={<DeleteIcon/>}
                            sx={{width: 100, backgroundColor: "#d32f2f", "&:hover": {backgroundColor: "#b71c1c"}}}>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CategoryPage;