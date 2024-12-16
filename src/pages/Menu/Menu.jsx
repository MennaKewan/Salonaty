import  { useState } from 'react';
import './Menu.css';

const salons = [
  { name: 'صالون لمسات', image: '/assets/salon1.jpg' },
  { name: 'صالون قصر الملكة', image: '/assets/salon2.jpg' },
  { name: 'صالون آش', image: '/assets/salon3.jpg' },
  { name: 'صالون نجوتي', image: '/assets/salon4.jpg' },
  { name: 'صالون ميس الجمال', image: '/assets/salon5.jpg' },
  { name: 'صالون نولوي', image: '/assets/salon6.jpg' },
];

const servicesData = {
  'خدمات الشعر': [
    { name: 'قص الشعر', price: '60-120 ريال' },
    { name: 'صبغ الشعر', price: '500-1600 ريال' },
    { name: 'استشوار', price: '80-120 ريال' },
    { name: 'علاجات الشعر', price: '700-2000 ريال' },
  ],
  'خدمات المكياج': [
    { name: 'مكياج سهرة', price: '400 ريال' },
    { name: 'مكياج مناسبات', price: '450 ريال' },
    { name: 'مكياج ناعم', price: '250 ريال' },
    { name: 'مكياج عروس', price: '1000-1500 ريال' },
  ],
  'خدمات أخرى': [
    { name: 'بديكير و منيكير', price: '150-200 ريال' },
    { name: 'عناية بالبشرة', price: '250-500 ريال' },
  ],
};

function Menu() {
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [rating, setRating] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSalonSelect = (salon) => {
    setSelectedSalon(salon);
    setSelectedCategory(null);
    setSelectedService(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedService(null);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setRating(0);
  };

  const handleRating = (stars) => {
    setRating(stars);
  };

  const handleCloseRating = () => {
    setShowThankYou(true);
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    setSelectedSalon(null);
    setSelectedCategory(null);
    setSelectedService(null);
    setRating(0);
  };

  return (
    <div className='menubg'>
      <div className="main-container">
        <h1 className="title">قائمة الصالونات</h1>
        {!selectedSalon && !showThankYou && (
          <div className="salons-container">
            {salons.map((salon, index) => (
              <div key={index} className="salon-card" onClick={() => handleSalonSelect(salon)}>
                <img src={salon.image} alt={salon.name} className="salon-image" />
                <h3>{salon.name}</h3>
              </div>
            ))}
          </div>
        )}

        {selectedSalon && !selectedCategory && !showThankYou && (
          <div className="categories-container">
            <h2>الخدمات المتوفرة في {selectedSalon.name}</h2>
            {Object.keys(servicesData).map((category, index) => (
              <button
                key={index}
                className="category-button"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
            <button className="back-button" onClick={() => setSelectedSalon(null)}>
              رجوع لاختيار الصالون
            </button>
          </div>
        )}

        {selectedCategory && !selectedService && !showThankYou && (
          <div className="services-container">
            <h2>اختر الخدمة من {selectedCategory}</h2>
            {servicesData[selectedCategory].map((service, index) => (
              <button
                key={index}
                className="service-button"
                onClick={() => handleServiceSelect(service)}
              >
                {service.name} - {service.price}
              </button>
            ))}
            <button className="back-button" onClick={() => setSelectedCategory(null)}>
              رجوع لاختيار الفئة
            </button>
          </div>
        )}

        {selectedService && !showThankYou && (
          <div className="rating-card">
            <h2>تقييم الخدمة</h2>
            <p>{selectedService.name} - {selectedService.price}</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? 'star filled' : 'star'}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <button className="close-button" onClick={handleCloseRating}>
              إغلاق
            </button>
          </div>
        )}

        {showThankYou && (
          <div className="thank-you-card">
            <h2>شكرًا لتقييمك!</h2>
            <button className="close-button" onClick={handleThankYouClose}>
              إغلاق
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
