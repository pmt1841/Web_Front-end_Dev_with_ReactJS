// src/components/Dashboard/BarChartSection.tsx

import React from 'react';
import {Paper, Typography, Grow} from '@mui/material';
import {BarChart} from '@mui/x-charts/BarChart';
import type {MonthlyStat} from '../../../types';

interface BarChartSectionProps {
    barData: MonthlyStat[];
}

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
                    Xu hướng tài chính ({new Date().getFullYear()})
                </Typography>
                <BarChart
                    dataset={formattedBarData}
                    xAxis={[{scaleType: 'band', dataKey: 'month'}]}
                    series={[
                        {
                            dataKey: 'income',
                            label: 'Thu nhập',
                            color: '#4caf50',
                            barLabel: (item) => {
                                const val = item.value ?? 0;
                                if (val >= 1000000) return `${(val / 1000000).toFixed(1)}Tr`;
                                if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
                                return val.toString();
                            }
                        },
                        {
                            dataKey: 'limit',
                            label: 'Hạn mức',
                            color: '#e0e0e0',
                            barLabel: (item) => {
                                const val = item.value ?? 0;
                                if (val >= 1000000) return `${(val / 1000000).toFixed(1)}Tr`;
                                if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
                                return val.toString();
                            }
                        },
                        {
                            dataKey: 'expense',
                            label: 'Chi tiêu',
                            color: '#f44336',
                            barLabel: (item) => {
                                const val = Math.abs(item.value ?? 0);
                                if (val >= 1000000) return `${(val / 1000000).toFixed(1)}Tr`;
                                if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
                                return val.toString();
                            }
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
                        label: 'Số tiền',
                        valueFormatter: (value : number) => {
                            if (value >= 1000000) return `${(value / 1000000).toLocaleString()} Tr`;
                            if (value >= 1000) return `${(value / 1000).toLocaleString()} k`;
                            return value.toLocaleString();
                        }
                    }]}
                    skipAnimation={false}
                />
            </Paper>
        </Grow>
    );
};

export default BarChartSection;