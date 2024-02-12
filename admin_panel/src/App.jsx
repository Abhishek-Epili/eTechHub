import { useState } from 'react'
import AdminLogin from './components/adminLogin'
import { Routes, Route } from 'react-router-dom'
import AdminPanel from './components/adminPanel'
import AddGadget from './components/addGadget'
import Dashboard from './components/dashboard'

function App() {

  return (
    <>
    <AdminPanel/> 
    <Routes>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
    </Routes>
    </>
  )
}

export default App
