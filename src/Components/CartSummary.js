import React from "react";

// React-Router-Dom
import { Link } from "react-router-dom";

const CartSummary = ({ total, myUser, loginWithRedirect }) => {
  const currentPathname = window.location.pathname;

  return (
    <div className="flex-1 bg-white shadow-md rounded-xl p-3 lg:px-4 h-fit">
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-semibold text-lg">Order Summary</h2>
        </div>
        <div className="flex items-center border rounded-md pl-2 w-full sm:w-fit lg:w-full text-sm sm:text-base">
          <input
            type="text"
            placeholder="Enter your promo code"
            className="focus:outline-none font-medium flex-1"
          />
          <button className="bg-blue-600 border boder-blue-600 text-white cursor-pointer rounded-md px-2 py-1.5">
            Apply
          </button>
        </div>
        <div className="flex justify-between items-center font-medium text-lg">
          <p>SubTotal</p>
          <span>${total}</span>
        </div>
        <div className="flex items-center justify-between text-slate-500 text-sm">
          <p>Discount</p>
          <span>0</span>
        </div>
        <hr />
        <div className="flex items-center justify-between text-xl font-semibold">
          <p>Total :</p>
          <span>${total}</span>
        </div>
        <div
          className={`${currentPathname === "/checkout" ? "hidden" : "flex"
            } flex-col gap-3 items-center lg:items-start`}
        >
          {myUser ? (
            <Link
              className="bg-orange-500 py-1.5 rounded-md text-white font-medium text-center w-full"
              to="/checkout"
            >
              Proceed To Checkout
            </Link>
          ) : (
            <button
              className="bg-orange-500 py-1.5 rounded-md text-white font-medium text-center w-full"
              onClick={loginWithRedirect}
            >
              Login
            </button>
          )}
          <Link
            to="/"
            className="bg-blue-600 py-1.5 rounded-md text-white font-medium text-center w-full"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CartSummary;
