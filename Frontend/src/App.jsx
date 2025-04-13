import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Trackorder from './pages/trackOrder/Trackorder'
import Placeorder from './pages/placeorder/Placeorder'
import Waiter from './pages/waiter/waiter'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Admin from './pages/Admin/Admin'
const App = () => {
  return (
    <>
    <div className='app'>
      <Navbar/>
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/placeorder' element={<Placeorder/>}/>
            <Route path='/track-order/:tableNumber' element={<Trackorder/>}/>
            <Route path='/waiters' element={<Waiter/>}/>
            <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </div>
      <Footer/>
    </>
  )
}

export default App
