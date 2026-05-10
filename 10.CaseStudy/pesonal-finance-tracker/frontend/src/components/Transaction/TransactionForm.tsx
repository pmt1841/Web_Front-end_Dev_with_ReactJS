// src/components/Transaction/TransactionForm.tsx

import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Autocomplete, ToggleButton, ToggleButtonGroup,
    Box, Stack, Button
} from '@mui/material';
import {Add as AddIcon} from '@mui/icons-material';
import type {Category} from '../../types/interface';

interface TransactionFormProps {
    open: boolean;
    onClose: () => void;
    editingId: number | null;

    // Form states
    transactionType: "INCOME" | "EXPENSE";
    setTransactionType: (type: "INCOME" | "EXPENSE") => void;
    title: string;
    setTitle: (title: string) => void;
    amount: string;
    setAmount: (amount: string) => void;
    date: string;
    setDate: (date: string) => void;
    note: string;
    setNote: (note: string) => void;
    selectedCategory: Category | null;
    setSelectedCategory: (category: Category | null) => void;

    // Other props
    categories: Category[];
    errors: Record<string, string>;
    onSave: () => void;
    onDelete: () => void;
    onOpenCategoryModal: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
                                                             open,
                                                             onClose,
                                                             editingId,
                                                             transactionType,
                                                             setTransactionType,
                                                             title,
                                                             setTitle,
                                                             amount,
                                                             setAmount,
                                                             date,
                                                             setDate,
                                                             note,
                                                             setNote,
                                                             selectedCategory,
                                                             setSelectedCategory,
                                                             categories,
                                                             errors,
                                                             onSave,
                                                             onDelete,
                                                             onOpenCategoryModal
                                                         }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{
                fontWeight: "bold",
                textAlign: "center",
                backgroundColor: "#2e7d32",
                color: "white"
            }}>
                {editingId ? "Chỉnh sửa Giao Dịch" : "Thêm Giao Dịch Mới"}
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={3} sx={{mt: 1}}>
                    {/* Transaction Type Toggle */}
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <ToggleButtonGroup
                            color={transactionType === "INCOME" ? "success" : "error"}
                            value={transactionType}
                            exclusive
                            onChange={(_, newValue) => {
                                if (newValue) setTransactionType(newValue);
                            }}
                        >
                            <ToggleButton value="EXPENSE" sx={{px: 4, fontWeight: "bold"}}>
                                Khoản Chi
                            </ToggleButton>
                            <ToggleButton value="INCOME" sx={{px: 4, fontWeight: "bold"}}>
                                Khoản Thu
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {/* Title Field */}
                    <TextField
                        label="Tiêu đề giao dịch"
                        fullWidth
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (errors.title) {
                                // Clear error when user starts typing
                                const newErrors = {...errors};
                                delete newErrors.title;
                                // Note: You might need to pass setErrors as prop
                            }
                        }}
                        slotProps={{
                            htmlInput: {maxLength: 50}
                        }}
                        error={!!errors.title}
                        helperText={errors.title}
                        required
                    />

                    {/* Amount and Date Fields */}
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Số tiền"
                            type="number"
                            fullWidth
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                if (errors.amount) {
                                    const newErrors = {...errors};
                                    delete newErrors.amount;
                                }
                            }}
                            error={!!errors.amount}
                            helperText={errors.amount}
                            required
                        />
                        <TextField
                            label="Ngày thực hiện"
                            type="date"
                            fullWidth
                            slotProps={{inputLabel: {shrink: true}}}
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                if (errors.date) {
                                    const newErrors = {...errors};
                                    delete newErrors.date;
                                }
                            }}
                            error={!!errors.date}
                            helperText={errors.date}
                            required
                        />
                    </Stack>

                    {/* Category Selection */}
                    <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                        <Autocomplete
                            sx={{flexGrow: 1}}
                            options={categories}
                            getOptionLabel={(option) => option.name}
                            value={selectedCategory}
                            onChange={(_, newValue) => {
                                setSelectedCategory(newValue);
                                if (errors.category) {
                                    const newErrors = {...errors};
                                    delete newErrors.category;
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn danh mục"
                                    required
                                    error={!!errors.category}
                                    helperText={errors.category}
                                />
                            )}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                                height: 56,
                                minWidth: 56,
                                color: "#2e7d32",
                                borderColor: "#2e7d32",
                                "&:hover": {
                                    borderColor: "#1b5e20",
                                    backgroundColor: "rgba(46, 125, 50, 0.04)"
                                }
                            }}
                            onClick={onOpenCategoryModal}
                        >
                            <AddIcon/>
                        </Button>
                    </Stack>

                    {/* Note Field */}
                    <TextField
                        label="Ghi chú (Tùy chọn)"
                        multiline
                        rows={2}
                        fullWidth
                        value={note}
                        onChange={(e) => {
                            setNote(e.target.value);
                            if (errors.note) {
                                const newErrors = {...errors};
                                delete newErrors.note;
                            }
                        }}
                        slotProps={{
                            htmlInput: {maxLength: 255}
                        }}
                        error={!!errors.note}
                        helperText={errors.note}
                    />
                </Stack>
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions sx={{p: 2, justifyContent: "space-between"}}>
                {editingId ? (
                    <Button
                        onClick={onDelete}
                        variant="contained"
                        sx={{
                            width: 100,
                            backgroundColor: "#d32f2f",
                            "&:hover": {backgroundColor: "#b71c1c"}
                        }}
                    >
                        Xóa
                    </Button>
                ) : (
                    <Box/> // Empty box for layout balance
                )}

                <Box sx={{display: 'flex', gap: 2}}>
                    <Button onClick={onClose} color="inherit" variant="outlined" sx={{width: 100}}>
                        Hủy
                    </Button>
                    <Button onClick={onSave} color="success" variant="contained" sx={{width: 100}}>
                        Lưu
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default TransactionForm;