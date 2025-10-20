import React from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import  Navbar from './components/Navbar'
import Home from './pages/Home'
import Books from './pages/Book'
import BookDetails from './pages/BookDetails'
import Cart from './pages/Cart'
import Checkout from './pages/checkout'
import MyOrders from './pages/MyOrders'
import Wishlist from './pages/wishlist'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { CartProvider } from './components/CartContext'
import { OrderProvider } from './components/OrderContext'
import { WishlistProvider } from './components/WishlistContext'
import { AuthProvider } from './components/AuthContext'


function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                 <Route path='/books' element={<Books />} />
                 <Route path="/productDetails/:id" element={<BookDetails />} />
                 <Route path='/cart' element={<Cart />} />
                 <Route path='/checkout' element={<Checkout />} />
                 <Route path='/orders' element={<MyOrders />} />
                 <Route path='/wishlist' element={<Wishlist />} />
                 <Route path='/login' element={<Login />} />
                 <Route path='/signup' element={<Signup />} />
                 <Route path='/dashboard' element={<Dashboard />} />
                 <Route path='/profile' element={<Home />} /> {/* Placeholder for profile */}
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  )
}

export default App
