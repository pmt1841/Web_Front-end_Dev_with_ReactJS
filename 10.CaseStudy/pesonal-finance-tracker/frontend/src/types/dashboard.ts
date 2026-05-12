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