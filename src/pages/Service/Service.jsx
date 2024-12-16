
import { useState } from 'react';
import './Service.css';

const Service = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleOrderClick = () => {
    if (selectedOption) {
      setSelectedService(selectedOption);
      setShowOrderForm(true);
    } else {
      alert('يرجى اختيار الخدمة أولاً');
    }
  };

  const handleFormClose = () => {
    setShowOrderForm(false);
    setSelectedService('');
    setSelectedOption('');
    setPaymentMethod('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      _id: Math.random().toString(36).substring(2, 15), 
      serviceName: selectedService,
      customerName: formData.name,
      email: formData.email,
      address: formData.address,
      paymentMethod,
      ...(paymentMethod === 'credit' && {
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
      }),
      serviceDate: new Date().toISOString(),
      __v: 0,
    };

    try {
      const response = await fetch(
        'https://the-real-project-backend-production-de46.up.railway.app/orders/addOrder',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify([orderData]), 
          body: JSON.stringify(orderData)
        }
      );

      if (response.ok) {
        alert('تم إرسال الطلب بنجاح!');
        handleFormClose();
      } else {
        alert('حدث خطأ أثناء إرسال الطلب.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('تعذر إرسال الطلب. الرجاء المحاولة لاحقاً.');
    }
  };

  return (
    <div className="servicebg">
      <div className="service-bg">
        <h1 style={{ color: 'white' }}>خدمات صالوناتي</h1>
        <main className="service-main">
          <div className="service-card">
            <img src="/assets/hair1.jfif" alt="قص الشعر" className="service-image" />
            <h2>خدمات الشعر</h2>
            <select className="service-select" onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="">اختر الخدمة</option>
              <option value="قص الشعر: من ٦٠ ريال إلى ١٢٠ ريال">قص الشعر: من ٦٠ ريال إلى ١٢٠ ريال</option>
              <option value="صبغ الشعر: من ٥٠٠ ريال إلى ١٦٠٠ ريال">صبغ الشعر: من ٥٠٠ ريال إلى ١٦٠٠ ريال</option>
              <option value="إستشوار: من ٨٠ ريال إلى ١٢٠ ريال">إستشوار: من ٨٠ ريال إلى ١٢٠ ريال</option>
              <option value="علاجات الشعر: من ٧٠٠ ريال إلى ٢٠٠٠ ريال">علاجات الشعر: من ٧٠٠ ريال إلى ٢٠٠٠ ريال</option>
            </select>
            <button onClick={handleOrderClick}>اطلب الآن</button>
          </div>



          <div className="service-card">
            <img src="/assets/makeup.jpg" alt="خدمات المكياج" className="service-image" />
            <h2>خدمات المكياج</h2>
            <select className="service-select" onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="">اختر الخدمة</option>
              <option value="مكياج سهرة: ٤٠٠ ريال">مكياج سهرة: ٤٠٠ ريال</option>
              <option value="مكياج مناسبات: ٤٥٠ ريال">مكياج مناسبات: ٤٥٠ ريال</option>
              <option value="مكياج ناعم: ٢٥٠ ريال">مكياج ناعم: ٢٥٠ ريال</option>
              <option value="مكياج عروس: من ١٠٠٠ إلى ١٥٠٠ ريال">مكياج عروس: من ١٠٠٠ إلى ١٥٠٠ ريال</option>
            </select>
            <button onClick={handleOrderClick}>اطلب الآن</button>
          </div>


                     <div className="service-card">
           <img src="/assets/care.jpg" alt="خدمات أخرى" className="service-image" />
           <h2>خدمات أخرى</h2>
           <select className="service-select" onChange={(e) => setSelectedOption(e.target.value)}>
             <option value="">اختر الخدمة</option>
             <option value="بديكير و منيكير: من ١٥٠ ريال إلى ٢٠٠ ريال">بديكير و منيكير: من ١٥٠ ريال إلى ٢٠٠ ريال</option>
             <option value="عناية بالبشرة: من ٢٥٠ ريال إلى ٥٠٠ ريال">عناية بالبشرة: من ٢٥٠ ريال إلى ٥٠٠ ريال</option>
           </select>
           <button onClick={handleOrderClick}>اطلب الآن</button>
         </div>
         
        </main>

        {showOrderForm && (
          <div className="order-form">
            <h2>طلب الخدمة</h2>
            <form onSubmit={handleSubmit}>
              <label>
                الخدمة المطلوبة:
                <input type="text" value={selectedService} disabled />
              </label>
              <label>
                الاسم:
                <input type="text" className='text-black' name="name" required onChange={handleInputChange} />
              </label>
              <label>
                البريد الإلكتروني:
                <input type="email" className='text-black' name="email" required onChange={handleInputChange} />
              </label>
              <label>
                رقم الهاتف:
                <input type="tel" className='text-black' name="phone" required onChange={handleInputChange} />
              </label>
              <label>
                العنوان:
                <input type="text" className='text-black' name="address" required onChange={handleInputChange} />
              </label>
              <label>
                طريقة الدفع:
                <select name="payment" className='text-black' required onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="">اختر طريقة الدفع</option>
                  <option value="credit">بطاقة ائتمان</option>
                  <option value="cash">نقداً عند التسليم</option>
                </select>
              </label>
              {paymentMethod === 'credit' && (
                <>
                  <label>
                    رقم البطاقة:
                    <input type="text" name="cardNumber" className='text-black' required onChange={handleInputChange} />
                  </label>
                  <label>
                    تاريخ الانتهاء:
                    <input type="text" name="expiryDate" className='text-black' placeholder="MM/YY" required onChange={handleInputChange} />
                  </label>
                  <label>
                    CVV:
                    <input type="text" name="cvv" className='text-black' required onChange={handleInputChange} />
                  </label>
                </>
              )}
              <div className="button-group">
                <button type="submit" className='btn7' >إرسال الطلب</button>
                <button type="button"  onClick={handleFormClose}>إغلاق</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Service;