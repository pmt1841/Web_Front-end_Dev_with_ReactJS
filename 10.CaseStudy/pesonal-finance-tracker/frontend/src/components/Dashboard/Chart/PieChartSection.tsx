// src/components/Dashboard/PieChartSection.tsx

import React from 'react';
import { Paper, Typography, Box, Stack, Grow } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import type { CategoryStat } from '../../../types';

interface PieChartSectionProps {
    pieData: (CategoryStat & { color: string })[];
    isLoading: boolean;
}

const formatCurrency = (value: number) => {
    const val = value ?? 0;
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}Tr`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(0)}k`;
    return val.toString();
};

const PieChartSection: React.FC<PieChartSectionProps> = ({ pieData, isLoading }) => {
    const totalPieValue = pieData.reduce((sum, item) => sum + item.value, 0);

    const formattedData = pieData.map(item => ({
        id: item.id,
        label: item.label,
        value: item.value,
        color: item.color
    }));

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
                                data: formattedData,
                                innerRadius: 60,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                cx: 150,
                                cy: 150,
                                arcLabel: (item) => {
                                    return totalPieValue > 0
                                        ? `${((item.value / totalPieValue) * 100).toFixed(1)}%`
                                        : '0%';
                                },
                                arcLabelMinAngle: 15,
                            },
                        ]}
                        width={300}
                        height={300}
                        sx={{
                            '& .MuiChartsLegend-root': { display: 'none' }
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
                                <Typography variant="body2">{item.label}</Typography>
                            </Stack>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {formatCurrency(item.value)}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Paper>
        </Grow>
    );
};

export default PieChartSection;