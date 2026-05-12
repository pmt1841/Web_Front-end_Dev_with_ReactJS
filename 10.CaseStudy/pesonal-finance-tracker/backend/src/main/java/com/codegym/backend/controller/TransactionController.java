package com.codegym.backend.controller;

import com.codegym.backend.dto.category.CategoryStatDto;
import com.codegym.backend.dto.transaction.MonthlyStatDto;
import com.codegym.backend.dto.transaction.SummaryStatDto;
import com.codegym.backend.dto.transaction.TransactionFilter;
import com.codegym.backend.entity.transaction.Transaction;
import com.codegym.backend.service.transaction.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<Page<Transaction>> getAll(
            TransactionFilter filter,
            @PageableDefault(size = 5, sort = "date", direction = Sort.Direction.DESC) Pageable pageable) {

        return ResponseEntity.ok(transactionService.getAllTransactions(filter, pageable));
    }

    @PostMapping
    public Transaction create(@Valid @RequestBody Transaction transaction) {
        return transactionService.saveTransaction(transaction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> update(@PathVariable("id") Long id,
                                              @Valid @RequestBody Transaction transaction) {
        return transactionService.updateTransaction(id, transaction)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        if (!transactionService.exists(id)) return ResponseEntity.notFound().build();

        transactionService.deleteTransaction(id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/stats/summary")
    public ResponseEntity<SummaryStatDto> getSummaryStats() {
        return ResponseEntity.ok(transactionService.getSummaryStats());
    }

    @GetMapping("/stats/category")
    public ResponseEntity<List<CategoryStatDto>> getCategoryStats() {
        return ResponseEntity.ok(transactionService.getCategoryStats());
    }

    @GetMapping("/stats/monthly")
    public ResponseEntity<List<MonthlyStatDto>> getMonthlyStats() {
        return ResponseEntity.ok(transactionService.getMonthlyStats());
    }

}