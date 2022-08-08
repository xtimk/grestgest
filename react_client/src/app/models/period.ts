import { Interval } from "./interval";

export interface Period {
    id: number;
    name: string;
    description: string;
    intervals: Interval[];
}

export interface PeriodCreation {
    name: string;
    description: string;
    intervalIds: number[];
}