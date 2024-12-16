import './About.css'
import { useNavigate } from 'react-router-dom';


const VendorHome = () => {
    const navigate = useNavigate();
  return (
    <div className="about">
      <main className="about-section">
        <h1 className="title">عن Miroire</h1>
        <p>
          يقدم لك الحل الأمثل لتجربة جمال متكاملة وسهلة. نحن نعرض مجموعة متنوعة من الصالونات في مدينتك، مما يوفر عليك عناء البحث والتنقل. من خلال منصتنا، يمكنك مقارنة الصالونات، الاطلاع على الخدمات المقدمة، واختيار الموعد المناسب للحجز بكل سهولة ويسر. هدفنا هو تبسيط عملية البحث والحجز، مع إمكانية قراءة تقييمات وآراء العملاء الآخرين لتستمتع بتجربة جمال فريدة دون عناء.
        </p>
        <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out shadow-lg !important"
      onClick={() => navigate('/vendorservices')}
    >
      <a
        className="text-white no-underline block w-full h-full !text-lg !font-bold !bg-transparent"
        href="/vendorservices"
        onClick={(e) => {
          e.preventDefault(); // Prevent the anchor's default navigation
          navigate('/vendorservices');
        }}
      >
        اذهب إلى الخدمات
      </a>
    </button>
      </main>
    </div>
  );
}

export default VendorHome;
