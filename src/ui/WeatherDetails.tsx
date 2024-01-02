import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';
import { ImMeter } from 'react-icons/im';
import { FiDroplet } from 'react-icons/fi';
type Props = {};
export type SingleWeatherDetailsProps = {
  information: string;
  icon: React.ReactNode;
  value: string;
};
export type WeatherDetailsProps = {
  visiblity: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
};

const SingleWeatherDetails = (props: SingleWeatherDetailsProps) => {
  return (
    <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
      <p className=' whitespace-nowrap'>{props.information}</p>
      <div className='text-3xl'>{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
};

const WeatherDetails = (props: WeatherDetailsProps) => {
  const {
    visiblity = '25km',
    humidity = '61%',
    windSpeed = '7 km/h',
    airPressure = '1012 hPa',
    sunrise = '6.20',
    sunset = '18.48',
  } = props;
  return (
    <>
      <SingleWeatherDetails
        icon={<LuEye />}
        information='Visibiility'
        value={visiblity}
      />
      <SingleWeatherDetails
        icon={<FiDroplet />}
        information='Humidity'
        value={humidity}
      />
      <SingleWeatherDetails
        icon={<MdAir />}
        information='Wind Speed'
        value={windSpeed}
      />
      <SingleWeatherDetails
        icon={<ImMeter />}
        information='Air Pressure'
        value={airPressure}
      />
      <SingleWeatherDetails
        icon={<LuSunrise />}
        information='Sunrise'
        value={sunrise}
      />
      <SingleWeatherDetails
        icon={<LuSunset />}
        information='Sunset'
        value={sunset}
      />
    </>
  );
};

export default WeatherDetails;
