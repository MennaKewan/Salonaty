import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const VendorServices = () => {
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the backend API using fetch
    fetch(`https://the-real-project-backend-production-de46.up.railway.app/service/getAllServices`)
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []); // Empty array to run only once when component mounts

  // const handleEdit = (id) => {
  //   const serviceToEdit = services.find((service) => service.id === id);
  //   setCurrentService(serviceToEdit);
  //   setModalOpen(true); // Open modal for editing
  // };

  // const handleDelete = (id) => {
  //   fetch(`https://the-real-project-backend-production-de46.up.railway.app/service/deleteService/${id}`, {
  //     method: 'DELETE',
  //   })
  //     .then(() => {
  //       setServices(services.filter((service) => service.id !== id));
  //     })
  //     .catch(error => {
  //       console.error('Error deleting service:', error);
  //     });
  // };
  const handleDelete = (_id) => {
    fetch(`https://the-real-project-backend-production-de46.up.railway.app/service/deleteService/${_id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setServices(services.filter((service) => service._id !== _id)); // Update the UI by filtering out the deleted service
        } else {
          return response.json().then((errorData) => {
            console.error('Failed to delete service:', errorData.message);
            alert('Failed to delete the service');
          });
        }
      })
      .catch((error) => {
        console.error('Error deleting service:', error);
        alert('An error occurred while deleting the service');
      });
  };

  const handleUpdateService = (updatedService) => {
    fetch(`https://the-real-project-backend-production-de46.up.railway.app/service/addService`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedService),
    })
      .then(response => response.json())
      .then((data) => {
        setServices(services.map(service => (service.id === data.id ? data : service)));
        setCurrentService(null); // Close the modal after successful update
        setModalOpen(false);
      })
      .catch(error => {
        console.error('Error updating service:', error);
      });
  };

  const ServiceCard = ({ service,  onDelete }) => {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md mt-5">
        <h2 className="text-2xl font-semibold mb-2">{service.serviceName}</h2>
        <p className="text-gray-700 mb-4">{service.serviceDescription}</p>
        <p className="text-gray-800 font-bold">السعر: {service.servicePrice} ريال</p>
        <div className="flex justify-between mt-4">
          {/* <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => onEdit(service.id)}
          >
            تعديل
          </button> */}
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            onClick={() => onDelete(service._id)}
          >
            حذف
          </button>
        </div>
      </div>
    );
  };

  ServiceCard.propTypes = {
    service: PropTypes.shape({
      serviceName: PropTypes.string.isRequired,
      serviceDescription: PropTypes.string.isRequired,
      servicePrice: PropTypes.number.isRequired,
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    if (!isModalOpen) setCurrentService(null); // Reset currentService when closing modal
  };

  return (
    <section className=" bg-[url('D:\Work\Salon\public\assets\homebackground.jpg')] bg-cover bg-center bg-no-repeat h-screen">
      <h1>خدماتي</h1>
      <div className="flex flex-col items-center justify-center mt-20">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleModal}
        >
          اضافة خدمة جديدة
        </button>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onDelete={handleDelete}
              />
            ))}
            {isModalOpen && (
              <Modal
                toggleModal={toggleModal}
                service={currentService}
                onSave={handleUpdateService}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Modal = ({ toggleModal, service, onSave }) => {
  const [formData, setFormData] = useState({
    serviceName: service?.serviceName || '',
    serviceDescription: service?.serviceDescription || '',
    servicePrice: service?.servicePrice || '',
  });

  useEffect(() => {
    if (service) {
      setFormData({
        serviceName: service.serviceName,
        serviceDescription: service.serviceDescription,
        servicePrice: service.servicePrice,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (service) {
      onSave({ ...formData, id: service.id });
    } else {
      try {
        const response = await fetch(
          `https://the-real-project-backend-production-de46.up.railway.app/service/addService`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          console.log('Service created successfully');
          toggleModal(); // Close the modal after successful submission
          window.location.reload(); // Reload the page to fetch the latest services
        } else {
          const errorData = await response.json();
          console.error('Failed to create service:', errorData.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      onClick={toggleModal}
    >
      <div
        className="bg-white p-8 rounded shadow-lg max-w-xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-700"
          onClick={toggleModal}
        >
          &times;
        </button> */}
        <h2 className="text-2xl mb-4">{service ? 'تعديل الخدمة' : 'اضف خدمة جديدة'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              اسم الخدمة
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="اضف الخدمة"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              الوصف
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ادخل الوصف"
              name="serviceDescription"
              value={formData.serviceDescription}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              السعر
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="اضف السعر"
              name="servicePrice"
              value={formData.servicePrice}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {service ? 'تعديل الخدمة' : 'إنشاء الخدمة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  service: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default VendorServices;
