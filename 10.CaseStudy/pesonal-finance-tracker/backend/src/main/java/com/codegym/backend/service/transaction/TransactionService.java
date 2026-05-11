package com.codegym.backend.service.transaction;

import com.codegym.backend.model.dto.CategoryStatDto;
import com.codegym.backend.model.dto.MonthlyStatDto;
import com.codegym.backend.model.dto.SummaryStatDto;
import com.codegym.backend.model.transaction.Transaction;
import com.codegym.backend.model.transaction.TransactionType;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TransactionService {
    Page<Transaction> getAllTransactions(String keyword, Integer categoryId, TransactionType type,
                                         LocalDate startDate, LocalDate endDate,
                                         Long minAmount, Long maxAmount, Pageable pageable);

    Transaction saveTransaction(@Valid Transaction transaction);

    Optional<Transaction> findTransactionById(Long id);

    boolean exists(Long id);

    void deleteTransaction(Long id);

    Optional<Transaction> updateTransaction(Long id, Transaction transaction);

    SummaryStatDto getSummaryStats();

    List<CategoryStatDto> getCategoryStats();

    List<MonthlyStatDto> getMonthlyStats();

}
