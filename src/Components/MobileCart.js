import React from "react";

// Icons
import { FiChevronLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { BiPlus, BiMinus } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
// Context
import { useCart } from "../Providers/Context/cart_context";
import { useUserContext } from "../Providers/Context/user_context";
// React-Router-Dom
import { Link, useNavigate } from "react-router-dom";
import { DECREASE, INCREASE, REMOVE_FROM_CART } from "../actions";
import CartSummary from "./CartSummary";

const MobileCart = () => {
  const { cart, dispatch, total } = useCart();
  const { myUser, loginWithRedirect } = useUserContext();
  const navigate = useNavigate();

  const menu = (
    <section className="flex mb-8">
      <span className="cursor-pointer" onClick={() => navigate("/")}>
        <FiChevronLeft size="25px" />
      </span>
      <div className="text-center flex-1 text-xl text-slate-900 font-semibold">
        <h2>My Cart</h2>
      </div>
    </section>
  );

  if (!cart.length) {
    return (
      <div className="flex flex-col sm:hidden pt-10 gap-4 px-3">
        {menu}
        <section className="flex flex-col gap-4">
          <div className="flex justify-center">
            <img
              src="../assets/images/basket.svg"
              alt="basket"
              className="w-28"
            />
          </div>
          <div className="flex justify-center">
            <h3 className="font-medium text-lg">
              Your shopping cart is empty !
            </h3>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h4>For add product to the cart, you can go to the page below</h4>
            <Link
              to="/"
              className="px-4 py-1 bg-orange-500 text-white rounded-md text-lg"
            >
              Home
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 sm:hidden py-10 px-3 bg-primary">
      {menu}
      <section className="flex flex-col gap-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white px-2 py-3 rounded-md"
          >
            <div className="flex items-center gap-5">
              <div className="bg-red-200 rounded-xl">
                <img src={item.imageURL} alt={item.name} className="w-14" />
              </div>
              <div className="flex flex-col gap-1 font-medium text-sm">
                <h4>{item.name}</h4>
                <span className="text-gray-500">Size : {item.size}</span>
                <span className="font-bold text-lg">${item.price}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="flex justify-end pr-1.5">
                <IoClose
                  size="22px"
                  className="cursor-pointer"
                  onClick={() =>
                    dispatch({ type: REMOVE_FROM_CART, payload: item })
                  }
                />
              </span>
              <div className="flex gap-2">
                <button
                  className="p-1.5 sm:p-2 rounded-full text-orange-500 border border-orange-500"
                  onClick={
                    item.quantity === 1
                      ? () =>
                          dispatch({ type: REMOVE_FROM_CART, payload: item })
                      : () => {
                          dispatch({ type: DECREASE, payload: item });
                        }
                  }
                >
                  {item.quantity === 1 ? (
                    <BsFillTrashFill size="18px" className="text-orange-500" />
                  ) : (
                    <BiMinus size="20px" />
                  )}
                </button>
                <span className="pt-1 font-medium text-lg">
                  {item.quantity}
                </span>
                <button
                  className="p-1.5 sm:p-2 bg-orange-500 text-white rounded-full"
                  onClick={() => dispatch({ type: INCREASE, payload: item })}
                >
                  <BiPlus size="20px" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
      <CartSummary
        myUser={myUser}
        loginWithRedirect={loginWithRedirect}
        total={total}
      />
    </div>
  );
};

export default MobileCart;
