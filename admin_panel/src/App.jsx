import { useState } from 'react'
import AdminLogin from './components/adminLogin'
import { Routes, Route } from 'react-router-dom'
import AdminPanel from './components/adminPanel'
import AddGadget from './components/addGadget'
import Dashboard from './components/dashboard'
import ViewReport from './components/viewReport'
import ViewGadget from './components/viewGadget'
import UpdateGadget from './components/updateGadget'
import VerifiedPurchase from './components/verifiedPurchases'
import ViewVerifiedReq from './components/viewVerifiedReq'
import ViewDetectedReviews from './components/viewDetectedReviews'

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
        <Route path="/verifiedpurchase" element={<VerifiedPurchase />} />
        <Route path="/updategadget/:gadget_id" element={<UpdateGadget />} />
        <Route path="/getReview/:id/:viewreview" element={<ViewVerifiedReq />} />
        <Route path="/viewfakereviews" element={<ViewDetectedReviews />} />
      </Routes>
      </div>
    </div>
  )
}

export default App
