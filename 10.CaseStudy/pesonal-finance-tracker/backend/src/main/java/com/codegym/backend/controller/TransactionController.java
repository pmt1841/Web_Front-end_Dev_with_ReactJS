package com.codegym.backend.controller;

import com.codegym.backend.model.dto.CategoryStatDto;
import com.codegym.backend.model.dto.MonthlyStatDto;
import com.codegym.backend.model.dto.SummaryStatDto;
import com.codegym.backend.model.transaction.Transaction;
import com.codegym.backend.model.transaction.TransactionType;
import com.codegym.backend.service.transaction.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<Page<Transaction>> getAll(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) TransactionType type,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long minAmount,
            @RequestParam(required = false) Long maxAmount,
            @PageableDefault(size = 5, sort = "date", direction = Sort.Direction.DESC) Pageable pageable) {

        return ResponseEntity.ok(transactionService.getAllTransactions(
                keyword, categoryId, type, startDate, endDate, minAmount, maxAmount, pageable));
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