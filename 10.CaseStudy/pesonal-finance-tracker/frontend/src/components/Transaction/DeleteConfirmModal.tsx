// src/components/Transaction/DeleteConfirmModal.tsx

import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography
} from '@mui/material';

interface DeleteConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
                                                                   open,
                                                                   onClose,
                                                                   onConfirm
                                                               }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle
                sx={{
                    fontWeight: "bold",
                    backgroundColor: "#d32f2f",
                    color: "white",
                    textAlign: "center"
                }}
            >
                Xác nhận xóa
            </DialogTitle>

            <DialogContent dividers>
                <Typography>
                    Bạn có chắc chắn muốn xóa giao dịch này? Hành động này không thể hoàn tác.
                </Typography>
            </DialogContent>

            <DialogActions sx={{p: 2}}>
                <Button onClick={onClose} color="inherit" variant="outlined">
                    Hủy
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Đồng ý Xóa
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmModal;