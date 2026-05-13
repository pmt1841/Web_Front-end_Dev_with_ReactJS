export interface SummaryStats {
    income: number;
    expense: number;
}

export interface MonthlyStat {
    month: string;
    income: number;
    expense: number;
    limit?: number;
}

export interface CategoryStat {
    id: number;
    label: string;
    color: string;
    value: number;
}