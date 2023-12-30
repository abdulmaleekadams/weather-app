import clsx from 'clsx';
import { IoSearch } from 'react-icons/io5';
type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  customClass?: string;
};

const SearchBox = ({ value, onChange, onSubmit, customClass }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className={clsx(
        'flex relative items-center justify-center h-10',
        customClass
      )}
    >
      <input
        type='text'
        placeholder='Search location'
        className='px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-yellow-500 h-full'
        onChange={onChange}
        value={value}
      />
      <button className='px-4 py-[9px] bg-yellow-500 text-white rounded-r-md focus:outline-none hover:bg-yellow-600 whitespace-nowrap h-full'>
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchBox;
