export const getIcon = (weather: string) => {
    switch (weather.toLowerCase()) {
        case 'clear':
            return '../assets/icons/clear.png';
        case 'clouds':
            return '../assets/icons/clouds.png';
        case "fog":
            return '../assets/icons/fog.png';
        case 'haze':
            return '../assets/icons/haze.png';
        case "mist":
            return '../assets/icons/mist.png';
        case 'rain':
            return '../assets/icons/rain.png';
        case 'smoke':
            return '../assets/icons/smoke.png';
        default:
            return '../assets/icons/clear.png'
    }
}

export const getday = (day: number) => {
    switch (day) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon';
        case 2:
            return 'Tue';
        case 3:
            return 'Wed';
        case 4:
            return 'Thu';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
        default:
            return '';
    }
}