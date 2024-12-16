import  { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '', // إضافة حقل البريد الإلكتروني
    message: '',
    rating: '', // إضافة حقل التقييم
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // بيانات النموذج التي سيتم إرسالها
    const dataToSend = {
      fullName: formData.name,
      email: formData.email,
      PhoneNumber: formData.phone,
      rating: parseInt(formData.rating, 10), // تحويل التقييم إلى عدد صحيح
      message: formData.message,
    };

    try {
      const response = await fetch('https://the-real-project-backend-production-de46.up.railway.app/contacts/addContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('تم إرسال الرسالة بنجاح');
        setFormData({ name: '', phone: '', email: '', message: '', rating: '' });
      } else {
        alert('حدث خطأ أثناء إرسال الرسالة.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('تعذر إرسال الرسالة. الرجاء المحاولة لاحقاً.');
    }
  };

  return (
    <div className="contact-bg ">
      <div className="contact-container">
     
        <h1>تواصل معنا</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className='pt-5'>الاسم</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className='text-black'
              placeholder="أدخل اسمك"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">رقم الهاتف</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              className='text-black'
              onChange={handleChange}
              placeholder="أدخل رقم الهاتف"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className='text-black'
              onChange={handleChange}
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">الرسالة</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              className='text-black'
              onChange={handleChange}
              placeholder="أدخل رسالتك"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="rating">التقييم</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              className='text-black'
              onChange={handleChange}
              placeholder="أدخل تقييمك (من 1 إلى 5)"
              min="1"
              max="5"
              required
            />
          </div>

          <button type="submit">إرسال</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;