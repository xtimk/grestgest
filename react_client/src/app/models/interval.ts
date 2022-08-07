export interface Interval {
    id: number;
    name: string;
    day: number;
    startingTime: string;
    endingTime: string;
}

export interface IntervalCreation {
    name: string,
    day: number,
    startingTime: string,
    endingTime: string
}

export const Days: number[] = [1,2,3,4,5,6,7]

export function renderDay(n: number) {
    switch(n) {
        case 1:
            return 'Lunedì';
        case 2:
            return 'Martedì';
        case 3:
            return 'Mercoledì';
        case 4:
            return 'Giovedì';
        case 5:
            return 'Venerdì';
        case 6:
            return 'Sabato';
        case 7:
            return 'Domenica';
        default:
            return 'Undefined'
                                        
    }
}