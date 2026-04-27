"use client";

import { useMemo, useState } from "react";

type CartDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

type CartProduct = {
  name: string;
  description: string[];
  offerPrice: number;
  price: number;
  quantity: number;
  size: number;
  image: string;
  category: string;
};

const products: CartProduct[] = [
  {
    name: "Running Shoes",
    description: [
      "Lightweight and comfortable",
      "Breathable mesh upper",
      "Ideal for jogging and casual wear",
    ],
    offerPrice: 250,
    price: 200,
    quantity: 1,
    size: 42,
    image:
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
    category: "Footwear",
  },
  {
    name: "Running Shoes",
    description: [
      "Lightweight and comfortable",
      "Breathable mesh upper",
      "Ideal for jogging and casual wear",
    ],
    offerPrice: 250,
    price: 200,
    quantity: 1,
    size: 42,
    image:
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
    category: "Footwear",
  },
  {
    name: "Running Shoes",
    description: [
      "Lightweight and comfortable",
      "Breathable mesh upper",
      "Ideal for jogging and casual wear",
    ],
    offerPrice: 250,
    price: 200,
    quantity: 1,
    size: 42,
    image:
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
    category: "Footwear",
  },
];

export default function CartDialog({ isOpen, onClose }: CartDialogProps) {
  const [showAddress, setShowAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [quantities, setQuantities] = useState<number[]>(
    products.map((product) => product.quantity),
  );

  const itemCount = quantities.reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = useMemo(
    () =>
      products.reduce(
        (sum, product, index) => sum + product.offerPrice * quantities[index],
        0,
      ),
    [quantities],
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

            {products.map((product, index) => (
              <div
                key={`${product.name}-${index}`}
                className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                    <img
                      className="max-w-full h-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div>
                    <p className="hidden md:block font-semibold text-gray-800">
                      {product.name}
                    </p>
                    <div className="font-normal text-gray-500/80">
                      <p>
                        Size: <span>{product.size || "N/A"}</span>
                      </p>
                      <div className="flex items-center">
                        <p>Qty:</p>
                        <select
                          className="outline-none bg-transparent"
                          value={quantities[index]}
                          onChange={(event) => {
                            const updatedQuantities = [...quantities];
                            updatedQuantities[index] = Number(event.target.value);
                            setQuantities(updatedQuantities);
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
                <p className="text-center">${product.offerPrice * quantities[index]}</p>
                <button type="button" className="cursor-pointer mx-auto">
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

          <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
            <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
            <hr className="border-gray-300 my-5" />

            <div className="mb-6">
              <p className="text-sm font-medium uppercase">Delivery Address</p>
              <div className="relative flex justify-between items-start mt-2">
                <p className="text-gray-500">No address found</p>
                <button
                  type="button"
                  onClick={() => setShowAddress((prev) => !prev)}
                  className="text-indigo-500 hover:underline cursor-pointer"
                >
                  Change
                </button>
                {showAddress && (
                  <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                    <p
                      onClick={() => setShowAddress(false)}
                      className="text-gray-500 p-2 hover:bg-gray-100"
                    >
                      New York, USA
                    </p>
                    <p
                      onClick={() => setShowAddress(false)}
                      className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                    >
                      Add address
                    </p>
                  </div>
                )}
              </div>

              <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

              <select
                className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <option value="COD">Cash On Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-500 mt-4 space-y-2">
              <p className="flex justify-between">
                <span>Price</span>
                <span>${subtotal}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-green-600">Free</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (2%)</span>
                <span>${tax}</span>
              </p>
              <p className="flex justify-between text-lg font-medium mt-3">
                <span>Total Amount:</span>
                <span>${total}</span>
              </p>
            </div>

            <button
              type="button"
              className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
