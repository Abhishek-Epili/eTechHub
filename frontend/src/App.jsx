import Navbar from './components/navbar'
import { Routes, Route } from 'react-router-dom'
import ProductPage from './components/products'
import Home from './components/home'
import ViewProduct from './components/viewproduct'
import LoginPage from './components/login'
import { gapi } from 'gapi-script'
import { useEffect } from 'react'

function App() {
  const client_id = "463364694212-9sunroepoi627r4p98o8i67nl4c7f24p.apps.googleusercontent.com";
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: client_id,
        scope: ""
      })
    }

    gapi.load('client:auth2',start)
  })

  return (
    <>
      <Navbar />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route exact path='/product' element={<ProductPage />} />
        <Route path='/viewproduct/:productType/:productId/*' element={<ViewProduct />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
