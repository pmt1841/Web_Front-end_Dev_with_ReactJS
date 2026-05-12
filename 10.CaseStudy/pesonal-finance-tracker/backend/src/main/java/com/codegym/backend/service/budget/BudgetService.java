package com.codegym.backend.service.budget;

import com.codegym.backend.dto.budget.BudgetStatDto;

public interface BudgetService {
    BudgetStatDto getBudgetStats();

    BudgetStatDto updateBudgetStats(Long monthlyLimit);
}
