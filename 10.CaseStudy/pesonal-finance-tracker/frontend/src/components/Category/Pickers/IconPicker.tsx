// src/components/Category/Pickers/IconPicker.tsx

import React from 'react';
import { Grid, IconButton, Typography, Box } from '@mui/material';
import DynamicIcon from '../utils/DynamicIcon';

const AVAILABLE_ICONS = [
    "Fastfood", "DirectionsCar", "Home", "Receipt", "School", "Work",
    "CardGiftcard", "MedicalServices", "ShoppingBag", "AccountBalance", "Flight", "LocalBar"
];

interface IconPickerProps {
    selectedIcon: string;
    selectedColor: string;
    onSelectIcon: (icon: string) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ selectedIcon, selectedColor, onSelectIcon }) => {
    return (
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Chọn biểu tượng:
            </Typography>
            <Grid container spacing={1}>
                {AVAILABLE_ICONS.map(iconName => (
                    <Grid size={{ xs: 3, sm: 2 }} key={iconName} sx={{ textAlign: 'center' }}>
                        <IconButton
                            onClick={() => onSelectIcon(iconName)}
                            sx={{
                                border: selectedIcon === iconName ? `2px solid ${selectedColor}` : '1px solid #ddd',
                                bgcolor: selectedIcon === iconName ? `${selectedColor}11` : 'transparent'
                            }}
                        >
                            <DynamicIcon
                                name={iconName}
                                color={selectedIcon === iconName ? selectedColor : '#666'}
                            />
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default IconPicker;