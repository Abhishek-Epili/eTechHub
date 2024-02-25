import Navbar from './components/navbar'
import { Routes, Route } from 'react-router-dom'
import ProductPage from './components/products'
import Home from './components/home'
import ViewProduct from './components/viewproduct'
import LoginPage from './components/login'
import { gapi } from 'gapi-script'
import { useEffect } from 'react'
import ViewImageReview from './components/viewImageReview'

function App() {
  const client_id = "463364694212-9sunroepoi627r4p98o8i67nl4c7f24p.apps.googleusercontent.com";
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: client_id,
        scope: ""
      })
    }

  })

  return (
    <>
      <Navbar />
      <Routes>
        <Route index path='/' element={<ProductPage />} />
        <Route path='/viewproduct/:productType/:gadget_id/*' element={<ViewProduct />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/viewreviewimage/:id' element={<ViewImageReview />} />
      </Routes>
    </>
  )
}

export default App