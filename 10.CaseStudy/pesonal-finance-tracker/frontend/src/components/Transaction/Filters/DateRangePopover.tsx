// src/components/Transaction/Filters/DateRangePopover.tsx

import React, {useState} from 'react';
import {
    TextField, Popover, Box, Stack, Divider, Button, Typography
} from '@mui/material';
import {DateCalendar} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers';
import dayjs from 'dayjs';

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

    const handleDateClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDateClose = () => {
        setAnchorEl(null);
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
                        sx: {cursor: 'pointer'}
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
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Box sx={{p: 2}}>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}
                           divider={<Divider orientation="vertical" flexItem/>}>
                        <Box>
                            <Typography variant="caption" sx={{fontWeight: 'bold'}}>TỪ NGÀY</Typography>
                            <DateCalendar
                                value={filterStartDate ? dayjs(filterStartDate) : null}
                                onChange={(val) => setFilterStartDate(val?.format('YYYY-MM-DD') || "")}
                            />
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{fontWeight: 'bold'}}>ĐẾN NGÀY</Typography>
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
        </LocalizationProvider>
    );
};

export default DateRangePopover;