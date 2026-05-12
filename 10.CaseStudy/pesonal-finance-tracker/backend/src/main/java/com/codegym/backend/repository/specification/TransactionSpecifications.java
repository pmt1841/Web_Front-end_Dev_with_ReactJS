package com.codegym.backend.repository.specification;

import com.codegym.backend.dto.transaction.TransactionFilter;
import com.codegym.backend.entity.transaction.Transaction;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class TransactionSpecifications {

    public static Specification<Transaction> getFilter(TransactionFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Xử lý Keyword (Trim và Lowercase)
            if (filter.getKeyword() != null && !filter.getKeyword().trim().isEmpty()) {
                String searchKeyword = filter.getKeyword().trim().toLowerCase();
                predicates.add(cb.like(cb.lower(root.get("description")), "%" + searchKeyword + "%"));
            }

            // 2. Xử lý Category ID
            if (filter.getCategoryId() != null) {
                predicates.add(cb.equal(root.get("category").get("id"), filter.getCategoryId()));
            }

            // 3. Xử lý Type (Enum)
            if (filter.getType() != null) {
                predicates.add(cb.equal(root.get("category").get("transactionType"), filter.getType()));
            }

            // 4. Xử lý Start Date
            if (filter.getStartDate() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("date"), filter.getStartDate()));
            }

            // 5. Xử lý End Date
            if (filter.getEndDate() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("date"), filter.getEndDate()));
            }

            // 6. Xử lý Min Amount
            if (filter.getMinAmount() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("amount"), filter.getMinAmount()));
            }

            // 7. Xử lý Max Amount
            if (filter.getMaxAmount() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("amount"), filter.getMaxAmount()));
            }

            // Kết hợp tất cả bằng AND
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
