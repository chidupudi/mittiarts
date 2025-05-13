import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/aboutus';
import Policies from './pages/Policies';

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
      </Routes>
    </Router>
  );
};

export default App;
