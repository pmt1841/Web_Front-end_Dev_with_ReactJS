// src/components/Transaction/Filters/PriceRangePopover.tsx

import React, { useState, useEffect } from 'react';
import {
    TextField, Popover, Box, Typography, RadioGroup,
    FormControlLabel, Radio, Divider, Stack, Button
} from '@mui/material';

interface PricePreset {
    label: string;
    min: string;
    max: string;
}

interface PriceRangePopoverProps {
    filterMinAmount: string;
    setFilterMinAmount: (value: string) => void;
    filterMaxAmount: string;
    setFilterMaxAmount: (value: string) => void;
}

const PriceRangePopover: React.FC<PriceRangePopoverProps> = ({
                                                                 filterMinAmount,
                                                                 setFilterMinAmount,
                                                                 filterMaxAmount,
                                                                 setFilterMaxAmount
                                                             }) => {
    const [priceAnchorEl, setPriceAnchorEl] = useState<HTMLDivElement | null>(null);

    // --- STATE TẠM THỜI (Draft) ---
    const [tempMin, setTempMin] = useState(filterMinAmount);
    const [tempMax, setTempMax] = useState(filterMaxAmount);
    const [tempPreset, setTempPreset] = useState('Tất cả');

    const MAX_LIMIT = 100000000;

    const PRICE_PRESETS: PricePreset[] = [
        { label: 'Tất cả', min: "", max: "" },
        { label: '0 - 1 triệu', min: "0", max: "1000000" },
        { label: '1 - 10 triệu', min: "1000000", max: "10000000" },
        { label: '10 - 50 triệu', min: "10000000", max: "50000000" },
        { label: 'Trên 50 triệu', min: "50000000", max: "" },
    ];

    // Mỗi khi mở Popover, đồng bộ state tạm với giá trị thật đang áp dụng
    useEffect(() => {
        if (Boolean(priceAnchorEl)) {
            setTempMin(filterMinAmount);
            setTempMax(filterMaxAmount);
            // Tìm preset tương ứng nếu có
            const currentPreset = PRICE_PRESETS.find(p => p.min === filterMinAmount && p.max === filterMaxAmount);
            setTempPreset(currentPreset ? currentPreset.label : 'Tùy chỉnh');
        }
    }, [priceAnchorEl, filterMinAmount, filterMaxAmount]);

    const handlePresetChange = (preset: PricePreset) => {
        setTempPreset(preset.label);
        setTempMin(preset.min);
        setTempMax(preset.max);
    };

    const handleApply = () => {
        setFilterMinAmount(tempMin);
        setFilterMaxAmount(tempMax);
        setPriceAnchorEl(null);
    };

    const handleReset = () => {
        setTempMin("");
        setTempMax("");
        setTempPreset("Tất cả");
        setFilterMinAmount("");
        setFilterMaxAmount("");
        setPriceAnchorEl(null);
    };

    const formatCurrency = (amount: number): string => {
        if (amount >= 1000000) {
            const million = amount / 1000000;
            return `${million.toFixed(million % 1 === 0 ? 0 : 1)} tr`;
        }
        return amount.toLocaleString('vi-VN');
    };

    const displayPriceRange = (filterMinAmount || filterMaxAmount)
        ? `${filterMinAmount ? formatCurrency(Number(filterMinAmount)) : '0'} - ${filterMaxAmount ? formatCurrency(Number(filterMaxAmount)) : formatCurrency(MAX_LIMIT)}`
        : "";

    return (
        <>
            <TextField
                label="Khoảng giá (VNĐ)"
                size="small"
                fullWidth
                value={displayPriceRange}
                onClick={(e) => setPriceAnchorEl(e.currentTarget)}
                placeholder="Tất cả"
                slotProps={{
                    input: { readOnly: true, sx: { cursor: 'pointer' } },
                    htmlInput: { sx: { cursor: 'pointer', textOverflow: 'ellipsis' } }
                }}
            />
            <Popover
                open={Boolean(priceAnchorEl)}
                anchorEl={priceAnchorEl}
                onClose={() => setPriceAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Box sx={{ p: 3, width: 280 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Chọn nhanh khoảng giá
                    </Typography>

                    <RadioGroup
                        value={tempPreset}
                        onChange={(e) => {
                            const selected = PRICE_PRESETS.find(p => p.label === e.target.value);
                            if (selected) handlePresetChange(selected);
                        }}
                    >
                        {PRICE_PRESETS.map((preset) => (
                            <FormControlLabel
                                key={preset.label}
                                value={preset.label}
                                control={<Radio size="small" color="success" />}
                                label={<Typography variant="body2">{preset.label}</Typography>}
                            />
                        ))}
                    </RadioGroup>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Hoặc nhập thủ công
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            label="Tối thiểu"
                            size="small"
                            type="number"
                            value={tempMin}
                            onChange={(e) => {
                                setTempMin(e.target.value);
                                setTempPreset('Tùy chỉnh');
                            }}
                        />
                        <TextField
                            label="Tối đa"
                            size="small"
                            type="number"
                            value={tempMax}
                            onChange={(e) => {
                                setTempMax(e.target.value);
                                setTempPreset('Tùy chỉnh');
                            }}
                        />
                    </Stack>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                        <Button
                            onClick={handleReset}
                            variant="text"
                            color="error"
                            size="small"
                            sx={{ textTransform: 'none' }}
                        >
                            Xóa lọc
                        </Button>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                size="small"
                                onClick={() => setPriceAnchorEl(null)}
                                sx={{ textTransform: 'none' }}
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={handleApply}
                                variant="contained"
                                color="success"
                                size="small"
                                sx={{ textTransform: 'none' }}
                            >
                                Áp dụng
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default PriceRangePopover;