package com.codegym.backend.service.transaction.impl;

import com.codegym.backend.dto.category.CategoryStatDto;
import com.codegym.backend.dto.transaction.MonthlyStatDto;
import com.codegym.backend.dto.transaction.SummaryStatDto;
import com.codegym.backend.dto.transaction.TransactionFilter;
import com.codegym.backend.entity.transaction.Transaction;
import com.codegym.backend.repository.TransactionRepository;
import com.codegym.backend.repository.specification.TransactionSpecifications;
import com.codegym.backend.service.transaction.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;

    @Override
    public Page<Transaction> getAllTransactions(TransactionFilter filter, Pageable pageable) {
        Specification<Transaction> spec = TransactionSpecifications.getFilter(filter);
        return transactionRepository.findAll(spec, pageable);
    }

    @Override
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Optional<Transaction> findTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    @Override
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    @Override
    public boolean exists(Long id) {
        return transactionRepository.existsById(id);
    }

    @Override
    public Optional<Transaction> updateTransaction(Long id, Transaction transaction) {
        return transactionRepository.findById(id).map(existing -> {
            existing.setTitle(transaction.getTitle());
            existing.setAmount(transaction.getAmount());
            existing.setCategory(transaction.getCategory());
            existing.setDate(transaction.getDate());
            existing.setNote(transaction.getNote());

            return transactionRepository.save(existing);
        });
    }

    @Override
    public SummaryStatDto getSummaryStats() {
        LocalDate now = LocalDate.now();
        Long income = transactionRepository.getTotalIncomeByMonth(now.getMonthValue(), now.getYear());
        Long expense = transactionRepository.getTotalExpenseByMonth(now.getMonthValue(), now.getYear());

        return new SummaryStatDto(income, Math.abs(expense));
    }

    @Override
    public List<CategoryStatDto> getCategoryStats() {
        LocalDate now = LocalDate.now();

        List<Object[]> results = transactionRepository.getExpenseByCategory(now.getMonthValue(), now.getYear());

        List<CategoryStatDto> categoryStats = new ArrayList<>();

        for (Object[] row : results) {
            Integer id = (Integer) row[0];
            String name = (String) row[1];

            Number sumAmount = (Number) row[2];
            Long value = sumAmount.longValue();

            categoryStats.add(new CategoryStatDto(id, name, value));
        }

        return categoryStats;
    }

    @Override
    public List<MonthlyStatDto> getMonthlyStats() {
        int currentYear = LocalDate.now().getYear();
        List<Object[]> results = transactionRepository.getMonthlyStats(currentYear);
        List<MonthlyStatDto> monthlyStats = new ArrayList<>();

        for (Object[] row : results) {
            Integer monthNum = (Integer) row[0];
            Long income = (Long) row[1];
            Long expense = (Long) row[2];

            monthlyStats.add(new MonthlyStatDto("T" + monthNum, income, expense));
        }

        return monthlyStats;
    }

}
