import { Interval } from "./interval";

export interface Period {
    id: number;
    name: string;
    description: string;
    intervals: Interval[];
}