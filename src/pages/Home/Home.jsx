import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className='content'>
        <h1 className='white1'>مرحباً بك في Miroire</h1>
        <p>"ابحث، احجز، تزيّن - كل اختيارات الصالونات في مكان واحد"</p>
        <div className='home-btn'>
          <Link to="/service">
            <button>خدماتنا</button>
          </Link>
          <Link to="/contact">
            <button>تواصل معنا</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
