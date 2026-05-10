// src/components/Transaction/Filters/PriceRangePopover.tsx

import React, { useState } from 'react';
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
    const [pricePreset, setPricePreset] = useState('Tất cả');
    const MAX_LIMIT = 100000000;

    const PRICE_PRESETS: PricePreset[] = [
        { label: 'Tất cả', min: "", max: "" },
        { label: '0 - 1 triệu', min: "0", max: "1000000" },
        { label: '1 - 10 triệu', min: "1000000", max: "10000000" },
        { label: '10 - 50 triệu', min: "10000000", max: "50000000" },
        { label: 'Trên 50 triệu', min: "50000000", max: "" },
    ];

    const handlePresetChange = (preset: PricePreset) => {
        setPricePreset(preset.label);
        setFilterMinAmount(preset.min);
        setFilterMaxAmount(preset.max);
    };

    const handlePriceClose = () => {
        setPriceAnchorEl(null);
    };

    const displayPriceRange = (filterMinAmount || filterMaxAmount)
        ? `${Number(filterMinAmount || 0).toLocaleString()} - ${Number(filterMaxAmount || MAX_LIMIT).toLocaleString()}`
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
                open={Boolean(priceAnchorEl)}
                anchorEl={priceAnchorEl}
                onClose={() => setPriceAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                slotProps={{ paper: { sx: { p: 3, width: 350 } } }}
            >
                <Box sx={{ p: 2, width: 250 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Chọn nhanh khoảng giá
                    </Typography>

                    <RadioGroup
                        value={pricePreset}
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
                                label={<Typography variant="body2">{ preset.label }</Typography>}
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
                            value={filterMinAmount}
                            onChange={(e) => setFilterMinAmount(e.target.value)}
                        />
                        <TextField
                            label="Tối đa"
                            size="small"
                            type="number"
                            value={filterMaxAmount}
                            onChange={(e) => setFilterMaxAmount(e.target.value)}
                        />
                    </Stack>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={handlePriceClose} variant="contained" color="success" size="small">
                            Áp dụng
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default PriceRangePopover;