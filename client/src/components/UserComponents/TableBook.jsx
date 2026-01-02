import React from "react";
import MapComponent from "./MapComponent";
import { useFormik } from "formik";
import { tableBooSchema } from "../../formSchema";
import { BASE_URL } from "../../constantFiles/baseURL";
import { useDispatch } from "react-redux";
import { addBooking } from "../../store/tableBookingSlice.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import BookingShow from "./BookingShow.jsx";

const initialValues = {
  fullName: "",
  phone: "",
  email: "",
  personCount: "",
  date: "",
  timeSlot: "",
};

const TableBook = () => {
  const dispatch = useDispatch();

  const bookingHandler = async (val) => {
    try {
      const bookingData = await axios.post(`${BASE_URL}/table-booking/`, val, {
        withCredentials: true,
      });
      return bookingData.data;
    } catch (error) {
      throw error.response?.data?.message || "Server Error!";
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: tableBooSchema,
      onSubmit: async (value, action) => {
        try {
          const result = await bookingHandler(value);
          toast.success("Request has been submitted.");
          action.resetForm();
        } catch (error) {
          toast.error(error);
        }
      },
    });

  return (
    <>
      <section className="tableSection">
        <div className="tableWrapper">
          <h2>Book A Table</h2>
          <div className="mainContainer">
            <div className="formContainer">
              <form action="" onSubmit={handleSubmit}>
                <div className="inputContainer">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Your Name"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.fullName && touched.fullName && (
                    <p>{errors.fullName}</p>
                  )}
                </div>
                <div className="inputContainer">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.phone && touched.phone && <p>{errors.phone}</p>}
                </div>
                <div className="inputContainer">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? <p>{errors.email}</p> : null}
                </div>
                <div className="inputContainer">
                  <select
                    name="personCount"
                    id="personCount"
                    value={values.personCount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option>How Many Persons ?</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  {errors.personCount && touched.personCount && (
                    <p>{errors.personCount}</p>
                  )}
                </div>
                <div className="inputContainer">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.date && touched.date && <p>{errors.date}</p>}
                </div>
                <div className="inputContainer">
                  <select
                    name="timeSlot"
                    id="timeSlot"
                    value={values.timeSlot}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option>Select the Slot</option>
                    <option value="6PM-7PM">6PM - 7PM</option>
                    <option value="7PM-8PM">7PM - 8PM</option>
                    <option value="8PM-9PM">8PM - 9PM</option>
                    <option value="9PM-10PM">9PM - 10PM</option>
                  </select>
                  {errors.timeSlot && touched.timeSlot && (
                    <p>{errors.timeSlot}</p>
                  )}
                </div>
                <input type="submit" value="Book Now" />
              </form>
            </div>
            <div className="mapBox">
              <MapComponent />
            </div>
          </div>
        </div>
      </section>
      <BookingShow/>
    </>
  );
};

export default TableBook;
