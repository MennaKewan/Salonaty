import  { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for async request
  const [error, setError] = useState(null); // Store error message if there's any

  // Fetch orders when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://the-real-project-backend-production-de46.up.railway.app/orders/getOrders');
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json(); // Parse the JSON data
        setOrders(data); // Update state with the fetched orders
      } catch (error) {
        setError(error.message); // Set error if fetch fails
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures this runs only once after initial render

  // Handle loading and error states
  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  // const handleProcedureChange = (index, value) => {
  //   setOrders((prevOrders) => {
  //     const updatedOrders = [...prevOrders];
  //     updatedOrders[index].procedures = value;
  //     return updatedOrders;
  //   });
  // };

  return (
    <section className="  bg-[url('D:\Work\Salon\public\assets\homebackground.jpg')] bg-cover bg-center bg-no-repeat h-screen ">
      <h2 className='mr-24 text-[#333] pt-14'>الطلبات</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#333] text-white border border-gray-200 mt-2">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">رقم الطلب</th>
              <th className="py-2 px-4 border-b">اسم الخدمة</th>
              <th className="py-2 px-4 border-b">اسم العميل</th>
              <th className="py-2 px-4 border-b">البريد الإلكتروني للعميل</th>
              <th className="py-2 px-4 border-b">تاريخ الخدمة</th>
              <th className="py-2 px-4 border-b">الحالة</th>
              <th className="py-2 px-4 border-b">اجراءات</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{order.serviceName}</td>
                <td className="py-2 px-4 border-b">{order.customerName}</td>
                <td className="py-2 px-4 border-b">{order.email}</td>
                <td className="py-2 px-4 border-b">{new Date(order.serviceDate).toLocaleString()}</td>
                <td className="py-2 px-4 border-b ">--</td>
                <td className="py-2 px-4 border-b">
                  {/* <input 
                    type="text" 
                    placeholder="إجراءات" 
                    value={order.procedures}
                    onChange={(e) => handleProcedureChange(index, e.target.value)}
                    className="border rounded px-2 py-1 text-black"
                  /> */}
                    --
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
