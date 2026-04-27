"use client";

import { useMemo } from "react";
import { removeFromCart } from "@/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type CartDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDialog({ isOpen, onClose }: CartDialogProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );
  const total = subtotal;

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
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl"
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

        <div className="p-6 pt-14 md:p-8">
          <div className="flex items-end justify-between border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {itemCount} {itemCount === 1 ? "item" : "items"} added
              </p>
            </div>
            <p className="text-sm text-gray-500">Review and remove products as needed.</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-gray-200 p-4"
                >
                  <div className="w-20 h-20 flex shrink-0 items-center justify-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{item.title}</p>
                    <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-base font-semibold text-gray-900 sm:w-24 sm:text-right">
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    type="button"
                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition sm:ml-2"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 flex items-center justify-between">
              <p className="text-sm text-gray-600">Current total</p>
              <p className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</p>
            </div>
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
  );
}
