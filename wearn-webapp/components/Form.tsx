import React, { useState } from 'react';
import { BiChevronDownCircle, BiChevronUpCircle } from 'react-icons/bi';

type Iprops = {
  srcToken: string;
  tokenSubtittle: string;
  tokenName: string;
  currency: string;
  interestRate: number;
  availableBalance: number;
  contractTokenBalance: number;
  contractYearnBalance: number;
  // open:boolean
};

const Form = ({
  srcToken,
  tokenSubtittle,
  tokenName,
  currency,
  interestRate,
  availableBalance,
  contractYearnBalance,
  contractTokenBalance,
}: // open
Iprops) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='mx-4 md:mx-0'>
        <div className='max-w-2xl mx-auto shadow-md rounded-lg mt-4 border '>
        <div className='flex justify-between gap-0.5 p-2 sm:p-4'>
          <div className='flex items-center gap-2'>
            <div className='w-10'>
              <img src={srcToken} alt='dai-log' className='w-100' />
            </div>
            <div className='p-0 m-0'>
              <p className='text-base font-medium'>{tokenName} </p>
              <p className='m-0 text-xs text-gray-400'>{tokenSubtittle}</p>
            </div>
          </div>
          <div className='flex justify-between items-center w-7/12 sm:w-6/12 gap-6'>
            <div className='p-0 m-0'>
              <p className='text-base font-medium '>{interestRate} % </p>
              <p className='m-0 text-xs text-gray-400'>Interest Rate</p>
            </div>
            <div className='p-0 m-0'>
              <p className='text-base font-medium'>{availableBalance}.00 DAI </p>
              <p className='m-0 text-xs text-gray-400'>Available Balance</p>
            </div>
            {!open ? (
              <BiChevronUpCircle
                onClick={() => setOpen(!open)}
                className='text-xl text-gray-400 cursor-pointer'
              />
            ) : (
              <BiChevronDownCircle
                onClick={() => setOpen(!open)}
                className='text-xl text-gray-400 cursor-pointer'
              />
            )}
          </div>
        </div>
        <div
          className={`${
            !open ? 'hidden' : ''
          } py-3 px-2 md:px-4 flex justify-between items-center w-full gap-6`}
        >
          <div className='w-3/6'>
            <p className='float-right text-sm mr-4'>
              Balance: {contractTokenBalance}.00 {currency}
            </p>
            <input
              type='number'
              min={1}
              placeholder='0.00'
              className='bg-transparent border outline-none border-gray-400 py-1 px-2.5 rounded-full w-full'
            />
            <button className='bg-transparent border border-blue-500 py-1 px-1.5 rounded-full w-full mt-3 text-blue-500'>
              Earn
            </button>
          </div>
          <div className='w-3/6'>
            <p className='float-right text-sm mr-4'>
              {contractYearnBalance}.000 y{currency}
            </p>
            <input
              type='number'
              min={1}
              placeholder='0.00'
              className='bg-transparent border outline-none border-gray-400 py-1 px-2.5 rounded-full w-full'
            />
            <button className='bg-transparent border border-green-500 py-1 px-1.5 rounded-full w-full mt-3  text-green-500'>
              Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
