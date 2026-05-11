// src/components/Dashboard/BudgetCard.tsx

import React from 'react';
import {Card, CardContent, Typography, Box, LinearProgress, Stack, Chip, Tooltip, IconButton} from '@mui/material';
import {Grow} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import {Settings as SettingsIcon} from '@mui/icons-material';

interface BudgetInfo {
    monthlyLimit: number;
    currentExpense: number;
    remaining: number;
}

interface BudgetCardProps {
    budget: BudgetInfo;
    isLoading: boolean;
    onSettingsClick?: () => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({budget, onSettingsClick}) => {
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + " ₫";
    };

    const percentageUsed = budget.monthlyLimit > 0 ? (Math.abs(budget.currentExpense) / budget.monthlyLimit) * 100 : 0;
    const isOver = budget.remaining < 0;
    const isWarning = percentageUsed > 80;

    const getProgressColor = () => {
        if (isOver) return 'error';
        if (isWarning) return 'warning';
        return 'success';
    };

    return (
        <Grow in={true} timeout={1000}>
            <Card sx={{
                borderRadius: 2,
                boxShadow: 2,
                background: isOver ? 'linear-gradient(135deg, #ffebee 0%, #fff)' : 'linear-gradient(135deg, #f1f8e9 0%, #fff)',
                borderLeft: `6px solid ${isOver ? '#f44336' : isWarning ? '#ff9800' : '#4caf50'}`
            }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant="h6" sx={{fontWeight: "bold"}}>
                                Giới hạn chi tiêu tháng này
                            </Typography>
                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                {isWarning && (
                                    <Chip
                                        icon={<WarningIcon/>}
                                        label={isOver ? "Vượt quá" : "Cảnh báo"}
                                        color={isOver ? "error" : "warning"}
                                        size="small"
                                        variant="outlined"
                                    />
                                )}
                                <Tooltip title="Cài đặt giới hạn">
                                    <IconButton
                                        size="small"
                                        onClick={onSettingsClick}
                                        sx={{
                                            color: "#2e7d32",
                                            "&:hover": {bgcolor: "rgba(46, 125, 50, 0.1)"}
                                        }}
                                    >
                                        <SettingsIcon fontSize="small"/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                        {/* Progress Bar */}
                        <Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  {formatCurrency(Math.abs(budget.currentExpense))} / {formatCurrency(budget.monthlyLimit)}
                                </Typography>
                                <Typography variant="body2" sx={{fontWeight: 'bold', color: 'text.secondary'}}>
                                    {percentageUsed.toFixed(1)}%
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={Math.min(percentageUsed, 100)}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: '#e0e0e0',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 4,
                                        backgroundColor: getProgressColor() === 'error' ? '#f44336' : getProgressColor() === 'warning' ? '#ff9800' : '#4caf50'
                                    }
                                }}
                            />
                        </Box>

                        {/* Stats */}
                        <Stack direction="row" spacing={2}>
                            <Box sx={{flex: 1, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1}}>
                                <Typography variant="caption" color="text.secondary" sx={{fontWeight: 'bold'}}>
                                    Đã dùng
                                </Typography>
                                <Typography variant="body2" sx={{fontWeight: 'bold', color: '#f44336', mt: 0.5}}>
                                    {formatCurrency(budget.currentExpense)}
                                </Typography>
                            </Box>

                            <Box sx={{flex: 1, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1}}>
                                <Typography variant="caption" color="text.secondary" sx={{fontWeight: 'bold'}}>
                                    Còn lại
                                </Typography>
                                <Typography variant="body2" sx={{
                                    fontWeight: 'bold',
                                    color: isOver ? '#f44336' : '#4caf50',
                                    mt: 0.5
                                }}>
                                    {isOver ? '-' : ''}{formatCurrency(Math.abs(budget.remaining))}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Grow>
    );
};

export default BudgetCard;