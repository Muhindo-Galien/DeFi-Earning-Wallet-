"use client"; 
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import NavBar from '@/components/NavBar'
import { isWallectConnected } from '@/services'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

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
      <Toaster />
    </>  )
}
