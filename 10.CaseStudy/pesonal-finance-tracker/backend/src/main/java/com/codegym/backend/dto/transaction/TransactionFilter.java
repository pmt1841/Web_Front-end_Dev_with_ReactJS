package com.codegym.backend.dto.transaction;

import com.codegym.backend.entity.transaction.TransactionType;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class TransactionFilter {
    private String keyword;
    private Integer categoryId;
    private TransactionType type;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate startDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate endDate;

    private Long minAmount;
    private Long maxAmount;

}
