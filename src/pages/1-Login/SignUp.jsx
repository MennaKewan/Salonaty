

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    commercialRegister: "",
    salonName: "",
    salonAddress: "",
    workingHours: "",
    servicesProvided: "",
    ownerName: "",
    ownerContactNumber: "",
    fullName: "",
    dateOfBirth: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = selectedOption === "title1" ? "vendor" : "user";
    const dataToSubmit = { ...formData, role };

    // Send dataToSubmit to the backend (using fetch or axios)
    fetch(
      `https://the-real-project-backend-production-de46.up.railway.app/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Form Submitted:", data);
        alert("تم إرسال البيانات بنجاح!");
        navigate("/login"); // Redirect to login page after successful submission
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(dataToSubmit);
  };

  const handleReset = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "",
      commercialRegister: "",
      salonName: "",
      salonAddress: "",
      workingHours: "",
      servicesProvided: "",
      ownerName: "",
      ownerContactNumber: "",
      fullName: "",
      dateOfBirth: "",
      address: "",
    });
  };

  return (
    <div className="background" dir="rtl">
      <h1 className="title1">التسجيل</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="اسم المستخدم"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="الإيميل"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div>
          <select
            className="form-control w-100 py-3"
            value={selectedOption}
            onChange={handleSelectionChange}
            required
          >
            <option value="">اختيار نوع التسجيل</option>
            <option value="title1">تسجيل البائع</option>
            <option value="title2">تسجيل المستخدم</option>
          </select>

          <div style={{ marginTop: "20px" }}>
            {selectedOption === "title1" && (
              <div>
                {/* نموذج تسجيل البائع */}
                <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
                  <h1>نموذج تسجيل الصالون</h1>
                  <div style={{ marginBottom: "15px" }}>
                    <label>السجل التجاري:</label>
                    <input
                      type="text"
                      name="commercialRegister"
                      value={formData.commercialRegister}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label>اسم الصالون:</label>
                    <input
                      type="text"
                      name="salonName"
                      value={formData.salonName}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label>عنوان الصالون:</label>
                    <input
                      type="text"
                      name="salonAddress"
                      value={formData.salonAddress}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label>أوقات العمل:</label>
                    <input
                      type="text"
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label>الخدمات المقدمة:</label>
                    <textarea
                      name="servicesProvided"
                      value={formData.servicesProvided}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label>اسم المالك:</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label>رقم المالك للتواصل:</label>
                    <input
                      type="text"
                      name="ownerContactNumber"
                      value={formData.ownerContactNumber}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <button type="button" onClick={handleReset} style={{ padding: "10px 20px" }}>
                      إعادة تعيين
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedOption === "title2" && (
              <div>
                {/* نموذج تسجيل المستخدم */}
                <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
                  <h1>نموذج البيانات الشخصية</h1>
                  <div style={{ marginBottom: "15px" }}>
                    <label>الاسم الكامل:</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label>العنوان:</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label>تاريخ الميلاد:</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <button type="button" onClick={handleReset} style={{ padding: "10px 20px" }}>
                      إعادة تعيين
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="btn5" type="submit">
          تسجيل
        </button>
      </form>
    </div>
  );
};

export default SignUp;

