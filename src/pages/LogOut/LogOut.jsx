import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './LogOut.css';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logging out
    setTimeout(() => {
      onLogout();  // Call the onLogout function to clear login state

      // Redirect to the login page after timeout
      navigate('/login');
    }, 2000); // 2 seconds before redirecting
  }, [navigate, onLogout]);

  return (
    <div className="logout-container">
      <div className="logout-message">
        <h2>جاري تسجيل الخروج...</h2>
        <p>من فضلك انتظر لحظة بينما نقوم بتسجيل الخروج.</p>
      </div>
    </div>
  );
};

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Logout;
