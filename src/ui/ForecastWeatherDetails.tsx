import { converKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import Container from './Container';
import WeatherDetails, { WeatherDetailsProps } from './WeatherDetails';
import WeatherIcon from './WeatherIcon';

export type ForecastWeatherDetailsProps = WeatherDetailsProps & {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
};

const ForecastWeatherDetails = (props: ForecastWeatherDetailsProps) => {
  const {
    visiblity = '25km',
    humidity = '61%',
    windSpeed = '7 km/h',
    airPressure = '1012 hPa',
    sunrise = '6.20',
    sunset = '18.48',
    weatherIcon = '02d',
    date = '19.09',
    day = 'Tuesday',
    temp = 255,
    feels_like,
    temp_min,
    temp_max,
    description = 'Broken cloud',
  } = props;
  return (
    <Container className=' gap-4'>
      <section className=' flex gap-4 items-center px-4'>
        <div>
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className=' text-sm'>{day}</p>
        </div>

        <div className='flex flex-col px-4'>
          <span className='text-5xl'>{converKelvinToCelsius(temp ?? 0)}°</span>
          <p className='text-xs space-x-1 whitespace-nowrap'>
            <span>Feels like</span>
            <span>{converKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className='text-xs space-x-2'>
            <span>{converKelvinToCelsius(temp_min ?? 0)}°↓</span>
            <span>{converKelvinToCelsius(temp_max ?? 0)}°↑</span>
          </p>
          <p className=' capitalize'>{description}</p>
        </div>
      </section>

      <section className=' overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
};

export default ForecastWeatherDetails;
