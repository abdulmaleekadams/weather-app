import clsx from 'clsx';
import Image from 'next/image';

const WeatherIcon = (
  props: React.HTMLProps<HTMLDivElement> & { iconName: string }
) => {
  return (
    <div {...props} className={clsx('relative h-20 w-20')}>
      <Image
        src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
        width={100}
        height={100}
        alt='weather-icon'
        className='absolute h-full w-full'
      />
    </div>
  );
};

export default WeatherIcon;
