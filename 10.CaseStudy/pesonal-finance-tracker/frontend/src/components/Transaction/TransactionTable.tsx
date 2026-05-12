// src/components/Transaction/TransactionTable.tsx

import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Chip, Typography, TablePagination, IconButton, Tooltip
} from '@mui/material';
import {TableSortLabel} from '@mui/material';
import {Edit as EditIcon} from '@mui/icons-material';
import type {Transaction, Category} from '../../types';

interface TransactionTableProps {
    transactions: Transaction[];
    categories: Category[];
    page: number;
    rowsPerPage: number;
    totalElements: number;
    filterSort: "desc" | "asc";
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRowClick: (transaction: Transaction) => void;
    onSortChange: (sort: "desc" | "asc") => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
                                                               transactions,
                                                               page,
                                                               rowsPerPage,
                                                               totalElements,
                                                               filterSort,
                                                               onPageChange,
                                                               onRowsPerPageChange,
                                                               onRowClick,
                                                               onSortChange
                                                           }) => {

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
        <TableContainer component={Paper} elevation={3}>
            <Table>
                <TableHead sx={{backgroundColor: "#f5f5f5"}}>
                    <TableRow>
                        <TableCell><b>STT</b></TableCell>
                        <TableCell><b>Tiêu đề</b></TableCell>
                        <TableCell><b>Danh mục</b></TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={true}
                                direction={filterSort}
                                onClick={() => onSortChange(filterSort === "desc" ? "asc" : "desc")}
                                sx={{fontWeight: "bold"}}
                            >
                                Ngày
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right"><b>Số tiền</b></TableCell>
                        <TableCell align="right"><b>Hành động</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((tx, index) => (
                        <TableRow
                            key={tx.id}
                            hover
                            onClick={() => onRowClick(tx)}
                            sx={{cursor: "pointer"}}
                        >
                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                            <TableCell>
                                <Typography variant="body1">{tx.title}</Typography>
                                {tx.note && (
                                    <Typography variant="caption" color="text.secondary">
                                        {tx.note}
                                    </Typography>
                                )}
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
                            <TableCell align="right">
                                <Tooltip title="Chỉnh sửa">
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onRowClick(tx);
                                        }}
                                        sx={{
                                            backgroundColor: "rgba(25, 118, 210, 0.08)",
                                            "&:hover": {backgroundColor: "rgba(25, 118, 210, 0.2)"}
                                        }}
                                    >
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                    {transactions.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{py: 3}}>
                                Không tìm thấy giao dịch nào phù hợp!
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                component="div"
                count={totalElements}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                labelRowsPerPage="Số dòng mỗi trang:"
            />
        </TableContainer>
    );
};

export default TransactionTable;