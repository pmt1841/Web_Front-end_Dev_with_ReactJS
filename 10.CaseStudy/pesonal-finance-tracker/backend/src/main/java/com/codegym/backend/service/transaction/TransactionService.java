package com.codegym.backend.service.transaction;

import com.codegym.backend.dto.category.CategoryStatDto;
import com.codegym.backend.dto.transaction.MonthlyStatDto;
import com.codegym.backend.dto.transaction.SummaryStatDto;
import com.codegym.backend.dto.transaction.TransactionFilter;
import com.codegym.backend.entity.transaction.Transaction;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TransactionService {
    Page<Transaction> getAllTransactions(TransactionFilter filter, Pageable pageable);

    Transaction saveTransaction(@Valid Transaction transaction);

    Optional<Transaction> findTransactionById(Long id);

    boolean exists(Long id);

    void deleteTransaction(Long id);

    Optional<Transaction> updateTransaction(Long id, Transaction transaction);

    SummaryStatDto getSummaryStats();

    List<CategoryStatDto> getCategoryStats();

    List<MonthlyStatDto> getMonthlyStats();

}
