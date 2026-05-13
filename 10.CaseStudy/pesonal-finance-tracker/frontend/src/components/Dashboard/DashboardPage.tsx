// src/components/Dashboard/DashboardPage.tsx

import { useEffect, useState, useCallback } from "react";
import { Container, Grid, Box, Typography, Grow } from "@mui/material";
import api from "../../services/api";
import type { Transaction, PageResponse, SummaryStats, MonthlyStat, CategoryStat, BudgetInfo } from "../../types/";
import { SummaryCard, BarChartSection, PieChartSection, RecentTransactionsList, BudgetCard, BudgetSettingModal } from '../Dashboard';

const DashboardPage = () => {
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<SummaryStats>({ income: 0, expense: 0 });
    const [barData, setBarData] = useState<MonthlyStat[]>([]);
    const [pieData, setPieData] = useState<(CategoryStat & { color: string })[]>([]);
    const [budget, setBudget] = useState<BudgetInfo>({ monthlyLimit: 0, currentExpense: 0, remaining: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [openBudgetModal, setOpenBudgetModal] = useState(false);

    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [recentRes, summaryRes, monthlyRes, categoryRes, budgetRes] = await Promise.all([
                api.get<PageResponse<Transaction>>("/transactions", {
                    params: { page: 0, size: 5, sort: "date,desc" }
                }),
                api.get<SummaryStats>("/transactions/stats/summary"),
                api.get<MonthlyStat[]>("/transactions/stats/monthly"),
                api.get<CategoryStat[]>("/transactions/stats/category"),
                api.get<BudgetInfo>("/budget")
            ]);

            setRecentTransactions(recentRes.data.content);
            setSummary(summaryRes.data);
            setBarData(monthlyRes.data);

            const formattedPieData = categoryRes.data.map((item) => ({
                ...item
            }));
            setPieData(formattedPieData);

            setBudget(budgetRes.data);

        } catch (error) {
            console.error("Lỗi tải dữ liệu dashboard:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSaveBudget = async (newLimit: number) => {
        try {
            const response =  await api.put("/budget", { monthlyLimit: newLimit });
            setBudget(response.data);
        } catch (error) {
            console.error("Lỗi cập nhật budget:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grow in={true} timeout={500}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: 'center' }}>
                        Báo cáo tài chính
                    </Typography>
                </Grow>

                <Grid container spacing={3}>
                    {/* Summary Cards */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <SummaryCard
                            title="Tổng Thu Tháng Này"
                            amount={summary.income}
                            color="#4caf50"
                            isLoading={isLoading}
                            delay={800}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <SummaryCard
                            title="Tổng Chi Tháng Này"
                            amount={summary.expense}
                            color="#f44336"
                            isLoading={isLoading}
                            delay={800}
                        />
                    </Grid>

                    {/* BudgetCard */}
                    <BudgetSettingModal
                        open={openBudgetModal}
                        onClose={() => setOpenBudgetModal(false)}
                        currentLimit={budget.monthlyLimit}
                        onSave={handleSaveBudget}
                        isLoading={isLoading}
                    />
                    <Grid size={{ xs: 12 }}>
                        <BudgetCard
                            budget={budget}
                            isLoading={isLoading}
                            onSettingsClick={() => setOpenBudgetModal(true)}
                        />
                    </Grid>

                    {/* Bar Chart */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <BarChartSection barData={barData} />
                    </Grid>

                    {/* Pie Chart */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <PieChartSection pieData={pieData} isLoading={isLoading} />
                    </Grid>

                    {/* Recent Transactions */}
                    <Grid size={{ xs: 12 }}>
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