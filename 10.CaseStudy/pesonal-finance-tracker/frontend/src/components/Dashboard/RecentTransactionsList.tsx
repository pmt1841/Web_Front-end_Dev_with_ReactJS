// src/components/Dashboard/RecentTransactionsList.tsx

import React from 'react';
import {
    Paper, Typography, Box, Stack, Divider,
    CircularProgress, Grow
} from '@mui/material';
import type { Transaction } from '../../types/transaction';

interface RecentTransactionsListProps {
    transactions: Transaction[];
    isLoading: boolean;
}

const RecentTransactionsList: React.FC<RecentTransactionsListProps> = ({
                                                                           transactions,
                                                                           isLoading
                                                                       }) => {
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + " ₫";
    };

    return (
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
                        {transactions.map((tx) => (
                            <Box key={tx.id} sx={{
                                py: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Box>
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        {tx.title}
                                    </Typography>
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
                        {transactions.length === 0 && (
                            <Typography sx={{ py: 2, textAlign: 'center' }} color="text.secondary">
                                Chưa có giao dịch nào gần đây.
                            </Typography>
                        )}
                    </Stack>
                )}
            </Paper>
        </Grow>
    );
};

export default RecentTransactionsList;