"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const PatientDetails = () => {
  const { patientId } = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [editingImage, setEditingImage] = useState(null);

  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [fullImage, setFullImage] = useState(null); // تخزين الصورة الكاملة

  const [appointment_time, setappointment_time] = useState("");
  const [status_ar, setstatus_ar] = useState("");


  const [editingAppointment, setEditingAppointment] = useState(null); // إضافة حالة للمواعيد

  useEffect(() => {
    if (!patientId) return;
    const token = localStorage.getItem("token");

    axios
      .get(`https://7stars-events.com/api/patients/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setPatient(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching patient details:", err);
        setLoading(false);
      });
  }, [patientId]);

  const handleEdit = (image) => {
    setEditingImage(image);
    setNewDescription(image.description_ar);
    setNewImage(null);
    setPreviewImage("");
  };
  const Handeleditappointment = (appointment) => {
    setappointment_time(appointment.appointment_time || "");
    setstatus_ar(appointment.status_ar || "");
    setEditingAppointment(appointment);
  };
  

  const handleSave = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("description_ar", newDescription);
    formData.append("_method", "put");

    // إضافة الصورة فقط إذا تم اختيار واحدة جديدة
    if (newImage) {
      formData.append("image_path", newImage);
    }

    axios
      .post(
        `https://7stars-events.com/api/medicalImage/${editingImage.id}/${patientId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((result) => {
        console.log(result.data);
        setEditingImage(null); // إغلاق النافذة بعد الحفظ
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("يرجى تحميل ملف صورة فقط.");
      return;
    }

    setNewImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!patient) return <p className="text-center text-lg text-red-500">Patient not found.</p>;

  const handleDelete = (imageId) => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذه الصورة؟")) {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('_method', "delete");

      axios
        .post(`https://7stars-events.com/api/medicalImage/${imageId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          // تحديث حالة `patient` لحذف الصورة من الواجهة مباشرة
          setPatient((prevPatient) => ({
            ...prevPatient,
            images: prevPatient.images.filter((img) => img.id !== imageId),
          }));
        })
        .catch((err) => {
          console.error("خطأ أثناء حذف الصورة:", err);
        });
    }
  };



  // دالة لحفظ التعديلات على الموعد
  const handleSaveAppointment = () => {
  if (!editingAppointment) return;

  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("appointment_time", appointment_time); // استخدام القيم الجديدة
  formData.append("status_ar", status_ar);
  formData.append("_method", "put");

  axios
    .post(
      `https://7stars-events.com/api/appointment/${editingAppointment.id}/${patientId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((result) => {
      console.log(result.data);
      setEditingAppointment(null);
      router.refresh();
    })
    .catch((err) => {
      console.log(err);
    });
};


  // دالة لحذف الموعد
  const handleDeleteAppointment = (appointmentId) => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا الموعد؟")) {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('_method', "delete");

      axios
        .post(`https://7stars-events.com/api/appointment/${appointmentId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setPatient((prevPatient) => ({
            ...prevPatient,
            appointments: prevPatient.appointments.filter(
              (app) => app.id !== appointmentId
            ),
          }));
        })
        .catch((err) => {
          console.error("خطأ أثناء حذف الموعد:", err);
        });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">{patient.namear}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Date of Birth:</strong> {patient.datae_of_birth}</p>
        <p><strong>Address:</strong> {patient.adress}</p>
      </div>

      {/* عرض المواعيد */}
      {patient.appointments && patient.appointments.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Appointments</h2>
          <ul>
            {patient.appointments.map((appointment) => (
              <li key={appointment.id} className="border-b py-2">
                <p><strong>Time:</strong> {appointment.appointment_time}</p>
                <p><strong>Status:</strong> {appointment.status_ar}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => Handeleditappointment(appointment)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    حذف
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

{/* عرض الفواتير */}
{/* {patient.appointments && patient.appointments.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Appointments</h2>
          <ul>
            {patient.appointments.map((appointment) => (
              <li key={appointment.id} className="border-b py-2">
                <p><strong>Time:</strong> {appointment.appointment_time}</p>
                <p><strong>Status:</strong> {appointment.status_ar}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => Handeleditappointment(appointment)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    حذف
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )} */}

{editingAppointment && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-md shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">تعديل الموعد</h2>

      <label className="block mb-2">وقت الموعد:</label>
      <input
        type="datetime-local"
        value={appointment_time}
        onChange={(e) => setappointment_time(e.target.value)}

        className="w-full p-2 border rounded-md mb-4"
      />

      <label className="block mb-2">الحالة:</label>
      <select
        value={status_ar}
        onChange={(e) => setstatus_ar(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      >
        <option value="معلق">معلق</option>
        <option value="مؤكد">مؤكد</option>
        <option value="ملغي">ملغي</option>
      </select>

      <div className="flex justify-between">
        <button
          onClick={() => setEditingAppointment(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          إلغاء
        </button>
        <button
          onClick={handleSaveAppointment}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          حفظ التعديلات
        </button>
      </div>
    </div>
  </div>
)}
      {patient.images && patient.images.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Patient Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {patient.images.map((image) => (
              <div
                key={image.id}
                className="relative group"
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src={`https://7stars-events.com/service_images/${image.image_path}`}
                  alt={image.description}
                  className="w-full h-32 object-cover rounded-md shadow-md transition-transform transform hover:scale-105"
                  onClick={() => setFullImage(image)} // إضافة حدث لعرض الصورة كاملة عند الضغط عليها
                />
                <div className="mt-3 text-center">
                  <h1 className="font-bold">{image.date}</h1>
                  <h1>{image.description_ar}</h1>
                </div>
                {hoveredImage === image.id && (
                  <div className="flex justify-between w-full absolute top-2">
                    <button
                      className=" bg-blue-600 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-700"
                      onClick={() => handleEdit(image)}
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className=" bg-red-600 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-700"
                    >
                      حذف
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* نافذة التعديل على الصورة */}
      {editingImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">تعديل الصورة والوصف</h2>

            {/* عرض الصورة الحالية أو الصورة الجديدة */}
            <div className="mb-4">
              <img
                src={previewImage || `https://7stars-events.com/service_images/${editingImage.image_path}`}
                alt="Preview"
                className="w-full h-32 object-cover rounded-md shadow-md"
              />
            </div>

            {/* تعديل الوصف */}
            <input
              type="text"
              className="w-full border p-2 rounded-md mb-3"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />

            {/* اختيار صورة جديدة */}
            <input
              type="file"
              accept="image/*"
              className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-customBlack text-black hover:file:bg-blue-100"
              onChange={handleFileChange}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setEditingImage(null)}
              >
                إلغاء
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleSave}
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* عرض الصورة الكاملة */}
      {fullImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative bg-white p-4 rounded-md shadow-lg max-w-2xl">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md"
              onClick={() => setFullImage(null)}
            >
              إغلاق
            </button>
            <img
              src={`https://7stars-events.com/service_images/${fullImage.image_path}`}
              alt={fullImage.description}
              className="w-full h-auto max-h-[100vh] object-cover rounded-md"
            />
            <p className="text-center mt-2">{fullImage.description_ar}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
