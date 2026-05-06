export interface Category {
    id: number;
    name: string;
    transactionType: "INCOME" | "EXPENSE";
    icon?: string;
    color?: string;
}

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

export interface SummaryStats {
    income: number;
    expense: number;
}

export interface MonthlyStat {
    [key: string]: string | number;
    month: string;
    income: number;
    expense: number;
}

export interface CategoryStat {
    id: number;
    label: string;
    value: number;
}