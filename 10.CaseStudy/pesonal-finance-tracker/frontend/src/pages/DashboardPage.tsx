import { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Stack,
    Paper,
    Box,
    Divider,
    CircularProgress,
    Grow
} from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import api from "../services/api";
import type { Transaction, PageResponse, SummaryStats, MonthlyStat, CategoryStat } from "../types/interface";

const DashboardPage = () => {
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<SummaryStats>({ income: 0, expense: 0 });
    const [barData, setBarData] = useState<MonthlyStat[]>([]);
    const [pieData, setPieData] = useState<(CategoryStat & { color: string })[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const CHART_COLORS = ['#f44336', '#ff9800', '#2196f3', '#9c27b0', '#009688', '#795548'];

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const [recentRes, summaryRes, monthlyRes, categoryRes] = await Promise.all([
                    api.get<PageResponse<Transaction>>("/transactions", {
                        params: { page: 0, size: 5, sort: "date,desc" }
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

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + " ₫";
    };

    const totalPieValue = pieData.reduce((sum, item) => sum + item.value, 0);

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grow in={true} timeout={500}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: 'center' }}>
                        Báo cáo tài chính
                    </Typography>
                </Grow>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Grow in={true} timeout={800}>
                            <Card sx={{ borderLeft: "6px solid #4caf50", borderRadius: 2, boxShadow: 2 }}>
                                <CardContent>
                                    <Typography color="text.secondary" variant="overline" sx={{ fontWeight: 'bold' }}>
                                        Tổng Thu Tháng Này
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                                        {isLoading ? <CircularProgress size={28} /> : formatCurrency(summary.income)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grow>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Grow in={true} timeout={800}>
                            <Card sx={{ borderLeft: "6px solid #f44336", borderRadius: 2, boxShadow: 2 }}>
                                <CardContent>
                                    <Typography color="text.secondary" variant="overline" sx={{ fontWeight: 'bold' }}>
                                        Tổng Chi Tháng Này
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: "#f44336", fontWeight: "bold" }}>
                                        {isLoading ? <CircularProgress size={28} /> : `- ${formatCurrency(summary.expense)}`}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grow>
                    </Grid>

                    {/* 2. BIỂU ĐỒ CỘT (Khi barData cập nhật, các cột sẽ tự động chạy lên/xuống) */}
                    <Grid size={{ xs: 12, md: 8 }}>
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
                    </Grid>

                    {/* 3. BIỂU ĐỒ TRÒN */}
                    <Grid size={{ xs: 12, md: 4 }}>
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
                                                paddingAngle: 5,
                                                cornerRadius: 5,
                                            },
                                        ]}
                                        width={300}
                                        height={300}
                                        skipAnimation={false} // Nở từ tâm mượt mà khi nhận dữ liệu
                                        sx={{
                                            '& .MuiChartsLegend-root': { display: 'none' }
                                        }}
                                    />
                                </Box>
                                <Stack spacing={1} sx={{ mt: 2 }}>
                                    {!isLoading && pieData.slice(0, 3).map((item) => (
                                        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color }} />
                                                <Typography variant="body2">{item.label}</Typography>
                                            </Stack>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                {totalPieValue > 0 ? ((item.value / totalPieValue) * 100).toFixed(1) : 0}%
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grow>
                    </Grid>

                    {/* 4. GIAO DỊCH GẦN ĐÂY */}
                    <Grid size={{ xs: 12 }}>
                        <Grow in={true} timeout={2000}>
                            <Paper sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                                    Giao dịch gần đây
                                </Typography>
                                {isLoading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                                        <CircularProgress size={30} />
                                    </Box>
                                ) : (
                                    <Stack divider={<Divider />}>
                                        {recentTransactions.map((tx) => (
                                            <Box key={tx.id} sx={{
                                                py: 2,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <Box>
                                                    <Typography sx={{ fontWeight: 'bold' }}>{tx.title}</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {tx.category?.name} • {new Date(tx.date).toLocaleDateString('vi-VN')}
                                                    </Typography>
                                                </Box>
                                                <Typography sx={{
                                                    fontWeight: 'bold',
                                                    color: tx.amount > 0 ? "success.main" : "error.main"
                                                }}>
                                                    {tx.amount > 0 ? "+" : ""}{formatCurrency(tx.amount)}
                                                </Typography>
                                            </Box>
                                        ))}
                                        {recentTransactions.length === 0 && (
                                            <Typography sx={{ py: 2, textAlign: 'center' }} color="text.secondary">
                                                Chưa có giao dịch nào gần đây.
                                            </Typography>
                                        )}
                                    </Stack>
                                )}
                            </Paper>
                        </Grow>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DashboardPage;