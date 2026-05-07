package com.codegym.backend.model.category;

import com.codegym.backend.model.transaction.TransactionType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Tên danh mục không được để trống")
    @Size(max = 50, message = "Tên danh mục không được quá 50 ký tự")
    @Column(unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    private String icon;

    private String color;
}
