package com.codegym.backend.model.dto;

public record BudgetStatDto(Long monthlyLimit, Long currentExpense, Long remaining) {}