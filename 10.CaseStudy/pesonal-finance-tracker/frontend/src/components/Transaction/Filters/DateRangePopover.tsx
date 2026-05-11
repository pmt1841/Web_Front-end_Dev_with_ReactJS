// src/components/Transaction/Filters/DateRangePopover.tsx

import React, { useState, useEffect } from 'react';
import {
    TextField, Popover, Box, Stack, Divider, Button, Typography
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface DateRangePopoverProps {
    filterStartDate: string;
    setFilterStartDate: (value: string) => void;
    filterEndDate: string;
    setFilterEndDate: (value: string) => void;
}

const DateRangePopover: React.FC<DateRangePopoverProps> = ({
                                                               filterStartDate,
                                                               setFilterStartDate,
                                                               filterEndDate,
                                                               setFilterEndDate
                                                           }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    // --- STATE TẠM THỜI (Chỉ thay đổi trên giao diện Popover) ---
    const [tempStart, setTempStart] = useState<Dayjs | null>(null);
    const [tempEnd, setTempEnd] = useState<Dayjs | null>(null);

    // Mỗi khi mở Popover, đồng bộ State tạm thời với giá trị đã áp dụng trước đó
    useEffect(() => {
        if (Boolean(anchorEl)) {
            setTempStart(filterStartDate ? dayjs(filterStartDate) : null);
            setTempEnd(filterEndDate ? dayjs(filterEndDate) : null);
        }
    }, [anchorEl, filterStartDate, filterEndDate]);

    const handleDateClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDateClose = () => {
        setAnchorEl(null);
    };

    // Hàm xử lý khi nhấn Áp dụng
    const handleApply = () => {
        setFilterStartDate(tempStart ? tempStart.format('YYYY-MM-DD') : "");
        setFilterEndDate(tempEnd ? tempEnd.format('YYYY-MM-DD') : "");
        handleDateClose();
    };

    // Hàm xử lý khi nhấn Xóa lọc
    const handleReset = () => {
        setTempStart(null);
        setTempEnd(null);
        setFilterStartDate("");
        setFilterEndDate("");
        handleDateClose();
    };

    const displayDateRange = filterStartDate || filterEndDate
        ? `${filterStartDate ? dayjs(filterStartDate).format('DD/MM/YYYY') : '?'} - ${filterEndDate ? dayjs(filterEndDate).format('DD/MM/YYYY') : '?'}`
        : "";

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField
                label="Thời gian"
                size="small"
                fullWidth
                value={displayDateRange}
                onClick={handleDateClick}
                placeholder="Ngày bắt đầu - kết thúc"
                slotProps={{
                    input: {
                        readOnly: true,
                        sx: { cursor: 'pointer' }
                    },
                    htmlInput: {
                        sx: {
                            cursor: 'pointer',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                        }
                    }
                }}
            />
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleDateClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Box sx={{ p: 2 }}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 'bold', ml: 2, color: 'text.secondary' }}>
                                TỪ NGÀY
                            </Typography>
                            <DateCalendar
                                value={tempStart}
                                onChange={(val) => setTempStart(val)}
                            />
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 'bold', ml: 2, color: 'text.secondary' }}>
                                ĐẾN NGÀY
                            </Typography>
                            <DateCalendar
                                value={tempEnd}
                                minDate={tempStart || undefined}
                                onChange={(val) => setTempEnd(val)}
                            />
                        </Box>
                    </Stack>

                    <Divider sx={{ my: 1 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
                        <Button
                            size="small"
                            color="error"
                            onClick={handleReset}
                            sx={{ textTransform: 'none' }}
                        >
                            Xóa lọc
                        </Button>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button size="small" onClick={handleDateClose} sx={{ textTransform: 'none' }}>
                                Hủy
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={handleApply}
                                sx={{ textTransform: 'none' }}
                            >
                                Áp dụng
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Popover>
        </LocalizationProvider>
    );
};

export default DateRangePopover;