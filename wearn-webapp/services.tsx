import Web3 from 'web3';
import { getGlobalState, setAlert, setGlobalState, setLoadingMsg } from './store';
import { toast } from 'react-hot-toast';
import abi from "./constants/abi.json"
import ercAbi from './constants/ercAbi.json';

const contractAddress = '0x0F6595EDC3C5864e75A987a12ebC2911B1C33330';
const contractABI = abi.abi;
const daiTokenAddress = '0x68194a729C2450ad26072b3D33ADaCbcef39D574'; // DAI token contract address
const daiTokenABI = ercAbi.abi; // DAI token contract ABI
declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}

let ethereum: any | null = null;
let web3: Web3 | null = null;

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
    if (chainID == "0xaa36a7" ){
      setGlobalState('currentChain', 'Sepolia');
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

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount');

  if (connectedAccount) {
    if (!web3) {
      web3 = new Web3(window.ethereum || window.web3.currentProvider);
    }
  
    const contract = new web3.eth.Contract(contractABI,contractAddress );
    console.log(contract);
    
    return contract;
  } else {
    return getGlobalState('contract');
  }
};
const getMyBalance = async()=>{
  const sender = getGlobalState('connectedAccount');
  const daiTokenContract = new web3.eth.Contract(daiTokenABI, daiTokenAddress);
  console.log('DAI Token Contract: ', daiTokenContract);

  const daiBalance = await daiTokenContract.methods.balanceOf(sender).call();
  const daiBalanceInEth =Number(await web3.utils.fromWei(daiBalance, 'ether')).toFixed(2);
  console.log('DAI Balance in Ether: ', daiBalanceInEth);
  setGlobalState('myDAIBalance', daiBalanceInEth)
  return daiBalance;
}

// ==================================================
const investDAI = async (amount: string) => {
  try {
    const sender = getGlobalState('connectedAccount');
    const value = web3 ? web3.utils.toWei(amount, 'ether') : '';
    console.log('Value in Wei: ', value);
    const daiBalanceInEth = await getMyBalance()

    if (Number(daiBalanceInEth) < Number(amount)) {
      toast.error('Insufficient DAI balance');
      return;
    }

    const contract = await getEthereumContract();
    toast.success('Send tokens initlialized');
    setGlobalState('started', true);
    setLoadingMsg("Send tokens")
    
    const tx = await daiTokenContract.methods
      .approve(contract.options.address, value)
      .send({ from: sender });
    console.log('DAI Token Approval Tx: ', tx);

    const investTx = await contract.methods
      .save(value)
      .send({ from: sender });
    console.log('Invest Tx: ', investTx);

    setAlert('Token sent!','green')
  } catch (error) {
    setAlert("Proccess failed",'red')
    console.log(error);
    setGlobalState('started', false);
  }
};

// ===================================================
const investUSDC =async(amount: number)=>{
  const sender = getGlobalState('connectedAccount');
  const value = window.web3.utils.toWei(amount, 'ether');
  try {
    const contract = await getEtheriumContract();
    toast.success('Transfer started...');
    setGlobalState('started', true);
    const tx = await contract.methods
    .saveUSDC(value)
    .send({ from: sender });
  toast.success('Token sent successfully');

  } catch (error) {
    console.log(error);
    setGlobalState('started', false);
    toast.error('Transfer Failed');
  }
}
// ================================================
const getDAIBalance = async () => {
  const daiTokenContract = new web3.eth.Contract(daiTokenABI, daiTokenAddress);
  const contractBalance = await daiTokenContract.methods.balanceOf(contractAddress).call();
  const contractBalanceInEth = web3.utils.fromWei(contractBalance, 'ether');
  console.log('DAI Balance in Ether: ', contractBalanceInEth);
  setGlobalState('DAIBalance',contractBalanceInEth)
};

const getYDAIBalance = async () => {
  const contract = await getEthereumContract()
  const yDaiTokenContract =  await contract?.methods.balance().call()
  const contractBalanceInEth = web3.utils.fromWei(yDaiTokenContract, 'ether');
  console.log('DAI Balance in Ether: ', contractBalanceInEth);
  setGlobalState('yDAIBalance',contractBalanceInEth)
};



export {
  connectWallet,
  isWallectConnected,
  getEthereumContract,
  investDAI,
  investUSDC,
  getDAIBalance,
  getYDAIBalance,
  getMyBalance
}
