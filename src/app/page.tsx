import Container from '@/ui/Container';
import ForecastWeatherDetails from '@/ui/ForecastWeatherDetails';
import WeatherDetails from '@/ui/WeatherDetails';
import WeatherIcon from '@/ui/WeatherIcon';
import WeatherSkeleton from '@/ui/WeatherSkeleton';
import Weather from '@/ui/weather';
import { converKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { convertWindSpeed } from '@/utils/convertWindSpeed';
import { metersToKilometers } from '@/utils/metersToKilometers';
import axios from 'axios';
import { format, fromUnixTime, parseISO } from 'date-fns';
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


  const uniqueDates = [
    ...new Set(
      weatherData?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split('T')[0]
      )
    ),
  ];

  // Filtering data to get the first entry after 6AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return weatherData?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6 && entry ;
    });
  });

  console.log(format(parseISO('2024-01-03 06:00:00'), 'EEEE'));
  

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
        <div className='flex gap-4'>
          {/* left */}
          <Container className='justify-center flex-col px-4 items-center w-[max-content]'>
            <p className='capitalize text-center '>
              {firstData?.weather[0].description}
            </p>
            <WeatherIcon iconName={firstData?.weather[0].icon} />
          </Container>
          <Container className='bg-yellow-500/20  px-6 gap-4 justify-between overflow-x-auto'>
            <WeatherDetails
              airPressure={`${firstData?.main.pressure} hPa`}
              visiblity={metersToKilometers(firstData?.visibility ?? 10000)}
              humidity={`${firstData?.main.humidity}%`}
              sunrise={format(
                fromUnixTime(weatherData?.city.sunrise ?? 1702949452),
                'H:mm'
              )}
              sunset={format(
                fromUnixTime(weatherData?.city.sunset ?? 1702949452),
                'H:mm'
              )}
              windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
            />
          </Container>
          {/* right */}
        </div>
      </section>
      {/*  7 day forecast data */}
      <section className='flex w-full flex-col gap-4'>
        <p className='text-2xl'>Forcast (7 days)</p>
        {firstDataForEachDate.map((d, i) => (
          <ForecastWeatherDetails
            key={i}
            airPressure={`${d?.main.pressure} hPa`}
            visiblity={metersToKilometers(d?.visibility ?? 10000)}
            humidity={`${d?.main.humidity}%`}
            sunrise={format(
              fromUnixTime(weatherData?.city.sunrise ?? 1702949452),
              'H:mm'
            )}
            sunset={format(
              fromUnixTime(weatherData?.city.sunset ?? 1702949452),
              'H:mm'
            )}
            windSpeed={convertWindSpeed(d?.wind.speed ?? 1.64)}
            date={d?.dt_txt ? format(parseISO(d?.dt_txt ?? ''), 'dd.MM') : ''}
            day={d?.dt_txt ? format(parseISO(d?.dt_txt ?? ''), 'EEEE') : ''}
            description={d?.weather[0].description ?? ''}
            weatherIcon={d?.weather[0].icon ?? ''}
            feels_like={d?.main.feels_like ?? 0}
            temp_max={d?.main.temp_max ?? 0}
            temp_min={d?.main.temp_min ?? 0}
            temp={d?.main.temp ?? 0}
          />
        ))}
      </section>
    </main>
  );
}
