// src/components/Dashboard/SummaryCard.tsx

import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Grow } from '@mui/material';

interface SummaryCardProps {
    title: string;
    amount: number;
    color: string;
    isLoading: boolean;
    delay?: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
    title,
    amount,
    color,
    isLoading,
    delay = 800
}) => {
    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN') + " ₫";
    };

    return (
        <Grow in={true} timeout={delay}>
            <Card sx={{ borderLeft: `6px solid ${color}`, borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                    <Typography color="text.secondary" variant="overline" sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ color: color, fontWeight: "bold" }}>
                        {isLoading ? <CircularProgress size={28} /> : formatCurrency(amount)}
                    </Typography>
                </CardContent>
            </Card>
        </Grow>
    );
};

export default SummaryCard;