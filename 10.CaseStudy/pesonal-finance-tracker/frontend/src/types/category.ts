export interface Category {
    id: number;
    name: string;
    transactionType: "INCOME" | "EXPENSE";
    icon?: string;
    color?: string;
}


export interface CategoryStat {
    id: number;
    label: string;
    value: number;
}