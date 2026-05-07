import {useEffect, useState, useCallback, useRef} from "react";
import {
    Typography, Container, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Chip,
    Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Autocomplete, ToggleButton, ToggleButtonGroup, Box, Stack,
    FormControl, InputLabel, Select, MenuItem, TablePagination, Grid,
    Popover, Divider, Slider
} from "@mui/material";
import {LocalizationProvider, DateCalendar} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs from 'dayjs';

import api from "../services/api";
import type {Transaction, Category, PageResponse} from "../types/interface";
import * as React from "react";
import * as Icons from '@mui/icons-material';

const TransactionPage = () => {
    // === 1. STATE QUẢN LÝ DANH SÁCH & BỘ LỌC ===
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);

    const [filterKeyword, setFilterKeyword] = useState("");
    const [filterCategoryId, setFilterCategoryId] = useState<number | "ALL">("ALL");
    const [filterType, setFilterType] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");
    const [filterSort, setFilterSort] = useState<"desc" | "asc">("desc");

    // State cho ngày lọc
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    const [filterMinAmount, setFilterMinAmount] = useState("");
    const [filterMaxAmount, setFilterMaxAmount] = useState("");

    const isFirstRender = useRef(true);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // === 2. STATE QUẢN LÝ MODAL THÊM/SỬA ===
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [transactionType, setTransactionType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // State Modal tạo danh mục
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [categoryError, setCategoryError] = useState("");

    // State Modal Xác nhận Xóa
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

    // === XỬ LÝ DATE RANGE POPOVER ===
    const handleDateClick = (event: React.MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget);
    const handleDateClose = () => setAnchorEl(null);
    const displayDateRange = filterStartDate || filterEndDate
        ? `${filterStartDate ? dayjs(filterStartDate).format('DD/MM/YYYY') : '?'} - ${filterEndDate ? dayjs(filterEndDate).format('DD/MM/YYYY') : '?'}`
        : "";

    // 1. State cho Popover tiền
    const [priceAnchorEl, setPriceAnchorEl] = useState<HTMLDivElement | null>(null);

// 2. Định nghĩa giới hạn
    const MIN_LIMIT = 0;
    const MAX_LIMIT = 100000000; // 100 triệu

// 3. Hàm xử lý Slider (MUI Slider yêu cầu mảng [min, max])
    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        const [min, max] = newValue as number[];
        setFilterMinAmount(min.toString());
        setFilterMaxAmount(max.toString());
    };

