// src/pages/TransactionPage.tsx

import {useEffect, useState, useCallback, useRef} from "react";
import {Typography, Container, Button, Box} from "@mui/material";
import {Add as AddIcon} from '@mui/icons-material';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

import api from "../../services/api";
import type {Transaction, Category, PageResponse} from "../../types";
import {
    FilterBar,
    TransactionTable,
    TransactionForm,
    DeleteConfirmModal,
    QuickCategoryModal
} from "../../components/Transaction";

const TransactionPage = () => {
    // === 1. STATE QUẢN LÝ DANH SÁCH & BỘ LỌC ===
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);

    const [filterKeyword, setFilterKeyword] = useState("");
    const [filterCategoryId, setFilterCategoryId] = useState<number | "ALL">("ALL");
    const [filterType, setFilterType] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");
    const [filterSort, setFilterSort] = useState<"desc" | "asc">("desc");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");
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
            alert("Không thể tải dữ liệu danh sách danh mục")
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

    const handleRowClick = (tx: Transaction) => {
        setEditingId(tx.id);
        setTitle(tx.title);
        setAmount(Math.abs(tx.amount).toString());
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

        if (!title || !title.trim()) {
            newErrors.title = "Tiêu đề không được để trống";
        }

        const numAmount = Number(amount);
        if (!amount) {
            newErrors.amount = "Số tiền không được để trống";
        } else if (Math.abs(numAmount) < 1000) {
            newErrors.amount = "Số tiền tối thiểu phải là 1000 VNĐ";
        }

        if (!selectedCategory) {
            newErrors.category = "Danh mục không được để trống";
        }

        if (!date) {
            newErrors.date = "Ngày tháng không được để trống";
        } else {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            if (selectedDate > today) {
                newErrors.date = "Ngày giao dịch không được vượt quá hiện tại";
            }
        }

        if (note && note.length > 255) {
            newErrors.note = "Ghi chú không được quá 255 ký tự";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
                await api.put(`/transactions/${editingId}`, transactionData);
            } else {
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

    const handleDeleteClick = () => {
        setOpenConfirmDelete(true);
    };

    const executeDelete = async () => {
        if (!editingId) return;

        try {
            await api.delete(`/transactions/${editingId}`);
            setOpenConfirmDelete(false);
            handleClose();
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

                {/* THANH BỘ LỌC */}
                <FilterBar
                    filterKeyword={filterKeyword}
                    setFilterKeyword={setFilterKeyword}
                    filterCategoryId={filterCategoryId}
                    setFilterCategoryId={setFilterCategoryId}
                    filterType={filterType}
                    setFilterType={setFilterType}
                    filterSort={filterSort}
                    setFilterSort={setFilterSort}
                    filterStartDate={filterStartDate}
                    setFilterStartDate={setFilterStartDate}
                    filterEndDate={filterEndDate}
                    setFilterEndDate={setFilterEndDate}
                    filterMinAmount={filterMinAmount}
                    setFilterMinAmount={setFilterMinAmount}
                    filterMaxAmount={filterMaxAmount}
                    setFilterMaxAmount={setFilterMaxAmount}
                    categories={categories}
                    onResetFilters={handleResetFilters}
                />

                {/* BẢNG DỮ LIỆU */}
                <TransactionTable
                    transactions={transactions}
                    categories={categories}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalElements={totalElements}
                    filterSort={filterSort}
                    onPageChange={(_e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    onRowClick={handleRowClick}
                    onSortChange={(sort) => {
                        setFilterSort(sort);
                        setPage(0);
                    }}
                />

                {/* MODAL THÊM/SỬA GIAO DỊCH */}
                <TransactionForm
                    open={open}
                    onClose={handleClose}
                    editingId={editingId}
                    transactionType={transactionType}
                    setTransactionType={setTransactionType}
                    title={title}
                    setTitle={setTitle}
                    amount={amount}
                    setAmount={setAmount}
                    date={date}
                    setDate={setDate}
                    note={note}
                    setNote={setNote}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                    errors={errors}
                    onSave={handleSave}
                    onDelete={handleDeleteClick}
                    onOpenCategoryModal={() => setOpenCategoryModal(true)}
                />

                {/* MODAL XÁC NHẬN XÓA */}
                <DeleteConfirmModal
                    open={openConfirmDelete}
                    onClose={() => setOpenConfirmDelete(false)}
                    onConfirm={executeDelete}
                />

                {/* MODAL TẠO DANH MỤC NHANH */}
                <QuickCategoryModal
                    open={openCategoryModal}
                    onClose={() => setOpenCategoryModal(false)}
                    newCategoryName={newCategoryName}
                    setNewCategoryName={setNewCategoryName}
                    categoryError={categoryError}
                    setCategoryError={setCategoryError}
                    onSave={handleSaveQuickCategory}
                />
            </Container>
        </LocalizationProvider>
    );
};

export default TransactionPage;