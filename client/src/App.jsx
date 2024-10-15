import React from 'react'
import { Button } from './components/ui/button'
import Navbar from './pageComponents/Navbar'
import { Route, Routes } from 'react-router-dom'
import Contact from './pageComponents/Contact'
import Footer from './pageComponents/Footer'
import Home from './pageComponents/Home'
import LoginPage from './pageComponents/CustomerLogin'
import AllServices from './pageComponents/AllServices'
import WorkersList from './pageComponents/WorkersList'
import ServicePage from './pageComponents/ServicePage'
import WorkerDetail from './pageComponents/WorkerDetail'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/services' element={<AllServices />}/>
        <Route path='/workersList' element={<WorkersList />}/>
        <Route path='/service/maid' element={<ServicePage />}/>
        <Route path='/worker/:id' element={<WorkerDetail />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
