// src/components/Dashboard/BarChartSection.tsx

import React from 'react';
import { Paper, Typography, Grow } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import type { MonthlyStat } from '../../../types/interface';

interface BarChartSectionProps {
    barData: MonthlyStat[];
}

const BarChartSection: React.FC<BarChartSectionProps> = ({ barData }) => {
    return (
        <Grow in={true} timeout={1200}>
            <Paper sx={{ p: 3, borderRadius: 2, height: 450 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Xu hướng tài chính ({new Date().getFullYear()})
                </Typography>
                <BarChart
                    dataset={barData}
                    xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                    series={[
                        { dataKey: 'income', label: 'Thu nhập', color: '#4caf50' },
                        { dataKey: 'expense', label: 'Chi tiêu', color: '#f44336' }
                    ]}
                    height={350}
                    margin={{ left: 80 }}
                    yAxis={[{ label: 'Số tiền (VNĐ)' }]}
                    skipAnimation={false}
                />
            </Paper>
        </Grow>
    );
};

export default BarChartSection;