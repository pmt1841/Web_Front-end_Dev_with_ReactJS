package com.codegym.backend.dto.budget;

public record BudgetStatDto(Long monthlyLimit, Long currentExpense, Long remaining) {}