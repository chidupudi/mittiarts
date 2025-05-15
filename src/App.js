import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/aboutus';
import Policies from './pages/Policies';
import ContactUs from './pages/Contact';
import AuthForm from './components/AuthForm';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
// import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
       <Route path="/" element={<Welcome />} />
       <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/policies" element={<Policies />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      </Routes>
      {/* <Footer/> */}
      <Analytics />
    </Router>
  );
};

export default App;
