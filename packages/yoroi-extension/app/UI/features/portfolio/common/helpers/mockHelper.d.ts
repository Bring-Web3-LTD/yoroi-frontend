export declare const now: Date;
export declare const start24HoursAgo: number;
export declare const start1WeekAgo: number;
export declare const start1MonthAgo: number;
export declare const start6MonthAgo: number;
export declare const start1YearAgo: number;
type TimePeriodType = '24H' | '1W' | '1M' | '6M' | '1Y';
export declare const getRandomTime: (startDate: number) => string;
export declare const createChartData: (timePeriod: TimePeriodType) => {
    time: string;
    value: number;
    fiatValue: number;
}[];
export {};
