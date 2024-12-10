import React, { useEffect } from "react";

// React-Router-Dom
import { useNavigate } from "react-router-dom";
// Actions
import { CLEAR_CART } from "../actions";
// Context
import { useCart } from "../Providers/Context/cart_context";
import { useUserContext } from "../Providers/Context/user_context";

const PaymentPage = () => {
  const { myUser } = useUserContext();
  const { dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: CLEAR_CART });
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  if (myUser)
    return (
      <main
        className="absolute inset-0 flex justify-center items-center bg-slate-700 w-full min-h-screen animate-showModal"
        onClick={() => navigate("/")}
      >
        <section
          className="flex flex-col justify-center items-center gap-4 bg-white px-6 py-10 z-10 rounded-md shadow-lg w-3/4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-2 text-center">
            <h2 className="sm:text-xl font-semibold">
              Thank You {myUser.given_name}
            </h2>
            <p className="sm:text-lg font-medium">Your Payment Was Successful!</p>
          </div>
          <p className="text-center">Redirecting To Home Page Shortly</p>
          <button
            className="bg-orange-500 text-white px-6 py-1.5 rounded-lg"
            onClick={() => navigate("/")}
          >
            Back to Home Now
          </button>
        </section>
      </main>
    );
};

export default PaymentPage;
