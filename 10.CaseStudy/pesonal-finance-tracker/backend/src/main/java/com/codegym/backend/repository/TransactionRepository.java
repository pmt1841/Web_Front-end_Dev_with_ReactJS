package com.codegym.backend.repository;

import com.codegym.backend.entity.transaction.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>, JpaSpecificationExecutor<Transaction> {
    @Query("SELECT t FROM Transaction t WHERE " +
            "(:keyword IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(t.note) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
            "(:categoryId IS NULL OR t.category.id = :categoryId) AND " +
            "(:type IS NULL OR (:type = 'INCOME' AND t.amount > 0) OR (:type = 'EXPENSE' AND t.amount < 0)) AND " +
            "(t.date BETWEEN :startDate AND :endDate) AND " +
            "(:minAmount IS NULL OR ABS(t.amount) >= :minAmount) AND " +
            "(:maxAmount IS NULL OR ABS(t.amount) <= :maxAmount)")
    Page<Transaction> filterTransactions(
            @Param("keyword") String keyword,
            @Param("categoryId") Integer categoryId,
            @Param("type") String type,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("minAmount") Long minAmount,
            @Param("maxAmount") Long maxAmount,
            Pageable pageable
    );

    // 1. Tính tổng THU (amount > 0)
    @Query("SELECT COALESCE(SUM(t.amount), 0L) FROM Transaction t WHERE t.amount > 0 AND MONTH(t.date) = :month AND YEAR(t.date) = :year")
    Long getTotalIncomeByMonth(@Param("month") int month, @Param("year") int year);

    // 2. Tính tổng CHI (amount < 0)
    @Query("SELECT COALESCE(SUM(t.amount), 0L) FROM Transaction t WHERE t.amount < 0 AND MONTH(t.date) = :month AND YEAR(t.date) = :year")
    Long getTotalExpenseByMonth(@Param("month") int month, @Param("year") int year);

    // 3. Thống kê CHI theo DANH MỤC
    @Query("SELECT c.id, c.name, c.color, ABS(SUM(t.amount)) " +
            "FROM Transaction t JOIN t.category c " +
            "WHERE t.amount < 0 AND MONTH(t.date) = :month AND YEAR(t.date) = :year " +
            "GROUP BY c.id, c.name, c.color")
    List<Object[]> getExpenseByCategory(@Param("month") int month, @Param("year") int year);

    // 4. Thống kê THU/CHI theo từng THÁNG
    @Query("SELECT MONTH(t.date), " +
            "SUM(CASE WHEN t.amount > 0 THEN t.amount ELSE 0L END), " +
            "SUM(CASE WHEN t.amount < 0 THEN t.amount ELSE 0L END) " +
            "FROM Transaction t WHERE YEAR(t.date) = :year " +
            "GROUP BY MONTH(t.date) ORDER BY MONTH(t.date)")
    List<Object[]> getMonthlyStats(@Param("year") int year);
}
