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
import { AuthProvider } from './contexts/AuthContext'
import PostAJob from './pageComponents/PostAJob'
import AllJobs from './pageComponents/AllJobs'
import JobDetailsPage from './pageComponents/jobDetails'
import WorkerRegister from './pageComponents/WorkerRegister'

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/services' element={<AllServices />}/>
        <Route path='/workersList' element={<WorkersList />}/>
        <Route path='/service/maid' element={<ServicePage />}/>
        <Route path='/worker/:id' element={<WorkerDetail />}/>
        <Route path='/post-a-job' element={<PostAJob />}/>
        <Route path='/all-jobs' element={<AllJobs />}/>
        <Route path='/jobDetail/:id' element={<JobDetailsPage />}/>
        <Route path='/register' element={<WorkerRegister />}/>
      </Routes>
      <Footer />
    </AuthProvider>
  )
}

export default App
