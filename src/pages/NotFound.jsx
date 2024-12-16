import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/homebackground.jpg')" }}
    >
      <div className="text-center bg-opacity-60 bg-black p-8 rounded-lg max-w-md mx-auto">
        <h1 className="text-7xl font-extrabold text-white">404</h1>
        <p className="text-xl text-white mt-4">عذرًا! الصفحة التي تبحث عنها غير موجودة.</p>
        <Link
          to="/about"
          className="mt-6 inline-block text-lg text-blue-400 hover:text-blue-600 font-semibold"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
