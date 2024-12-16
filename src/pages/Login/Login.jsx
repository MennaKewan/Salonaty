import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';  // Axios for HTTP requests
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './signup.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();  // Initialize the navigate function

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and set loading state
    setError('');
    setLoading(true);

    try {
      // Post the user data to the backend
      const response = await axios.post(
        'https://the-real-project-backend-production-de46.up.railway.app/users/login',
        formData
      );

      // Log the response to understand its structure
      console.log('Response data:', response.data);

      // If response.data is directly the token
      if (response.data) {
        const token = response.data;
        console.log('Login successful:', token);

        // Decode JWT token to extract user role
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userRole = payload.role;

        // Pass token and role to the parent component
        onLogin(token, userRole);

        // Redirect to the about page after successful login
        navigate('/about');  // Redirects to /about
      } else {
        console.error('Unexpected response data:', response.data);
        setError('Login failed: No token received.');
      }
    } catch (err) {
      console.error('Error:', err);  // Log the entire error object for debugging

      // Handle error based on the error type
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'An error occurred'}`);
      } else if (err.request) {
        setError('Network error: No response from the server.');
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <div className='content'>
        <h1 className="title1">تسجيل الدخول</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="أدخل البريد الإلكتروني"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>

          {error && <div dir='ltr' className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;


