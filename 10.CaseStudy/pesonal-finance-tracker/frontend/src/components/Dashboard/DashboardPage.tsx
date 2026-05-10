// src/components/Dashboard/DashboardPage.tsx

import {useEffect, useState} from "react";
import {Container, Grid, Box, Typography, Grow} from "@mui/material";
import api from "../../services/api";
import type {Transaction, PageResponse, SummaryStats, MonthlyStat, CategoryStat} from "../../types/interface";
import {SummaryCard, BarChartSection, PieChartSection, RecentTransactionsList} from '../Dashboard';

const CHART_COLORS = ['#f44336', '#ff9800', '#2196f3', '#9c27b0', '#009688', '#795548'];

const DashboardPage = () => {
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<SummaryStats>({income: 0, expense: 0});
    const [barData, setBarData] = useState<MonthlyStat[]>([]);
    const [pieData, setPieData] = useState<(CategoryStat & { color: string })[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const [recentRes, summaryRes, monthlyRes, categoryRes] = await Promise.all([
                    api.get<PageResponse<Transaction>>("/transactions", {
                        params: {page: 0, size: 5, sort: "date,desc"}
                    }),
                    api.get<SummaryStats>("/transactions/stats/summary"),
                    api.get<MonthlyStat[]>("/transactions/stats/monthly"),
                    api.get<CategoryStat[]>("/transactions/stats/category")
                ]);

                setRecentTransactions(recentRes.data.content);
                setSummary(summaryRes.data);
                setBarData(monthlyRes.data);

                const formattedPieData = categoryRes.data.map((item, index) => ({
                    ...item,
                    color: CHART_COLORS[index % CHART_COLORS.length]
                }));
                setPieData(formattedPieData);

            } catch (error) {
                console.error("Lỗi tải dữ liệu dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grow in={true} timeout={500}>
                    <Typography variant="h4" sx={{fontWeight: "bold", mb: 4, textAlign: 'center'}}>
                        Báo cáo tài chính
                    </Typography>
                </Grow>

                <Grid container spacing={3}>
                    {/* Summary Cards */}
                    <Grid size={{xs: 12, md: 6}}>
                        <SummaryCard
                            title="Tổng Thu Tháng Này"
                            amount={summary.income}
                            color="#4caf50"
                            isLoading={isLoading}
                            delay={800}
                        />
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <SummaryCard
                            title="Tổng Chi Tháng Này"
                            amount={summary.expense}
                            color="#f44336"
                            isLoading={isLoading}
                            delay={800}
                        />
                    </Grid>

                    {/* Bar Chart */}
                    <Grid size={{xs: 12, md: 8}}>
                        <BarChartSection barData={barData}/>
                    </Grid>

                    {/* Pie Chart */}
                    <Grid size={{xs: 12, md: 4}}>
                        <PieChartSection pieData={pieData} isLoading={isLoading}/>
                    </Grid>

                    {/* Recent Transactions */}
                    <Grid size={{xs: 12}}>
                        <RecentTransactionsList
                            transactions={recentTransactions}
                            isLoading={isLoading}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DashboardPage;