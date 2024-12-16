import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element, role }) => {
  // Access token and role from localStorage inside the component
  const token = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');

  // Check if there's no token or if the role doesn't match
  if (!token || storedRole !== role) {
    return <Navigate to="/login" />;
  }

  // Return the element if the user is authenticated and the role matches
  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  role: PropTypes.string.isRequired,
};

export default PrivateRoute;
