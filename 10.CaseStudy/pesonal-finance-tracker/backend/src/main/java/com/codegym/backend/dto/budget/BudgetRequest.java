package com.codegym.backend.dto.budget;

import lombok.Data;

@Data
public class BudgetRequest {
    private Long monthlyLimit;
}
