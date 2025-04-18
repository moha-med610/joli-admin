import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Cookies from 'js-cookie';

function PrivateRoute({ children }) {
  const token = Cookies.get('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/admin/products/add" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/admin/products/edit/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
