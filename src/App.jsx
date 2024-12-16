import {  Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Menu from './pages/Menu/Menu';
import Contact from './pages/Contact/Contact';
import SignUp from './pages/1-Login/SignUp';
import Login from './pages/Login/Login';
import VendorServices from './pages/VendorServices';
import CustomerRatings from './pages/CustomerRatings';
import Orders from './pages/Orders';
import Logout from './pages/LogOut/LogOut';
import AuthProvider from './contexts/AuthProvider';
import PrivateRoute from './components/PrivateRouter';
import NotFound from './pages/NotFound';
import VendorHome from './pages/vendorhome/vendorhome';
import Order from './pages/Order/Order';
import Service from './pages/Service/Service';

function App() {
  const [auth, setAuth] = useState({ token: '', role: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setAuth({ token, role });
    }
  }, []);

  const handleLogin = (token, userRole) => {
    setAuth({ token, role: userRole });
    localStorage.setItem('token', token);  // Save token to localStorage
    localStorage.setItem('role', userRole);  // Save role to localStorage
  };

  const handleLogout = () => {
    setAuth({ token: '', role: '' });
    localStorage.removeItem('token');  // Clear token from localStorage
    localStorage.removeItem('role');  // Clear role from localStorage
  };

  return (
    <AuthProvider>
        <Navbar isLoggedIn={!!auth.token} role={auth.role} />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<PrivateRoute element={<Home/>} role="user" />} />
          <Route path="/menu" element={<PrivateRoute element={<Menu/>} role="user" />} />
          <Route path="/contact" element={<PrivateRoute element={<Contact/>} role="user" />} />
          <Route path="/order" element={<PrivateRoute element={<Order />} role="user" />} />
          <Route path="/service" element={<PrivateRoute element={<Service />} role="user" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/vendorhome" element={<PrivateRoute element={<VendorHome/>} role="vendor" />} />
          <Route path="/vendorservices" element={<PrivateRoute element={<VendorServices />} role="vendor" />} />
          <Route path="/customerratings" element={<PrivateRoute element={<CustomerRatings />} role="vendor" />} />
          <Route path="/orders" element={<PrivateRoute element={<Orders />} role="vendor" />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </AuthProvider>
  );
}

export default App;
