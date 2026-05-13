package com.codegym.backend.dto.transaction;

public record MonthlyStatDto(String month, Long income, Long expense, Long limit) {}
