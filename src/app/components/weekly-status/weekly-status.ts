export interface IWeeklyStatus {
    day: string;
    icon: string;
    latitude: number;
    longitude: number;
    max: number;
    min: number;
    weather: string;
}

export const initialWeeklyWeatherDetails: IWeeklyStatus[] = [{
    day: '',
    icon: '',
    max: 0,
    min: 0,
    latitude: 0,
    longitude: 0,
    weather: ''
}]