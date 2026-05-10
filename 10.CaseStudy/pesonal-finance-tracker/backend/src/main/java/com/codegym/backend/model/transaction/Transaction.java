package com.codegym.backend.model.transaction;

import com.codegym.backend.model.category.Category;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tiêu đề không được để trống")
    @Size(max = 50, message = "Tiêu đề không được quá 50 ký tự")
    @Column(columnDefinition = "VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin")
    private String title;

    @NotNull(message = "Số tiền không được để trống")
    private Long amount;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @NotNull(message = "Danh mục không được để trống")
    @Size(max = 50, message = "Tên danh mục không được quá 50 ký tự")
    private Category category;

    @NotNull(message = "Ngày tháng không được để trống")
    @PastOrPresent(message = "Ngày giao dịch không được vượt quá thời gian hiện tại")
    private LocalDate date;

    @Size(max = 255, message = "Ghi chú không được quá 255 ký tự")
    @Column(columnDefinition = "TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin")
    private String note;

    @JsonIgnore // Cực kỳ quan trọng: Ngăn không cho trường này lọt vào chuỗi JSON trả về
    @AssertTrue(message = "Số tiền giao dịch tối thiểu phải là 1000 VNĐ (bất kể thu hay chi)")
    public boolean isAmountValid() {
        if (amount == null) {
            return true;
        }

        return Math.abs(amount) >= 1000;
    }
}
