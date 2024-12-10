import React, { useState } from "react";

// validation
import { validationSchema } from "../Components/validateCheckoutForm";
// Icons
import { AiOutlineExclamationCircle } from "react-icons/ai";
// Formik
import { useFormik } from "formik";
// Layout
import DetailLayout from "../Layout/DetailLayout";
// Context
import { useCart } from "../Providers/Context/cart_context";
import { useUserContext } from "../Providers/Context/user_context";
// React-Router-Dom
import { useNavigate } from "react-router-dom";
// Components
import CartSummary from "../Components/CartSummary";
import MobileNavbar from "../Components/MobileNavbar";

const CheckoutPage = () => {
  const { total, cart } = useCart();
  const { loginWithRedirect, myUser } = useUserContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //   initialValues
  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    touched,
  } = formik;

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/payment");
    }, 5000);
  };

  if (!cart.length) {
    return (
      <DetailLayout>
        <MobileNavbar />
        <section className="py-20">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-semibold text-gray-700">
              Your cart is empty !
            </h2>
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 text-white text-lg px-4 py-1 rounded-md"
            >
              Fill it
            </button>
          </div>
        </section>
      </DetailLayout>
    );
  }

  return (
    <section className="flex pb-20">
      <DetailLayout>
        <MobileNavbar />
        <header className="px-3">
          <h2 className="text-xl font-semibold">Checkout</h2>
        </header>
        <section className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-4 px-3 pt-6">
          <div className="flex-[3_3_0%] bg-white shadow-md rounded-lg h-fit py-6 px-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">Shopping Address</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex flex-col gap-1 flex-1 h-fit">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="First Name"
                      className={`flex-1 px-3 py-1.5 border focus:outline-none focus:border-2 focus:border-orange-500 rounded-md font-medium text-lg ${errors.firstName &&
                        touched.firstName &&
                        "border-2 border-red-600 focus:border-red-600"
                        }`}
                    />
                    {errors.firstName && touched.firstName && (
                      <span className="flex items-center gap-1 text-red-600 font-medium">
                        <AiOutlineExclamationCircle />
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 flex-1 h-fit">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Last Name"
                      className={`flex-1 px-3 py-1.5 border focus:outline-none focus:border-2 focus:border-orange-500 rounded-md font-medium text-lg ${errors.lastName &&
                        touched.lastName &&
                        "border-2 border-red-600 focus:border-red-600"
                        }`}
                    />
                    {errors.lastName && touched.lastName && (
                      <span className="flex items-center gap-1 text-red-600 font-medium">
                        <AiOutlineExclamationCircle />
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>
                <div className='flex flex-col gap-1 flex-1 h-fit'>
                  <input type='text' name='address' id='address' value={values.address} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Address' className='flex-1 px-3 py-1.5 border focus:outline-none focus:border-2 focus:border-orange-500 rounded-md font-medium text-base sm:text-lg' />
                </div>
                <div className="flex flex-col gap-1 flex-1 h-fit">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    className={`flex-1 px-3 py-1.5 border focus:outline-none focus:border-2 focus:border-orange-500 rounded-md font-medium text-lg ${errors.email &&
                      touched.email &&
                      "border-2 border-red-600 focus:border-red-600"
                      }`}
                  />
                  {errors.email && touched.email && (
                    <span className="flex items-center gap-1 text-red-600 font-medium">
                      <AiOutlineExclamationCircle />
                      {errors.email}
                    </span>
                  )}
                </div>
              </section>
              <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <div className="flex flex-col gap-1 flex-1 h-fit">
                  <input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Phone Number"
                    className={`flex-1 px-3 py-1.5 border focus:outline-none focus:border-2 focus:border-orange-500 rounded-md font-medium text-lg ${errors.phoneNumber &&
                      touched.phoneNumber &&
                      "border-2 border-red-600 focus:border-red-600"
                      }`}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <span className="flex items-center gap-1 text-red-600 font-medium">
                      <AiOutlineExclamationCircle />
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>
              </section>
              <div className="flex flex-col gap-3 items-center lg:items-start">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="flex items-center justify-center gap-4 bg-orange-500 py-1.5 rounded-md text-white font-medium w-full text-center hover:bg-orange-600 transition-colors duration-200 lg:w-fit lg:px-20 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handlePayment}
                >
                  {loading ? (
                    <img
                      src="./assets/images/ring-2.gif"
                      alt="ring"
                      className="w-7"
                    />
                  ) : (
                    "Proceed To Pay"
                  )}
                </button>
              </div>
            </form>
          </div>
          <CartSummary
            total={total}
            loginWithRedirect={loginWithRedirect}
            myUser={myUser}
          />
        </section>
      </DetailLayout>
    </section>
  );
};

export default CheckoutPage;
