// src/components/Dashboard/BarChartSection.tsx

import React from 'react';
import {Paper, Typography, Grow} from '@mui/material';
import {BarChart} from '@mui/x-charts/BarChart';
import type {MonthlyStat} from '../../../types';

interface BarChartSectionProps {
    barData: MonthlyStat[];
}

const formatCurrencyShort = (value: number) => {
    const absVal = Math.abs(value);
    if (absVal === 0) return "0";

    if (absVal >= 1000000) {
        return `${(absVal / 1000000).toLocaleString('vi-VN')} Tr`;
    }
    if (absVal >= 1000) {
        return `${(absVal / 1000).toLocaleString('vi-VN')} k`;
    }
    return absVal.toLocaleString('vi-VN');
};

const formatBarLabel = (item: { value: number | null }) => {
    const val = item.value ?? 0;
    if (val === 0) return "";
    return formatCurrencyShort(val);
};

const formatYAxis = (value: number | null) => {
    const val = value ?? 0;
    return formatCurrencyShort(val);
};

const BarChartSection: React.FC<BarChartSectionProps> = ({barData}) => {
    const formattedBarData = barData.map(item => ({
        ...item,
        expense: Math.abs(item.expense),
        limit: item.limit || 0,
    }));

    return (
        <Grow in={true} timeout={1200}>
            <Paper sx={{p: 3, borderRadius: 2, height: 450}}>
                <Typography variant="h6" sx={{fontWeight: "bold", mb: 2}}>
                    Xu hướng tài chính {new Date().getFullYear()}
                </Typography>
                <BarChart
                    dataset={formattedBarData}
                    xAxis={[{scaleType: 'band', dataKey: 'month'}]}
                    series={[
                        {
                            dataKey: 'income',
                            label: 'Thu nhập',
                            color: '#4caf50',
                            barLabel: formatBarLabel,
                            barLabelPlacement: 'outside'
                        },
                        {
                            dataKey: 'limit',
                            label: 'Hạn mức',
                            color: '#e0e0e0',
                            barLabel: formatBarLabel,
                            barLabelPlacement: 'outside'
                        },
                        {
                            dataKey: 'expense',
                            label: 'Chi tiêu',
                            color: '#f44336',
                            barLabel: formatBarLabel,
                            barLabelPlacement: 'outside'
                        },
                    ]}
                    slotProps={{
                        barLabel: {
                            style: {
                                fontSize: 12,
                                fontWeight: 'bold',
                                fill: 'black',
                            },
                        },
                    }}
                    height={350}
                    margin={{left: 80}}
                    yAxis={[{
                        label: 'Số tiền (VNĐ)',
                        valueFormatter: formatYAxis,
                    }]}
                    skipAnimation={false}
                />
            </Paper>
        </Grow>
    );
};

export default BarChartSection;