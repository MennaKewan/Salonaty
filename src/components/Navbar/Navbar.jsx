

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({ isLoggedIn , role }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // حالة القائمة
  const [isDashboardOpen, setIsDashboardOpen] = useState(false); // حالة الـ Dashboard
  const [isScrolled, setIsScrolled] = useState(false); // حالة التمرير

  // تغيير حالة التمرير عندما يتغير التمرير في الصفحة
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // عندما ينزل التمرير أكثر من 50px
      } else {
        setIsScrolled(false); // إذا كان التمرير أعلى من 50px
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsDashboardOpen(!isDashboardOpen); // فتح الـ Dashboard عند فتح القائمة
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'open' : ''}`}>
      <div className="container">
        <div className="logo">
          <Link to="/about">
            <img src="/assets/main-logo.jpeg" alt="Logo" />
          </Link>
        </div>
        <div className={`links ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            {isLoggedIn ? (
              role === 'vendor' ? (
                <>
                  <li><Link to="/vendorhome">الصفحة الرئيسية</Link></li>
                  <li><Link to="/vendorservices">خدماتي</Link></li>
                  <li><Link to="/customerratings">اراء العملاء</Link></li>
                  <li><Link to="/orders">الطلبات</Link></li>
                  <li><Link to="/logout">تسجيل الخروج</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/home">الصفحة الرئيسية</Link></li>
                  <li><Link to="/menu">قائمة الصلونات</Link></li>
                  <li><Link to="/service">خدمات الصالونات</Link></li>
                  <li><Link to="/order">طلباتي</Link></li>
                  <li><Link to="/contact">تواصل معنا</Link></li>
                  <li><Link to="/logout">تسجيل الخروج</Link></li>
                </>
              )
            ) : (
              <>
                <li><Link to="/about">عن الخدمة</Link></li>
                <li><Link to="/signup">التسجيل</Link></li>
                <li><Link to="/login">تسجيل الدخول</Link></li>
              </>
            )}
          </ul>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
      {isDashboardOpen && (
        <div className="sidebar">
          <ul>
            {isLoggedIn ? (
              role === 'vendor' ? (
                <>
                  <li><Link to="/">الصفحة الرئيسية</Link></li>
                  <li><Link to="/vendorservices">خدماتي</Link></li>
                  <li><Link to="/customerratings">اراء العملاء</Link></li>
                  <li><Link to="/orders">الطلبات</Link></li>
                  <li><Link to="/logout">تسجيل الخروج</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/home">الصفحة الرئيسية</Link></li>
                  <li><Link to="/menu">قائمة الصلونات</Link></li>
                  <li><Link to="/service">خدمات الصالونات</Link></li>
                  <li><Link to="/order">طلباتي</Link></li>
                  <li><Link to="/contact">تواصل معنا</Link></li>
                  <li><Link to="/logout">تسجيل الخروج</Link></li>
                </>
              )
            ) : (
              <>
                <li><Link to="/about">عن الخدمة</Link></li>
                <li><Link to="/signup">التسجيل</Link></li>
                <li><Link to="/login">تسجيل الدخول</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
};

export default Navbar;
