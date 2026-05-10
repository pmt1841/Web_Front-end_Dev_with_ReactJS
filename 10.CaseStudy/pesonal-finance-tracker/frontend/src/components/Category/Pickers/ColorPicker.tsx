// src/components/Category/Pickers/ColorPicker.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';

const AVAILABLE_COLORS = [
    "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
    "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#ffeb3b",
    "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"
];

interface ColorPickerProps {
    selectedColor: string;
    onSelectColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onSelectColor }) => {
    return (
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Chọn màu đại diện:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {AVAILABLE_COLORS.map(color => (
                    <Box
                        key={color}
                        onClick={() => onSelectColor(color)}
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            bgcolor: color,
                            cursor: 'pointer',
                            border: selectedColor === color ? '3px solid #333' : 'none',
                            transition: '0.2s'
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default ColorPicker;