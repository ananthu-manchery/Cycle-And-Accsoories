import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './users/Products';
import Upload from './admin/Upload';
import Cart from './users/Cart'
import { useState } from 'react';
import { AuthProvider } from './components/AuthContext'; 

import { CartProvider } from './components/cartContext';
import ProductDetails from './users/ProductDetails'
import Wishlist from './users/Wishlist';
import SearchResults from './users/SearchResults';
import Checkout from './users/Checkout';
import Payment from './users/Payment';
import Orderstatus from './admin/Orderstatus';
import OrderConfirmation from './users/OrderConfirmation';
import OrderStatus from './users/OrderStatus';
import AdminDashboard from './admin/AdminDashboard';
import AdminUsers from './admin/AdminUsers';
import AdminProducts from './admin/AdminProducts';
import Accessory from './users/Accessory';
import About from './users/About';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';


function App() {
 
  return (
    <div className="App">
          <CartProvider>
         <AuthProvider>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/products' element={ <Products/> }/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/cart' element={ <Cart  />}/>
        <Route path="/products/:productId" element={<ProductDetails />} /> 
        <Route path='/wishlist' element={ <Wishlist  />}/>
        <Route path="/search-results" element={<SearchResults/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/orderstatus" element={<Orderstatus/>} />
        <Route path="/order-confirmation" element={<OrderConfirmation/>} />    
        <Route path="/order-status" element={<OrderStatus/>} />     
        <Route path="/adminusers" element={<AdminUsers/>} />     
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />     
        <Route path="/adminproducts" element={<AdminProducts />} />
        <Route path="/accessories" element={<Accessory/>} /> 
        
        <Route path="/aboutus" element={<About/>} /> 
        <Route path="/forgotpassword" element={<ForgotPassword/>} /> 
        <Route path="/reset-password/:token" element={<ResetPassword />} />








       
      </Routes>
    </Router>
    </AuthProvider>
    </CartProvider>
    </div>
  );
}

export default App;
