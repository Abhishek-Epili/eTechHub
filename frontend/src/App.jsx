
import Navbar from './components/navbar'
import { Routes , Route} from 'react-router-dom'
import ProductPage from './components/products'
import Home from './components/home'
import ViewProduct from './components/viewproduct'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route exact path='/product' element={<ProductPage/>}/>
        <Route path='/viewproduct/:productType/:productId/*' element={<ViewProduct/>}/>
      </Routes>
    </>
  )
}

export default App
