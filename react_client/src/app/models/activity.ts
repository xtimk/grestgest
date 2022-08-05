import { Period } from "./period";

export interface Activity {
    id: number;
    name: string;
    description: string;
    periodId: number;
    period: Period;
}

export interface ActivityCreation {
    name: string;
    description: string;
    periodId: number;
}