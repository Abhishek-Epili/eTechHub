import { useState } from 'react'
import AdminLogin from './components/adminLogin'
import { Routes, Route } from 'react-router-dom'
import AdminPanel from './components/adminPanel'
import AddGadget from './components/addGadget'
import Dashboard from './components/dashboard'
import ViewReport from './components/viewReport'
import ViewGadget from './components/viewGadget'
import UpdateGadget from './components/updateGadget'

function App() {

  return (
    <div className='main-app'>
      <AdminPanel />
      <div className="other-than-panel">
      <Routes>
        <Route index path='/' element={<Dashboard />} />
        <Route path='/addgadget' element={<AddGadget />} />
        <Route path='/reports' element={<ViewReport />} />
        <Route path='/viewgadget' element={<ViewGadget />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/updategadget/:gadget_id" element={<UpdateGadget />} />
      </Routes>
      </div>
    </div>
  )
}

export default App
