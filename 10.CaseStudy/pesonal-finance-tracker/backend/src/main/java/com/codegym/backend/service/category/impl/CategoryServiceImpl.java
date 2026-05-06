package com.codegym.backend.service.category.impl;

import com.codegym.backend.model.category.Category;
import com.codegym.backend.repository.CategoryRepository;
import com.codegym.backend.service.category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Integer id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public boolean exists(Integer id) {
        return categoryRepository.existsById(id);
    }

    @Override
    public Optional<Category> updateCategory(Integer id, Category category) {
        return categoryRepository.findById(id).map(existing -> {
            existing.setName(category.getName());
            existing.setColor(category.getColor());
            existing.setIcon(category.getIcon());
            existing.setTransactionType(category.getTransactionType());

            return categoryRepository.save(existing);
        });
    }
}
