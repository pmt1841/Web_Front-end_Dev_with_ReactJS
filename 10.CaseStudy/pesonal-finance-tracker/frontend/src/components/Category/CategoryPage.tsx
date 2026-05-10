import {useState, useEffect, useCallback} from "react";
import {
    Typography, Container, Box, Button, Tabs, Tab,
    Grid, CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import api from "../../services/api";
import type { Category } from "../../types/interface";
import {CategoryCard, CategoryFormModal, CategoryDeleteModal} from "../Category";

const CategoryPage = () => {
    // === 1. STATE QUẢN LÝ DANH SÁCH ===
    const [tabIndex, setTabIndex] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // === 2. STATE MODAL THÊM/SỬA ===
    const [openFormModal, setOpenFormModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [name, setName] = useState("");
    const [type, setType] = useState<"EXPENSE" | "INCOME">("EXPENSE");
    const [selectedIcon, setSelectedIcon] = useState("Category");
    const [selectedColor, setSelectedColor] = useState("#4caf50");

    // === 3. STATE MODAL XÓA ===
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    // === 4. HÀM GỌI API ===
    const fetchCategories = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // === 5. HÀM XỬ LÝ FORM ===
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

        const payload = {
            name,
            transactionType: type,
            icon: selectedIcon,
            color: selectedColor
        };

        try {
            if (editingCategory) {
                await api.put(`/categories/${editingCategory.id}`, payload);
            } else {
                await api.post("/categories", payload);
            }
            setOpenFormModal(false);
            await fetchCategories();
        } catch (err) {
            console.error("Lỗi lưu danh mục:", err);
            alert("Lỗi khi lưu danh mục!");
        }
    };

    // === 6. HÀM XỬ LÝ XÓA ===
    const handleDeleteClick = (cat: Category) => {
        setCategoryToDelete(cat);
        setOpenDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!categoryToDelete) return;

        try {
            await api.delete(`/categories/${categoryToDelete.id}`);
            setOpenDeleteModal(false);
            await fetchCategories();
        } catch (err) {
            console.error("Lỗi xóa danh mục:", err);
            alert("Không thể xóa danh mục này (có thể do đã có giao dịch sử dụng).");
        }
    };

    // === 7. LỌC DỮ LIỆU ===
    const filteredCategories = categories.filter(cat =>
        tabIndex === 0 ? cat.transactionType === "EXPENSE" : cat.transactionType === "INCOME"
    );

    return (
        <Container maxWidth="lg">
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Quản lý Danh Mục
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                    sx={{ backgroundColor: "#2e7d32", "&:hover": { backgroundColor: "#1b5e20" } }}
                >
                    Thêm Danh Mục
                </Button>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                    value={tabIndex}
                    onChange={(_, val) => setTabIndex(val)}
                    sx={{
                        '& .MuiTab-root': { fontWeight: 'bold' },
                        '& .Mui-selected': { color: tabIndex === 0 ? '#d32f2f !important' : '#2e7d32 !important' },
                        '& .MuiTabs-indicator': { backgroundColor: tabIndex === 0 ? '#d32f2f' : '#2e7d32' }
                    }}
                >
                    <Tab label="Khoản Chi" />
                    <Tab label="Khoản Thu" />
                </Tabs>
            </Box>

            {/* Danh sách Thẻ */}
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredCategories.map((category) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
                            <CategoryCard
                                category={category}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                            />
                        </Grid>
                    ))}
                    {filteredCategories.length === 0 && (
                        <Grid size={12}>
                            <Typography color="text.secondary" sx={{ py: 5, textAlign: "center" }}>
                                Chưa có danh mục nào trong mục này.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            )}

            {/* MODAL THÊM / SỬA */}
            <CategoryFormModal
                open={openFormModal}
                onClose={() => setOpenFormModal(false)}
                editingCategory={editingCategory}
                name={name}
                setName={setName}
                type={type}
                setType={setType}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                onSave={handleSave}
            />

            {/* MODAL XÓA */}
            <CategoryDeleteModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                category={categoryToDelete}
                onConfirm={confirmDelete}
            />
        </Container>
    );
};

export default CategoryPage;

