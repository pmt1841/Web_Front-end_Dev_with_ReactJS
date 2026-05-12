import type {Category} from "./category.ts";

export interface Transaction {
    id: number;
    title: string;
    amount: number;
    category: Category;
    date: string;
    note: string;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
