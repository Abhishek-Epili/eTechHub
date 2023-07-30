
import Navbar from './components/navbar'
import { Routes , Route} from 'react-router-dom'
import ProdcutPage from './components/products'
import Home from './components/home'

function App() {
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route exact path='/product' element={<ProdcutPage/>}/>
      </Routes>
    </>
  )
}

export default App
