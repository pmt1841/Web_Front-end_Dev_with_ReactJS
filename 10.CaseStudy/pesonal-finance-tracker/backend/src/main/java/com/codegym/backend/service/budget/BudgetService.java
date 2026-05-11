package com.codegym.backend.service.budget;

import com.codegym.backend.model.dto.BudgetStatDto;

public interface BudgetService {
    BudgetStatDto getBudgetStats();

    BudgetStatDto updateBudgetStats(Long monthlyLimit);
}
