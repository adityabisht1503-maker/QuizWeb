import { useEffect, useState } from 'react'

import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

import Quizlist from '../Quizlist'
import Login from '../Login'
import Signup from '../Signup'
import Header from '../Header'
import { Outlet } from 'react-router-dom'


function App() {
 

  
  
  


  return (
    <>

  <Header />
  <ToastContainer/>
  <Outlet/>
    
    </>
  )
}

export default App
