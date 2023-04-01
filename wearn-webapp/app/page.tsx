"use client"; 
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import { isWallectConnected } from '@/services'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';
import AllStablecoin from '@/components/AllStablecoin';

export default function Home() {
  useEffect(() => {
    const loadData  = async()=>{
      await isWallectConnected()
    }
    loadData()
  }, [])
  
  return (
    <>
      <NavBar/>
      <AllStablecoin/>
      <Toaster />
    </>  )
}
