package com.codegym.backend.service.category;

import com.codegym.backend.entity.category.Category;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> getAll();

    Category saveCategory(@Valid Category category);

    void deleteCategory(Integer id);

    boolean exists(Integer id);

    Optional<Category> updateCategory(Integer id, @Valid Category category);
}
