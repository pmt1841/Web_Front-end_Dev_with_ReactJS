// src/components/Category/CategoryFormModal.tsx

import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, ToggleButton, ToggleButtonGroup, Box, Stack, Button
} from '@mui/material';
import type {Category} from '../../types/interface';
import {ColorPicker, IconPicker} from '../Category';

interface CategoryFormModalProps {
    open: boolean;
    onClose: () => void;
    editingCategory: Category | null;
    name: string;
    setName: (name: string) => void;
    type: "EXPENSE" | "INCOME";
    setType: (type: "EXPENSE" | "INCOME") => void;
    selectedIcon: string;
    setSelectedIcon: (icon: string) => void;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    onSave: () => void;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
                                                                 open,
                                                                 onClose,
                                                                 editingCategory,
                                                                 name,
                                                                 setName,
                                                                 type,
                                                                 setType,
                                                                 selectedIcon,
                                                                 setSelectedIcon,
                                                                 selectedColor,
                                                                 setSelectedColor,
                                                                 onSave
                                                             }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{
                backgroundColor: "#2e7d32",
                color: "white",
                fontWeight: "bold",
                textAlign: 'center'
            }}>
                {editingCategory ? "Chỉnh Sửa Danh Mục" : "Thêm Danh Mục Mới"}
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    {/* Type Toggle */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ToggleButtonGroup
                            color={type === "INCOME" ? "success" : "error"}
                            value={type}
                            exclusive
                            onChange={(_, val) => val && setType(val)}
                        >
                            <ToggleButton value="EXPENSE" sx={{ px: 4, fontWeight: 'bold' }}>
                                Khoản Chi
                            </ToggleButton>
                            <ToggleButton value="INCOME" sx={{ px: 4, fontWeight: 'bold' }}>
                                Khoản Thu
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {/* Name Field */}
                    <TextField
                        label="Tên danh mục"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        slotProps={{
                            htmlInput: { maxLength: 30 }
                        }}
                        required
                    />

                    {/* Color Picker */}
                    <ColorPicker
                        selectedColor={selectedColor}
                        onSelectColor={setSelectedColor}
                    />

                    {/* Icon Picker */}
                    <IconPicker
                        selectedIcon={selectedIcon}
                        selectedColor={selectedColor}
                        onSelectIcon={setSelectedIcon}
                    />
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Hủy
                </Button>
                <Button
                    onClick={onSave}
                    variant="contained"
                    sx={{
                        backgroundColor: "#2e7d32",
                        "&:hover": { backgroundColor: "#1b5e20" }
                    }}
                >
                    Lưu Danh Mục
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryFormModal;