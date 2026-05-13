// src/components/Category/CategoryDeleteModal.tsx

import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    DialogContentText, Button
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type {Category} from '../../../types';

interface CategoryDeleteModalProps {
    open: boolean;
    onClose: () => void;
    category: Category | null;
    onConfirm: () => void;
}

const CategoryDeleteModal: React.FC<CategoryDeleteModalProps> = ({
                                                                     open,
                                                                     onClose,
                                                                     category,
                                                                     onConfirm
                                                                 }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{
                backgroundColor: "#d32f2f",
                color: "white",
                fontWeight: "bold",
                textAlign: "center"
            }}>
                Xác nhận xóa
            </DialogTitle>

            <DialogContent sx={{ pt: 3, pb: 1, textAlign: 'center' }}>
                <DialogContentText sx={{ fontSize: '1.1rem' }}>
                    Bạn có chắc chắn muốn xóa danh mục <br />
                    <strong style={{ color: "#d32f2f" }}>{category?.name}</strong> không?
                </DialogContentText>
                <DialogContentText sx={{ mt: 1, fontSize: '0.9rem', color: "text.secondary" }}>
                    Hành động này không thể hoàn tác.
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ p: 2, justifyContent: "center", gap: 1 }}>
                <Button onClick={onClose} color="inherit" variant="outlined" sx={{ width: 100 }}>
                    Hủy
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    sx={{
                        width: 100,
                        backgroundColor: "#d32f2f",
                        "&:hover": { backgroundColor: "#b71c1c" }
                    }}
                >
                    Xóa
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryDeleteModal;