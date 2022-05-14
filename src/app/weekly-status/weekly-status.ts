export interface IWeeklyStatus {
    day: string;
    max: number;
    min: number;
    icon: string;
    weather: string;
}

export const initialWeeklyWeatherDetails: IWeeklyStatus[] = [{
    day: '',
    max: 0,
    min: 0,
    icon: '',
    weather: ''
}]