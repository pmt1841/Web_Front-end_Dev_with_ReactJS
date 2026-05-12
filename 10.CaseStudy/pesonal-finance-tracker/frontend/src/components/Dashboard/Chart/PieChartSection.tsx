// src/components/Dashboard/PieChartSection.tsx

import React from 'react';
import { Paper, Typography, Box, Stack, Grow } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import type { CategoryStat } from '../../../types/category';

interface PieChartSectionProps {
    pieData: (CategoryStat & { color: string })[];
    isLoading: boolean;
}

const PieChartSection: React.FC<PieChartSectionProps> = ({ pieData, isLoading }) => {
    const totalPieValue = pieData.reduce((sum, item) => sum + item.value, 0);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    return (
        <Grow in={true} timeout={1600}>
            <Paper sx={{ p: 3, borderRadius: 2, height: 450 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Phân bổ hạng mục
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <PieChart
                        series={[
                            {
                                data: pieData,
                                innerRadius: 60,
                                paddingAngle: 2,
                                cornerRadius: 5,
                                // --- THÊM PHẦN NÀY ĐỂ HIỆN % ---
                                arcLabel: (item) => {
                                    const percent = (item.value / totalPieValue) * 100;
                                    // Chỉ hiển thị nếu miếng bánh đủ lớn (ví dụ > 5%) để tránh đè chữ
                                    return percent > 5 ? `${percent.toFixed(0)}%` : '';
                                },
                                arcLabelMinAngle: 30,
                            },
                        ]}
                        width={300}
                        height={300}
                        skipAnimation={false}
                        sx={{
                            '& .MuiChartsLegend-root': { display: 'none' },
                            // Tùy chỉnh font chữ % bên trong biểu đồ
                            '& .MuiChartsArcLabel-root': {
                                fill: 'white',
                                fontSize: 12,
                                fontWeight: 'bold',
                            },
                        }}
                    />
                </Box>

                <Stack spacing={1} sx={{ mt: 2 }}>
                    {!isLoading && pieData.slice(0, 3).map((item) => (
                        <Box key={item.id} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <Box sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    bgcolor: item.color
                                }} />
                                <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                                    {item.label}
                                </Typography>
                            </Stack>
                            {/* --- SỬA LẠI THÀNH HIỂN THỊ TIỀN --- */}
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {formatCurrency(Math.abs(item.value))}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Paper>
        </Grow>
    );
};

export default PieChartSection;