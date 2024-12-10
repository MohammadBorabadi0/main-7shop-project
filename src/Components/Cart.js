import React from "react";
import { Link } from "react-router-dom";
// Icons
import { IoClose } from "react-icons/io5";
import { BsFillTrashFill } from "react-icons/bs";
import { BiPlus, BiMinus } from "react-icons/bi";
// Actions
import { DECREASE, INCREASE, REMOVE_FROM_CART } from "../actions";
// Layout
import DetailLayout from "../Layout/DetailLayout";
// Context
import { useCart } from "../Providers/Context/cart_context";
import { useUserContext } from "../Providers/Context/user_context";
// Components
import CartSummary from "./CartSummary";
import MobileNavbar from "./MobileNavbar";

const Cart = () => {
  const { cart, dispatch, total } = useCart();
  const { myUser, loginWithRedirect } = useUserContext();

  if (!cart.length) {
    return (
      <section className="hidden sm:flex">
        <DetailLayout>
          <MobileNavbar />
          <section className="flex flex-col gap-5 pt-6">
            <div className="flex justify-center">
              <img
                src="../assets/images/basket.svg"
                alt="basket"
                className="w-28"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">
                Your shopping cart is empty !
              </h3>
            </div>
            <div className="flex flex-col items-center gap-5">
              <div className="text-center text-sm sm:text-base">
                <h4>
                  For add product to the cart, you can go to the page below
                </h4>
              </div>
              <Link
                to="/"
                className="px-4 py-1 bg-orange-500 text-white rounded-md text-lg"
              >
                Home
              </Link>
            </div>
          </section>
        </DetailLayout>
      </section>
    );
  }

  return (
    <section className="hidden sm:flex">
      <DetailLayout>
        <MobileNavbar />
        <header className="px-3">
          <h2 className="text-xl font-semibold">My Cart</h2>
        </header>
        <section className="flex flex-col lg:flex-row gap-8 lg:gap-4 px-3 pt-6">
          <div className="flex-[3_3_0%] bg-white shadow-md rounded-xl h-fit">
            <section className="flex flex-col gap-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 px-3 py-5 gap-12 border-b"
                >
                  <div>
                    <img src={item.imageURL} alt={item.name} className="w-24" />
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    <h4 className="font-medium">{item.name}</h4>
                    <span className="font-semibold text-orange-500">
                      ${item.price}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="flex items-center gap-1 font-medium text-lg">
                      Size :
                      <span className="font-normal text-slate-500">
                        {item.size}
                      </span>
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-5">
                    <span className="flex justify-end w-full pr-1">
                      <IoClose
                        size="25px"
                        className="cursor-pointer"
                        onClick={() =>
                          dispatch({ type: REMOVE_FROM_CART, payload: item })
                        }
                      />
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="p-2 rounded-full text-orange-500 border border-orange-500"
                        onClick={
                          item.quantity === 1
                            ? () =>
                                dispatch({
                                  type: REMOVE_FROM_CART,
                                  payload: item,
                                })
                            : () => dispatch({ type: DECREASE, payload: item })
                        }
                      >
                        {item.quantity === 1 ? (
                          <BsFillTrashFill
                            size="18px"
                            className="text-orange-500"
                          />
                        ) : (
                          <BiMinus size="20px" />
                        )}
                      </button>
                      <span className="pt-1 md:text-lg font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="p-2 bg-orange-500 text-white rounded-full"
                        onClick={() =>
                          dispatch({ type: INCREASE, payload: item })
                        }
                      >
                        <BiPlus size="20px" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
          <CartSummary
            myUser={myUser}
            loginWithRedirect={loginWithRedirect}
            total={total}
          />
        </section>
      </DetailLayout>
    </section>
  );
};

export default Cart;
