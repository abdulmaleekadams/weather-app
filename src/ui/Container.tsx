import clsx from 'clsx';


const Container = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={clsx(
        'w-full bg-white border rounded-xl flex py-4 shadow-sm',
        props.className
      )}
    />
  );
};

export default Container;
