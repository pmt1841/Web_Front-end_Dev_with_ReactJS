package com.codegym.backend.controller;

import com.codegym.backend.model.dto.BudgetRequest;
import com.codegym.backend.model.dto.BudgetStatDto;
import com.codegym.backend.service.budget.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class BudgetController {
    private final BudgetService budgetService;

    @GetMapping("")
    public ResponseEntity<BudgetStatDto> getBudgetStats() {
        return ResponseEntity.ok(budgetService.getBudgetStats());
    }

    @PutMapping("")
    public ResponseEntity<BudgetStatDto> updateBudgetStats(@RequestBody BudgetRequest request) {
        return ResponseEntity.ok(budgetService.updateBudgetStats(request.getMonthlyLimit()));
    }
}
