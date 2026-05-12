package com.codegym.backend.service.budget.impl;

import com.codegym.backend.entity.budget.Budget;
import com.codegym.backend.dto.budget.BudgetStatDto;
import com.codegym.backend.repository.BudgetRepository;
import com.codegym.backend.repository.TransactionRepository;
import com.codegym.backend.service.budget.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {
    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public BudgetStatDto getBudgetStats() {
        LocalDate now = LocalDate.now();
        int month = now.getMonthValue();
        int year = now.getYear();

        Long monthlyLimit = budgetRepository.findByMonthAndYear(month, year)
                .map(Budget::getAmount)
                .orElse(0L);

        Long currentExpense = transactionRepository.getTotalExpenseByMonth(month, year);
        if (currentExpense == null) currentExpense = 0L;
        Long remaining = monthlyLimit - Math.abs(currentExpense);

        return new BudgetStatDto(monthlyLimit, currentExpense, remaining);
    }

    @Override
    public BudgetStatDto updateBudgetStats(Long newLimit) {
        LocalDate now = LocalDate.now();
        int month = now.getMonthValue();
        int year = now.getYear();

        Budget budget = budgetRepository.findByMonthAndYear(month, year)
                .orElseGet(() -> {
                    Budget newBudget = new Budget();
                    newBudget.setMonth(month);
                    newBudget.setYear(year);
                    return newBudget;
                });

        budget.setAmount(newLimit);
        budgetRepository.save(budget);

        return getBudgetStats();
    }
}
