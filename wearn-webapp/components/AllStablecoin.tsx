import React, { useState } from 'react';
import dailogo from '../public/dailogo1.png';
import tether from '../public/tether.png';
import usdclog from '../public/usdclogo.png';
import Form from './Form';

const srcDai = dailogo.src;
const srcuSdclog = usdclog.src;
const srcTether = tether.src;

const AllStablecoin = () => {
  return (
    <>
      <Form
        srcToken={srcDai}
        tokenSubtittle={'DAI Stablecoin'}
        tokenName={'DAI'}
        currency={'DAI'}
        interestRate={4.87}
        availableBalance={0.0}
        contractTokenBalance={0.0}
        contractYearnBalance={0.0}
      />
      <Form
        srcToken={srcuSdclog}
        tokenSubtittle={'USDC'}
        tokenName={'UDS Coin'}
        currency={'USDC'}
        interestRate={5.54}
        availableBalance={0.0}
        contractTokenBalance={0.0}
        contractYearnBalance={0.0}
      />
    </>
  );
};

export default AllStablecoin;
