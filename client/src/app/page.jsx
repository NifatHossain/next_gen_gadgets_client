import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import HomePage from '@/components/layouts/HomePage'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
        <HomePage/>
        <Footer/>
    </div>
  )
}

export default page