import React from 'react'
import { Button } from './components/ui/button'
import Navbar from './pageComponents/Navbar'
import { Route, Routes } from 'react-router-dom'
import Contact from './pageComponents/Contact'
import Footer from './pageComponents/Footer'
import Home from './pageComponents/Home'
import LoginPage from './pageComponents/CustomerLogin'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
