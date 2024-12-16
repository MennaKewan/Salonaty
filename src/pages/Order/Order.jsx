import  { useState, useEffect } from 'react';
import './Order.css';

const Order = () => {
  const [orders, setOrders] = useState([]); // تهيئة البيانات الفارغة
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  // جلب البيانات من API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          'https://the-real-project-backend-production-de46.up.railway.app/orders/getOrders' // عنوان API الجديد
        );
        if (!response.ok) {
          throw new Error('حدث خطأ أثناء جلب البيانات.');
        }
        const data = await response.json();
        // تحويل البيانات لتتناسب مع العرض المطلوب
        const formattedOrders = data.map(order => ({
          id: order._id, // استخدم _id من الداتا
          serviceName: order.serviceName,
          // orderNumber: Math.random().toString(36).substring(2, 8), // توليد رقم طلب عشوائي
          serviceDate: new Date(order.serviceDate).toLocaleDateString(), // تحويل التاريخ إلى صيغة محلية
          customerName: order.customerName,
          customerEmail: order.email,
          // status: 'بانتظار قبول الطلب', // حالة افتراضية
        }));
        setOrders(formattedOrders);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // دالة لحذف الطلب
  const deleteOrder = async (id) => {
    try {
      const response = await fetch(
        `https://the-real-project-backend-production-de46.up.railway.app/orders/deleteOrder/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('حدث خطأ أثناء حذف الطلب.');
      }

      // تحديث حالة الطلبات بعد الحذف
      setOrders(orders.filter(order => order.id !== id));
      alert('تم حذف الطلب بنجاح');
    } catch (err) {
      alert('حدث خطأ أثناء حذف الطلب');
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>جاري تحميل البيانات...</div>;
  }

  if (error) {
    return <div>خطأ: {error}</div>;
  }

  return (
    <div className="orders-bg">
      <div className="orders-container">
        <h1 style={{ color: "white" }}>طلباتي</h1>

        <table className="orders-table" >
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>اسم الخدمة</th>
              <th>تاريخ الخدمة</th>
              <th>اسم العميل</th>
              <th>البريد الإلكتروني للعميل</th>
              {/* <th>الحالة</th> */}

              <th>التعديلات</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order , index )=> (
              <tr key={order.id}>
                <td>{index+1}</td>
                <td>{order.serviceName}</td>
                <td>{order.serviceDate}</td>
                <td>{order.customerName}</td>
                <td>{order.customerEmail}</td>
                {/* <td>{order.status}</td> */}
                <td>
                  <button onClick={() => deleteOrder(order.id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;