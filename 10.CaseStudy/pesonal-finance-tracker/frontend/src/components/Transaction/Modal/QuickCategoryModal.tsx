// src/components/Transaction/QuickCategoryModal.tsx

import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button
} from '@mui/material';

interface QuickCategoryModalProps {
    open: boolean;
    onClose: () => void;
    newCategoryName: string;
    setNewCategoryName: (name: string) => void;
    categoryError: string;
    setCategoryError: (error: string) => void;
    onSave: () => void;
}

const QuickCategoryModal: React.FC<QuickCategoryModalProps> = ({
                                                                   open,
                                                                   onClose,
                                                                   newCategoryName,
                                                                   setNewCategoryName,
                                                                   categoryError,
                                                                   setCategoryError,
                                                                   onSave
                                                               }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle
                sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    backgroundColor: "#2e7d32",
                    color: "white"
                }}
            >
                Tạo Danh Mục Nhanh
            </DialogTitle>

            <DialogContent dividers>
                <TextField
                    autoFocus
                    label="Tên danh mục mới"
                    fullWidth
                    value={newCategoryName}
                    onChange={(e) => {
                        setNewCategoryName(e.target.value);
                        if (categoryError) setCategoryError("");
                    }}
                    slotProps={{
                        htmlInput: {maxLength: 30}
                    }}
                    error={!!categoryError}
                    helperText={categoryError}
                    sx={{mt: 1}}
                    required
                />
            </DialogContent>

            <DialogActions sx={{p: 2}}>
                <Button onClick={onClose} color="inherit">
                    Hủy
                </Button>
                <Button
                    onClick={onSave}
                    variant="contained"
                    sx={{
                        backgroundColor: "#2e7d32",
                        "&:hover": {backgroundColor: "#1b5e20"}
                    }}
                >
                    Tạo
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuickCategoryModal;