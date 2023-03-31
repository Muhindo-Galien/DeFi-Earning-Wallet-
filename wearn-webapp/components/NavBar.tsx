import React from 'react';
import { RiWallet2Fill } from 'react-icons/ri';
import { truncate, useGlobalState } from '../store';
import { connectWallet } from '../services';

const NavBar = () => {
  const [connectedAccount] = useGlobalState('connectedAccount');

  return (
    <div className='max-w-2xl mx-auto shadow-md m-4 rounded-full'>
      <div className='flex justify-between py-2 px-3'>
        <h1 className='text-2xl font-medium text-gray-800 flex items-center'>
          <RiWallet2Fill className='text-3xl' /> Wearn
        </h1>
        {/* {truncate(connectedAccount, 5, 5, 13)} */}
        {connectedAccount ? (
          <button
            disabled
            onClick={() => connectWallet()}
            className='py-2 px-2.5 border border-gray-700 text-gray-950  rounded-full'
          >
            {truncate(connectedAccount, 5, 5, 13)}
          </button>
        ) : (
          <button
            onClick={() => connectWallet()}
            className='py-2 px-2.5 bg-blue-500 text-gray-50 rounded-full'
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
