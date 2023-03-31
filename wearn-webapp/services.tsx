import Web3 from 'web3';
import { getGlobalState, setGlobalState } from './store';
import { toast } from 'react-hot-toast';
import { log } from 'console';

declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}

let ethereum: { request: (arg0: { method: string; }) => any; } | null = null;
let web3 = null;

if (typeof window !== 'undefined') {
  ethereum = window.ethereum;
  web3 = new Web3(ethereum || window.web3.currentProvider);
}

const connectWallet = async () => {
  try {
    if (!ethereum) return console.log('Please install Metamask');
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase());
    window.location.reload();
  } catch (error:any) {
    console.log(error.message);
    toast.error(error.message);
  }
};


const isWallectConnected = async () => {
  try {
    if (!ethereum) return console.log('Please install Metamask');
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    window.ethereum.on('chainChanged', (chainId: any) => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase());
      await isWallectConnected();
      window.location.reload();
    });

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase());
    } else {
      toast.error('Please install Metamask');

      setGlobalState('connectedAccount', '');
    }
    const chainID =  await window.ethereum.request({method: 'eth_chainId'})
    console.log('chainID: ', chainID);
    if (chainID == "0xaa36a7" ){
      setGlobalState('currentChain', 'Sepolia');
      console.log("here");
      
    }
    else{
      console.log("here");
      toast.error('Can only access Sepolia')
      setGlobalState('connectedAccount', '');
    }
  } catch (error) {
    reportError(error);
  }
};

const getEtheriumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount');

  if (connectedAccount) {
    const web3 = window.web3;
    const contract = new web3.eth.Contract('abi.abi', 'contractAddress');
    setGlobalState('contract', await contract);

    return contract;
  } else {
    return getGlobalState('contract');
  }
};

export {
  connectWallet,
  isWallectConnected,
  getEtheriumContract
}