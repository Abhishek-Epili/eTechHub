import { useState } from 'react'
import AdminLogin from './components/adminLogin'
import { Routes, Route } from 'react-router-dom'
import AdminPanel from './components/adminPanel'

function App() {

  return (
    <>
      <Routes>
        <Route index path='/' element={<AdminLogin/>}/>
        <Route path='/adminpanel' element={<AdminPanel/>}/>
      </Routes>
    </>
  )
}

export default App
