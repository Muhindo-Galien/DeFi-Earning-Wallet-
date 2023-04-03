"use client"; 
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import { getEthereumContract, isWallectConnected ,getDAIBalance, getMyBalance} from '@/services'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';
import AllStablecoin from '@/components/AllStablecoin';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';

export default function Home() {
  useEffect(() => {
    const loadData  = async()=>{
      await isWallectConnected()
      await getEthereumContract()
      await getDAIBalance()
      await getMyBalance()
    }
    loadData()
  }, [])
  
  return (
    <>
      <NavBar/>
      <AllStablecoin/>
      <Loading/>
      <Alert/>
      <Toaster />
    </>  )
}
