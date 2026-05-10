// src/components/Transaction/Filters/FilterBar.tsx

import React from 'react';
import {
    TextField, FormControl, InputLabel, Select, MenuItem,
    Grid, Paper, IconButton, Tooltip
} from '@mui/material';
import {Refresh as RefreshIcon} from '@mui/icons-material';
import type {Category} from '../../../types/interface';
import {DateRangePopover, PriceRangePopover} from '../../Transaction';

interface FilterBarProps {
    // Filter states
    filterKeyword: string;
    setFilterKeyword: (value: string) => void;
    filterCategoryId: number | "ALL";
    setFilterCategoryId: (value: number | "ALL") => void;
    filterType: "ALL" | "INCOME" | "EXPENSE";
    setFilterType: (value: "ALL" | "INCOME" | "EXPENSE") => void;
    filterSort: "desc" | "asc";
    setFilterSort: (value: "desc" | "asc") => void;

    // Date filter states
    filterStartDate: string;
    setFilterStartDate: (value: string) => void;
    filterEndDate: string;
    setFilterEndDate: (value: string) => void;

    // Price filter states
    filterMinAmount: string;
    setFilterMinAmount: (value: string) => void;
    filterMaxAmount: string;
    setFilterMaxAmount: (value: string) => void;

    // Other props
    categories: Category[];
    onResetFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
                                                 filterKeyword,
                                                 setFilterKeyword,
                                                 filterCategoryId,
                                                 setFilterCategoryId,
                                                 filterType,
                                                 setFilterType,
                                                 filterStartDate,
                                                 setFilterStartDate,
                                                 filterEndDate,
                                                 setFilterEndDate,
                                                 filterMinAmount,
                                                 setFilterMinAmount,
                                                 filterMaxAmount,
                                                 setFilterMaxAmount,
                                                 categories,
                                                 onResetFilters
                                             }) => {
    return (
        <Paper sx={{p: 2, mb: 3, backgroundColor: "#fbfbfb"}} elevation={1}>
            <Grid container spacing={2} sx={{alignItems: 'center'}}>
                {/* TÌM KIẾM */}
                <Grid size={{xs: 12, sm: 6, md: 2}}>
                    <TextField
                        label="Tìm kiếm..."
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={filterKeyword}
                        onChange={(e) => setFilterKeyword(e.target.value)}
                    />
                </Grid>

                {/* DANH MỤC */}
                <Grid size={{xs: 6, sm: 3, md: 2}}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Danh mục</InputLabel>
                        <Select
                            value={filterCategoryId}
                            label="Danh mục"
                            onChange={(e) => setFilterCategoryId(e.target.value as number | "ALL")}
                        >
                            <MenuItem value="ALL">Tất cả</MenuItem>
                            {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* LOẠI */}
                <Grid size={{xs: 6, sm: 3, md: 2}}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Loại</InputLabel>
                        <Select
                            value={filterType}
                            label="Loại"
                            onChange={(e) => setFilterType(e.target.value as "ALL" | "INCOME" | "EXPENSE")}
                        >
                            <MenuItem value="ALL">Tất cả</MenuItem>
                            <MenuItem value="INCOME">Khoản Thu</MenuItem>
                            <MenuItem value="EXPENSE">Khoản Chi</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* NGÀY - Sử dụng DateRangePopover */}
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <DateRangePopover
                        filterStartDate={filterStartDate}
                        setFilterStartDate={setFilterStartDate}
                        filterEndDate={filterEndDate}
                        setFilterEndDate={setFilterEndDate}
                    />
                </Grid>

                {/* BỘ LỌC GIÁ - Sử dụng PriceRangePopover */}
                <Grid size={{xs: 12, sm: 6, md: 2}}>
                    <PriceRangePopover
                        filterMinAmount={filterMinAmount}
                        setFilterMinAmount={setFilterMinAmount}
                        filterMaxAmount={filterMaxAmount}
                        setFilterMaxAmount={setFilterMaxAmount}
                    />
                </Grid>

                {/* NÚT LÀM MỚI */}
                <Grid size={{xs: 12, sm: 12, md: 1}} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Tooltip title="Làm mới bộ lọc">
                        <IconButton
                            onClick={onResetFilters}
                            sx={{
                                border: '1px solid',
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                                borderRadius: 1,
                                height: 40,
                                width: 40,
                                color: 'text.secondary',
                                "&:hover": {backgroundColor: 'rgba(0, 0, 0, 0.04)'}
                            }}
                        >
                            <RefreshIcon/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FilterBar;