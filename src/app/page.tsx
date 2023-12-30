import Container from '@/ui/Container';
import WeatherIcon from '@/ui/WeatherIcon';
import WeatherSkeleton from '@/ui/WeatherSkeleton';
import Weather from '@/ui/weather';
import { converKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { Suspense } from 'react';
type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export default async function Home() {
  const getWeatherData = async (place: string) => {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.OW_WEATHER_KEY}&cnt=56`
    );
    return data.data;
  };

  const weatherData: WeatherData = await getWeatherData('Nigeria');

  const firstData = weatherData?.list[0];

  // console.log(data);

  return (
    <main className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
      {/* <Suspense fallback={<WeatherSkeleton />}>
      <Weather data={data} />
    </Suspense> */}
      {/*  Current day data */}
      <section className='space-y-4'>
        <div className='space-y-2'>
          <h2 className='flex gap-1 items-end text-2xl'>
            <span className='text-2xl'>
              {format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}
            </span>
            <span className='text-lg'>
              ({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})
            </span>
          </h2>

          <Container className='gap-10 px-6 items-center'>
            {/* Temperature */}
            <div className='flex flex-col px-4'>
              <span className='text-5xl'>
                {converKelvinToCelsius(firstData?.main.temp ?? 0)}°
              </span>
              <p className='text-xs space-x-1 whitespace-nowrap'>
                <span>Feels like</span>
                <span>
                  {converKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                </span>
              </p>
              <p className='text-xs space-x-2'>
                <span>
                  {converKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
                </span>
                <span>
                  {converKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                </span>
              </p>
            </div>
            {/* Time and weather icon */}
            <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
              {weatherData?.list.map((d, i) => (
                <div
                  key={i}
                  className='flex flex-col justify-between gap-2 items-center text-xs font-semibold'
                >
                  <p className=' whitespace-nowrap'>
                    {format(parseISO(d.dt_txt), 'h:mm:a')}
                  </p>
                  <WeatherIcon iconName={d?.weather[0].icon} />
                  <p>{converKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                </div>
              ))}
            </div> 
          </Container>
        </div>
      </section>
      {/*  7 day forecast data */}
      <section className='flex w-full flex-col gap-4'>
        <p className="text-2xl">Forcast (7 days)</p>
      </section>
    </main>
  );
}
