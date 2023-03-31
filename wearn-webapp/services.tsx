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
const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

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

export {
  connectWallet,
  isWallectConnected
}