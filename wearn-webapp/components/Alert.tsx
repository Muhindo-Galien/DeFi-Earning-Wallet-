import { useGlobalState } from '../store';
import { FaRegTimesCircle } from 'react-icons/fa';
import { BsCheck2Circle } from 'react-icons/bs';

const Alert = () => {
  const [alert] = useGlobalState('alert');

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-50
      flex items-center justify-center bg-black 
      bg-opacity-50 transform transition-transform
      duration-300 ${alert.show ? 'scale-100' : 'scale-0'}`}
    >
      <div
        className='flex gap-4 justify-start items-center
        bg-[#fff] shadow-xl  rounded
       font-globalFont min-w-min py-2 px-2  mb-20'
      >
        {alert.color == 'red' ? (
          <div className='flex flex-col  items-center px-6'>
            <FaRegTimesCircle className='text-red-500 text-4xl' />
            <p 
              className='text-red-600 font-normal text-base pt-2 cursor-pointer'>{alert.msg}</p>
          </div>
        ) : (
          <div className='flex flex-col  items-center px-6'>
            <BsCheck2Circle className='text-green-600 text-4xl' />
            <p className='text-green-600 font-semibold text-base pt-2'>
              {alert.msg}
            </p>
            <a
              href=''
              className='text-green-600 font-normal underline text-base pt-4 cursor-pointer'
            >
              View on block explorer
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
