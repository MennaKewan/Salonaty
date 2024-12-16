// data is  fullName email serviceName rating comment
import  { useState, useEffect } from 'react';


const CustomerRatings = () => {
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    // Fetch data from the backend API
    fetch(`https://the-real-project-backend-production-de46.up.railway.app/contacts/getContacts`)
      .then(response => response.json())
      .then(data => {
        setRatings(data);
      })
      .catch(error => {
        console.error('Error fetching ratings:', error);
      });
  }, []);
  return (
    <section className=" bg-[url('D:\Work\Salon\public\assets\homebackground.jpg')] bg-cover bg-center bg-no-repeat h-screen">

        <h2 className='mr-24 text-[#333] pt-14'>اراء العملاء</h2>
        <div className="overflow-x-auto">
        <table className="min-w-full bg-[#333] text-white border border-gray-200 mt-2">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">اسم العميل</th>
              <th className="py-2 px-4 border-b">البريد الإلكتروني</th>
              <th className="py-2 px-4 border-b">رقم الهاتف</th>
              <th className="py-2 px-4 border-b">التقييم</th>
              <th className="py-2 px-4 border-b">التعليق</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{rating.fullName}</td>
                <td className="py-2 px-4 border-b">{rating.email}</td>
                <td className="py-2 px-4 border-b">{rating.PhoneNumber}</td>
                <td className="py-2 px-4 border-b">{rating.rating}</td>
                <td className="py-2 px-4 border-b">{rating.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  )
}





export default CustomerRatings;
