// src/components/Category/CategoryCard.tsx

import React from 'react';
import {
    Card, CardContent, CardActions, IconButton, Divider,
    Stack, Box, Typography
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type {Category} from '../../types/transaction';
import {DynamicIcon} from '../Category';

interface CategoryCardProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
    const displayColor = category.color || (category.transactionType === "EXPENSE" ? "#f44336" : "#4caf50");

    return (
        <Card sx={{
            borderRadius: 3,
            boxShadow: 1,
            borderTop: `4px solid ${displayColor}`,
            transition: "0.2s",
            "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 1.5, alignItems: "center" }}>
                    <Box sx={{
                        p: 1.5,
                        borderRadius: '50%',
                        bgcolor: `${displayColor}1A`,
                        color: displayColor,
                        display: 'flex'
                    }}>
                        <DynamicIcon name={category.icon || "Category"} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {category.name}
                    </Typography>
                </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end", p: 1 }}>
                <IconButton sx={{ color: "#2e7d32" }} onClick={() => onEdit(category)}>
                    <EditIcon />
                </IconButton>
                <IconButton sx={{ color: "#d32f2f" }} onClick={() => onDelete(category)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default CategoryCard;