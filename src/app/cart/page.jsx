"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Navbar from "@/app/components/Navbar";

export default function CartPage() {
  const [cartItems, setCartItems] =
    useState([]);

  useEffect(() => {
    // GET CART DATA
    const storedCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCartItems(storedCart);
  }, []);

  // REMOVE PRODUCT
  const removeFromCart = (id) => {
    const updatedCart =
      cartItems.filter(
        (item) => item.id !== id
      );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  return (
    <ProtectedRoute>
    <Navbar />
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-2xl text-gray-500">
          Cart is Empty
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.title}
                className="h-52 w-full object-contain"
              />

              {/* TITLE */}
              <h2 className="text-xl font-bold mt-4">
                {product.title}
              </h2>

              {/* PRICE */}
              <p className="text-3xl font-bold text-purple-600 mt-3">
                ${product.price}
              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-600 mt-3 line-clamp-3">
                {product.description}
              </p>

              {/* REMOVE BUTTON */}
              <button
                onClick={() =>
                  removeFromCart(product.id)
                }
                className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
              >
                Remove From Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
    </ProtectedRoute>
  );
}