// 4. Text hiển thị trên nút/ô nhập
    const displayPriceRange = (filterMinAmount || filterMaxAmount)
        ? `${Number(filterMinAmount || 0).toLocaleString()} - ${Number(filterMaxAmount || MAX_LIMIT).toLocaleString()} VNĐ`
        : "";

    // === 3. CÁC HÀM GỌI API ===
    const fetchTransactions = useCallback(async (
        keyword: string,
        categoryId: number | "ALL",
        type: string,
        currentPage: number,
        size: number,
        sortDir: string,
        startDate: string,
        endDate: string,
        minAm: string,
        maxAm: string
    ) => {
        try {
            const params: Record<string, string | number> = {
                page: currentPage,
                size: size,
                sort: `date,${sortDir}`
            };
            if (keyword.trim()) params.keyword = keyword.trim();
            if (categoryId !== "ALL") params.categoryId = categoryId;
            if (type !== "ALL") params.type = type;
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
            if (minAm) params.minAmount = minAm;
            if (maxAm) params.maxAmount = maxAm;

            const response = await api.get<PageResponse<Transaction>>("/transactions", {params});
            setTransactions(response.data.content);
            setTotalElements(response.data.totalElements);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await api.get<Category[]>("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchTransactions(
                filterKeyword,
                filterCategoryId,
                filterType,
                page,
                rowsPerPage,
                filterSort,
                filterStartDate,
                filterEndDate,
                filterMinAmount,
                filterMaxAmount
            );
        }, isFirstRender.current ? 0 : 300);

        isFirstRender.current = false;
        return () => clearTimeout(delaySearch);
    }, [
        filterKeyword,
        filterCategoryId,
        filterType,
        page,
        rowsPerPage,
        filterSort,
        filterStartDate,
        filterEndDate,
        filterMinAmount,
        filterMaxAmount,
        fetchTransactions
    ]);

    useEffect(() => {
        if (!open) {
            setErrors({});
        }
    }, [open]);

    // === 4. CÁC HÀM XỬ LÝ SỰ KIỆN ===
    const handleResetFilters = () => {
        setFilterKeyword("");
        setFilterCategoryId("ALL");
        setFilterType("ALL");
        setFilterSort("desc");
        setFilterStartDate("");
        setFilterEndDate("");
        setFilterMinAmount("");
        setFilterMaxAmount("");
        setPage(0);
    };

    // Hàm khi bấm "Thêm Giao Dịch" (Reset form)
    const handleOpenAdd = () => {
        setEditingId(null);
        setTitle("");
        setAmount("");
        setDate("");
        setNote("");
        setSelectedCategory(null);
        setTransactionType("EXPENSE");
        setErrors({});
        setOpen(true);
    };

    // Hàm khi click vào 1 dòng trên bảng (Đổ dữ liệu vào form)
    const handleRowClick = (tx: Transaction) => {
        setEditingId(tx.id);
        setTitle(tx.title);
        setAmount(Math.abs(tx.amount).toString()); // Loại bỏ dấu âm khi hiển thị vào ô nhập

        // Cắt lấy 10 ký tự đầu (YYYY-MM-DD) đề phòng API trả về kèm thời gian
        const dateString = tx.date.substring(0, 10);
        setDate(dateString);

        setNote(tx.note || "");
        setSelectedCategory(tx.category);
        setTransactionType(tx.amount >= 0 ? "INCOME" : "EXPENSE");
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setErrors({});
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // 1. Validate Title (@NotBlank)
        if (!title || !title.trim()) {
            newErrors.title = "Tiêu đề không được để trống";
        }

        // 2. Validate Amount (@NotNull & isAmountValid)
        const numAmount = Number(amount);
        if (!amount) {
            newErrors.amount = "Số tiền không được để trống";
        } else if (Math.abs(numAmount) < 1000) {
            newErrors.amount = "Số tiền tối thiểu phải là 1000 VNĐ";
        }

        // 3. Validate Category (@NotNull)
        if (!selectedCategory) {
            newErrors.category = "Danh mục không được để trống";
        }

        // 4. Validate Date (@NotNull & @PastOrPresent)
        if (!date) {
            newErrors.date = "Ngày tháng không được để trống";
        } else {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(23, 59, 59, 999); // Reset về cuối ngày để so sánh
            if (selectedDate > today) {
                newErrors.date = "Ngày giao dịch không được vượt quá hiện tại";
            }
        }

        // 5. Validate Note (@Size max 255)
        if (note && note.length > 255) {
            newErrors.note = "Ghi chú không được quá 255 ký tự";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
    };

    // Xử lý chung cho cả Thêm và Sửa
    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            const numericAmount = Math.abs(Number(amount));
            const finalAmount = transactionType === "EXPENSE" ? -numericAmount : numericAmount;

            if (!selectedCategory) {
                setErrors(prev => ({...prev, category: "Vui lòng chọn danh mục"}));
                return;
            }

            const transactionData = {
                title: title,
                amount: finalAmount,
                date: date,
                note: note,
                category: {id: selectedCategory.id}
            };

            if (editingId) {
                // Nếu có editingId => Gọi API Cập nhật (PUT)
                await api.put(`/transactions/${editingId}`, transactionData);
            } else {
                // Nếu không có editingId => Gọi API Tạo mới (POST)
                await api.post("/transactions", transactionData);
            }

            handleClose();
            setErrors({});
            await fetchTransactions(
                filterKeyword,
                filterCategoryId,
                filterType,
                page,
                rowsPerPage,
                filterSort,
                filterStartDate,
                filterEndDate,
                filterMinAmount,
                filterMaxAmount
            );
        } catch (error) {
            console.error("Lỗi khi lưu giao dịch:", error);
            alert("Có lỗi xảy ra khi lưu!");
        }
    };

    // Xử lý nút Xóa
    // Bấm nút Xóa ở form -> Mở Modal Xác nhận
    const handleDeleteClick = () => {
        setOpenConfirmDelete(true);
    };

    // Bấm nút "Xác nhận" trong Modal -> Gọi API xóa thật
    const executeDelete = async () => {
        if (!editingId) return;

        try {
            await api.delete(`/transactions/${editingId}`);
            setOpenConfirmDelete(false); // Đóng modal xác nhận
            handleClose();               // Đóng modal form sửa
            fetchTransactions(
                filterKeyword,
                filterCategoryId,
                filterType,
                page,
                rowsPerPage,
                filterSort,
                filterStartDate,
                filterEndDate,
                filterMinAmount,
                filterMaxAmount
            );
        } catch (error) {
            console.error("Lỗi khi xóa giao dịch:", error);
            alert("Không thể xóa giao dịch này!");
        }
    };

    const handleSaveQuickCategory = async () => {
        if (!newCategoryName || !newCategoryName.trim()) {
            setCategoryError("Tên danh mục không được để trống");
            return;
        }

        try {
            const response = await api.post<Category>("/categories", {name: newCategoryName});
            const createdCategory = response.data;

            setCategories([...categories, createdCategory]);
            setSelectedCategory(createdCategory);
            setOpenCategoryModal(false);
            setNewCategoryName("");
            setCategoryError("");

        } catch (error) {
            console.error("Lỗi khi tạo danh mục nhanh:", error);
            alert("Không thể tạo danh mục lúc này!");
        }
    };

    // === 5. CÁC HÀM FORMAT HIỂN THỊ ===
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + " VNĐ";
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const d = new Date(dateString);
        return d.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container sx={{mt: 4, mb: 4}}>
                {/* Tiêu đề & Nút Thêm */}
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}>
                    <Typography variant="h4" sx={{fontWeight: "bold"}}>
                        Quản lý Giao dịch
                    </Typography>
                    <Button variant="contained" color="success" startIcon={<AddIcon/>} onClick={handleOpenAdd}>
                        Thêm giao dịch
                    </Button>
                </Box>

                {/* THANH BỘ LỌC (FILTERS) */}
                <Paper sx={{p: 2, mb: 3, backgroundColor: "#fbfbfb"}} elevation={1}>
                    <Stack spacing={2.5}>
                        {/* HÀNG TRÊN: Thanh tìm kiếm chiếm toàn bộ, Nút làm mới ở cuối */}
                        <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                            <TextField
                                label="Tìm theo tiêu đề hoặc ghi chú..."
                                variant="outlined"
                                size="small"
                                sx={{flexGrow: 1}}
                                value={filterKeyword}
                                onChange={(e) => setFilterKeyword(e.target.value)}
                            />
                            <Button
                                variant="outlined"
                                color="inherit"
                                startIcon={<RefreshIcon/>}
                                onClick={handleResetFilters}
                                sx={{
                                    minWidth: 120,
                                    height: 40,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Làm mới
                            </Button>
                        </Box>

                        {/* HÀNG DƯỚI: Sử dụng Grid để tự động căn lề chuẩn xác */}
                        <Grid container spacing={2}>
                            <Grid size={{xs: 12, sm: 6, md: 2}}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel>Danh mục</InputLabel>
                                    <Select
                                        value={filterCategoryId}
                                        label="Danh mục"
                                        onChange={(e) => setFilterCategoryId(e.target.value as number | "ALL")}
                                    >
                                        <MenuItem value="ALL"><em>Tất cả</em></MenuItem>
                                        {categories.map((cat) => (
                                            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{xs: 6, sm: 3, md: 1.5}}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel>Loại</InputLabel>
                                    <Select
                                        value={filterType}
                                        label="Loại"
                                        onChange={(e) => setFilterType(e.target.value as "ALL" | "INCOME" | "EXPENSE")}
                                    >
                                        <MenuItem value="ALL"><em>Tất cả</em></MenuItem>
                                        <MenuItem value="INCOME">Khoản Thu</MenuItem>
                                        <MenuItem value="EXPENSE">Khoản Chi</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{xs: 6, sm: 3, md: 1.5}}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel>Sắp xếp</InputLabel>
                                    <Select
                                        value={filterSort}
                                        label="Sắp xếp"
                                        onChange={(e) => setFilterSort(e.target.value as "asc" | "desc")}
                                    >
                                        <MenuItem value="desc">Mới nhất</MenuItem>
                                        <MenuItem value="asc">Cũ nhất</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{xs: 12, sm: 12, md: 3.5}}>
                                <TextField
                                    label="Khoảng thời gian"
                                    size="small" fullWidth
                                    value={displayDateRange}
                                    onClick={handleDateClick}
                                    placeholder="Chọn ngày bắt đầu - kết thúc"
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                            startAdornment: <CalendarMonthIcon sx={{mr: 1, color: 'action.active'}}/>,
                                            sx: {cursor: 'pointer'}
                                        },
                                        htmlInput: {sx: {cursor: 'pointer'}}
                                    }}
                                />
                                <Popover
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={handleDateClose}
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                                >
                                    <Box sx={{p: 2}}>
                                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}
                                               divider={<Divider orientation="vertical" flexItem/>}>
                                            <Box>
                                                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>TỪ NGÀY</Typography>
                                                <DateCalendar
                                                    value={filterStartDate ? dayjs(filterStartDate) : null}
                                                    onChange={(val) => setFilterStartDate(val?.format('YYYY-MM-DD') || "")}
                                                />
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>ĐẾN NGÀY</Typography>
                                                <DateCalendar
                                                    value={filterEndDate ? dayjs(filterEndDate) : null}
                                                    minDate={filterStartDate ? dayjs(filterStartDate) : undefined}
                                                    onChange={(val) => setFilterEndDate(val?.format('YYYY-MM-DD') || "")}
                                                />
                                            </Box>
                                        </Stack>
                                        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 1}}>
                                            <Button size="small" color="error" onClick={() => {
                                                setFilterStartDate("");
                                                setFilterEndDate("");
                                            }}>Xóa lọc</Button>
                                            <Button size="small" variant="contained" color="success"
                                                    onClick={handleDateClose}>Áp dụng</Button>
                                        </Box>
                                    </Box>
                                </Popover>
                            </Grid>

                            {/* BỘ LỌC GIÁ GỘP */}
                            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                                <TextField
                                    label="Khoảng giá (VNĐ)"
                                    size="small" fullWidth
                                    value={displayPriceRange}
                                    onClick={(e) => setPriceAnchorEl(e.currentTarget)}
                                    placeholder="Tất cả khoảng giá"
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                            startAdornment: <Icons.Paid sx={{ mr: 1, color: 'action.active' }} />,
                                            sx: { cursor: 'pointer' }
                                        },
                                        htmlInput: { sx: { cursor: 'pointer' } }
                                    }}
                                />
                                <Popover
                                    open={Boolean(priceAnchorEl)}
                                    anchorEl={priceAnchorEl}
                                    onClose={() => setPriceAnchorEl(null)}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                    PaperProps={{ sx: { p: 3, width: 350 } }}
                                >
                                    <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 'bold' }}>
                                        Chọn khoảng giá (VNĐ)
                                    </Typography>

                                    {/* Thanh kéo Slider 2 núm */}
                                    <Box sx={{ px: 2, mb: 3 }}>
                                        <Slider
                                            value={[Number(filterMinAmount) || 0, Number(filterMaxAmount) || MAX_LIMIT]}
                                            onChange={handleSliderChange}
                                            valueLabelDisplay="auto"
                                            min={MIN_LIMIT}
                                            max={MAX_LIMIT}
                                            step={1000000} // Bước nhảy 100k
                                            sx={{ color: '#2e7d32' }}
                                        />
                                    </Box>

                                    {/* 2 Ô nhập liệu bên dưới */}
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <TextField
                                            label="Tối thiểu"
                                            size="small"
                                            type="number"
                                            value={filterMinAmount}
                                            onChange={(e) => setFilterMinAmount(e.target.value)}
                                            onBlur={() => {
                                                // Tránh trường hợp nhập min > max
                                                if (Number(filterMinAmount) > Number(filterMaxAmount) && filterMaxAmount)
                                                    setFilterMinAmount(filterMaxAmount);
                                            }}
                                        />
                                        <Typography>-</Typography>
                                        <TextField
                                            label="Tối đa"
                                            size="small"
                                            type="number"
                                            value={filterMaxAmount}
                                            onChange={(e) => setFilterMaxAmount(e.target.value)}
                                        />
                                    </Stack>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                                        <Button size="small" color="inherit" onClick={() => {
                                            setFilterMinAmount("");
                                            setFilterMaxAmount("");
                                        }}>Xóa lọc</Button>
                                        <Button size="small" variant="contained" color="success"
                                                onClick={() => setPriceAnchorEl(null)}>Áp dụng</Button>
                                    </Box>
                                </Popover>
                            </Grid>
                        </Grid>
                    </Stack>
                </Paper>

                {/* BẢNG DỮ LIỆU */}
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead sx={{backgroundColor: "#f5f5f5"}}>
                            <TableRow>
                                <TableCell><b>STT</b></TableCell>
                                <TableCell><b>Tiêu đề</b></TableCell>
                                <TableCell><b>Danh mục</b></TableCell>
                                <TableCell><b>Ngày</b></TableCell>
                                <TableCell align="right"><b>Số tiền</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((tx, index) => (
                                <TableRow
                                    key={tx.id}
                                    hover
                                    onClick={() => handleRowClick(tx)}
                                    sx={{cursor: "pointer"}}
                                >
                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>
                                        <Typography variant="body1">{tx.title}</Typography>
                                        {tx.note &&
                                            <Typography variant="caption" color="text.secondary">{tx.note}</Typography>}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={tx.category?.name || "N/A"}
                                            size="small"
                                            sx={{
                                                backgroundColor: tx.category?.color ? `${tx.category.color}22` : "#eeeeee",
                                                color: tx.category?.color || "#666",
                                                fontWeight: "bold",
                                                border: `1px solid ${tx.category?.color || "#ddd"}`
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{formatDate(tx.date)}</TableCell>
                                    <TableCell align="right" sx={{
                                        color: tx.amount > 0 ? "success.main" : "error.main",
                                        fontWeight: "bold"
                                    }}>
                                        {tx.amount > 0 ? "+" : ""}{formatCurrency(tx.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {transactions.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{py: 3}}>
                                        Không tìm thấy giao dịch nào phù hợp!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalElements}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(_e, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        labelRowsPerPage="Số dòng mỗi trang:"
                    />
                </TableContainer>

                {/* MODAL THÊM/SỬA GIAO DỊCH */}
                <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: "#2e7d32",
                        color: "white"
                    }}>
                        {/* Đổi tiêu đề Modal dựa trên trạng thái editingId */}
                        {editingId ? "Chỉnh sửa Giao Dịch" : "Thêm Giao Dịch Mới"}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={3} sx={{mt: 1}}>
                            <Box sx={{display: "flex", justifyContent: "center"}}>
                                <ToggleButtonGroup
                                    color={transactionType === "INCOME" ? "success" : "error"}
                                    value={transactionType}
                                    exclusive
                                    onChange={(_, newValue) => {
                                        if (newValue) setTransactionType(newValue);
                                    }}
                                >
                                    <ToggleButton value="EXPENSE" sx={{px: 4, fontWeight: "bold"}}>Khoản
                                        Chi</ToggleButton>
                                    <ToggleButton value="INCOME" sx={{px: 4, fontWeight: "bold"}}>Khoản
                                        Thu</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            <TextField
                                label="Tiêu đề giao dịch"
                                fullWidth
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (errors.title) setErrors(prev => ({...prev, title: ""}));
                                }}
                                slotProps={{
                                    htmlInput: {
                                        maxLength: 50,
                                    },
                                }}
                                error={!!errors.title}
                                helperText={errors.title}
                                required
                            />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Số tiền"
                                    type="number"
                                    fullWidth
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                        if (errors.amount) setErrors(prev => ({...prev, amount: ""}));
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
                                        if (errors.date) setErrors(prev => ({...prev, date: ""}));
                                    }}
                                    error={!!errors.date}
                                    helperText={errors.date}
                                    required
                                />
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                                <Autocomplete
                                    sx={{flexGrow: 1}}
                                    options={categories}
                                    getOptionLabel={(option) => option.name}
                                    value={selectedCategory}
                                    onChange={(_, newValue) => {
                                        setSelectedCategory(newValue);
                                        if (errors.category) setErrors(prev => ({...prev, category: ""}));
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
                                <Button variant="outlined" color="primary" sx={{
                                    height: 56,
                                    minWidth: 56,
                                    color: "#2e7d32",
                                    borderColor: "#2e7d32",
                                    "&:hover": {
                                        borderColor: "#1b5e20",
                                        backgroundColor: "rgba(46, 125, 50, 0.04)"
                                    }
                                }}
                                        onClick={() => setOpenCategoryModal(true)}>
                                    <AddIcon/>
                                </Button>
                            </Stack>
                            <TextField
                                label="Ghi chú (Tùy chọn)"
                                multiline
                                rows={2}
                                fullWidth
                                value={note}
                                onChange={(e) => {
                                    setNote(e.target.value);
                                    if (errors.note) setErrors(prev => ({...prev, note: ""}));
                                }}
                                slotProps={{
                                    htmlInput: {
                                        maxLength: 255,
                                    },
                                }}
                                error={!!errors.note}
                                helperText={errors.note}
                            />
                        </Stack>
                    </DialogContent>

                    {/* Khu vực nút bấm trong Modal */}
                    <DialogActions sx={{p: 2, justifyContent: "space-between"}}>
                        {/* Chỉ hiển thị nút Xóa nếu đang ở chế độ Chỉnh sửa */}
                        {editingId ? (
                            <Button
                                onClick={handleDeleteClick}
                                variant="contained"
                                sx={{
                                    width: 100,
                                    backgroundColor: "#d32f2f",
                                    "&:hover": {
                                        backgroundColor: "#b71c1c"
                                    }
                                }}
                            >
                                Xóa
                            </Button>
                        ) : (
                            <Box/> /* Thẻ rỗng để giữ layout cân đối dùng space-between */
                        )}

                        <Box sx={{display: 'flex', gap: 2}}>
                            <Button onClick={handleClose} color="inherit" variant="outlined"
                                    sx={{width: 100}}>Hủy</Button>
                            <Button onClick={handleSave} color="success" variant="contained"
                                    sx={{width: 100}}>Lưu</Button>
                        </Box>
                    </DialogActions>
                </Dialog>

                {/* MODAL TẠO DANH MỤC NHANH */}
                <Dialog open={openCategoryModal} onClose={() => setOpenCategoryModal(false)} maxWidth="xs" fullWidth>
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
                                htmlInput: {
                                    maxLength: 30,
                                },
                            }}
                            error={!!categoryError}
                            helperText={categoryError}
                            sx={{mt: 1}}
                            required
                        />
                    </DialogContent>
                    <DialogActions sx={{p: 2}}>
                        <Button onClick={() => setOpenCategoryModal(false)} color="inherit">
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSaveQuickCategory}
                            variant="contained"
                            sx={{
                                backgroundColor: "#2e7d32",
                                "&:hover": {
                                    backgroundColor: "#1b5e20"
                                }
                            }}
                        >
                            Tạo
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* MODAL XÁC NHẬN XÓA */}
                <Dialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)} maxWidth="xs" fullWidth>
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
                        <Button onClick={() => setOpenConfirmDelete(false)} color="inherit" variant="outlined">
                            Hủy
                        </Button>
                        <Button onClick={executeDelete} color="error" variant="contained">
                            Đồng ý Xóa
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </LocalizationProvider>
    );
};

export default TransactionPage;