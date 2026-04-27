"use client";

import { useMemo, useState } from "react";
import { removeFromCart, updateQuantity } from "@/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type CartDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDialog({ isOpen, onClose }: CartDialogProps) {
  const [showAddress, setShowAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );
  const tax = Math.round(subtotal * 0.02);
  const total = subtotal + tax;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 p-4 md:p-8 overflow-y-auto flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart dialog"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-white rounded-xl shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close cart dialog"
          className="absolute right-4 top-4 rounded-full border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row p-6 pt-14 md:pt-8">
          <div className="flex-1 max-w-4xl">
            <h1 className="text-3xl font-medium mb-6">
              Shopping Cart{" "}
              <span className="text-sm text-indigo-500">{itemCount} Items</span>
            </h1>

            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                    <img
                      className="max-w-full h-full object-cover"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <div>
                    <p className="hidden md:block font-semibold text-gray-800">
                      {item.title}
                    </p>
                    <div className="font-normal text-gray-500/80">
                      <p>
                        Size: <span>N/A</span>
                      </p>
                      <div className="flex items-center">
                        <p>Qty:</p>
                        <select
                          className="outline-none bg-transparent"
                          value={item.quantity}
                          onChange={(event) => {
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: Number(event.target.value),
                              }),
                            );
                          }}
                        >
                          {Array.from({ length: 5 }, (_, quantityIndex) => (
                            <option key={quantityIndex} value={quantityIndex + 1}>
                              {quantityIndex + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center">
                  ${item.price * item.quantity}
                </p>
                <button
                  type="button"
                  className="cursor-pointer mx-auto"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                      stroke="#FF532E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {cartItems.length === 0 && (
              <p className="pt-4 text-gray-500">Your cart is empty.</p>
            )}

            <button
              type="button"
              onClick={onClose}
              className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
            >
              <svg
                width="15"
                height="11"
                viewBox="0 0 15 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                  stroke="#615fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
