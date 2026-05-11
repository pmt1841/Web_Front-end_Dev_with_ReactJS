// src/components/Dashboard/BudgetSettingModal.tsx

import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Box, Typography, CircularProgress, Stack, Alert
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

interface BudgetSettingModalProps {
    open: boolean;
    onClose: () => void;
    currentLimit: number;
    onSave: (newLimit: number) => Promise<void>;
    isLoading?: boolean;
}

const BudgetSettingModal: React.FC<BudgetSettingModalProps> = ({
                                                                     open,
                                                                     onClose,
                                                                     currentLimit,
                                                                     onSave
                                                                 }) => {
    const [limitInput, setLimitInput] = useState(currentLimit.toString());
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (open) {
            setLimitInput(currentLimit.toString());
            setError("");
        }
    }, [open, currentLimit]);

    const handleClose = () => {
        setError("");
        setIsSaving(false);
        onClose();
    };

    const validateInput = (): boolean => {
        const value = Number(limitInput);

        if (!limitInput.trim()) {
            setError("Vui lòng nhập giới hạn chi tiêu");
            return false;
        }

        if (isNaN(value)) {
            setError("Giới hạn phải là một số");
            return false;
        }

        if (value <= 0) {
            setError("Giới hạn phải lớn hơn 0");
            return false;
        }

        if (value > 10000000000) {
            setError("Giới hạn không được vượt quá 10 tỷ VNĐ");
            return false;
        }

        setError("");
        return true;
    };

    const handleSave = async () => {
        if (!validateInput()) return;

        setIsSaving(true);
        try {
            await onSave(Number(limitInput));
            handleClose();
        } catch (err) {
            console.error("Lỗi lưu cài đặt:", err);
            setError("Lỗi khi lưu cài đặt. Vui lòng thử lại!");
        } finally {
            setIsSaving(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN');
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{
                backgroundColor: "#2e7d32",
                color: "white",
                fontWeight: "bold",
                textAlign: "center"
            }}>
                Cài đặt Giới hạn Chi tiêu
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    {/* Hiển thị giới hạn hiện tại */}
                    <Box sx={{
                        p: 2,
                        bgcolor: "#f5f5f5",
                        borderRadius: 1,
                        border: "1px solid #e0e0e0"
                    }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                            Giới hạn hiện tại
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2e7d32", mt: 0.5 }}>
                            {formatCurrency(currentLimit)} VNĐ
                        </Typography>
                    </Box>

                    {/* Input mới */}
                    <TextField
                        label="Giới hạn chi tiêu hàng tháng"
                        type="number"
                        fullWidth
                        value={limitInput}
                        onChange={(e) => {
                            setLimitInput(e.target.value);
                            setError("");
                        }}
                        slotProps={{
                            htmlInput: { min: 0, step: 100000 }
                        }}
                        error={!!error}
                        helperText={error}
                        disabled={isSaving}
                        autoFocus
                    />

                    {/* Helper text */}
                    <Box sx={{ p: 1.5, bgcolor: "#e8f5e9", borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ color: "#2e7d32", fontWeight: 500 }}>
                            💡 Mẹo: Nhập số tiền bạn muốn dành cho chi tiêu mỗi tháng.
                            <br />
                        </Typography>
                    </Box>

                    {/* Error Alert */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 1 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Preview */}
                    {!error && limitInput && Number(limitInput) > 0 && (
                        <Box sx={{
                            p: 1.5,
                            bgcolor: "#e3f2fd",
                            borderRadius: 1,
                            border: "1px solid #bbdefb"
                        }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                Giới hạn sẽ được cập nhật thành
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: "bold", color: "#1976d2", mt: 0.5 }}>
                                {formatCurrency(Number(limitInput))} VNĐ
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2, justifyContent: "flex-end", gap: 1 }}>
                <Button
                    onClick={handleClose}
                    color="inherit"
                    variant="outlined"
                    disabled={isSaving}
                    sx={{ width: 100 }}
                >
                    Hủy
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    disabled={isSaving}
                    sx={{
                        width: 140,
                        backgroundColor: "#2e7d32",
                        "&:hover": { backgroundColor: "#1b5e20" },
                        "&:disabled": { backgroundColor: "#bdbdbd" }
                    }}
                >
                    {isSaving ? "Đang lưu..." : "Lưu cài đặt"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BudgetSettingModal;