export interface ICurrentWeatherDetails {
    temp: number;
    icon: string;
    pressure: number;
    humidity: number;
    sunrise: number;
    sunset: number;
}

export const initialCurrentWeatherDetails: ICurrentWeatherDetails = {
    temp: 0,
    icon: '',
    pressure: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0
}