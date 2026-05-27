"use client";

import { useState } from "react";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
const [response, setResponse] = useState(null);

 const addProduct = async (e) => {
  e.preventDefault();

  const newProduct = {
    title,
    price,
  };

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    const addedProduct = {
      id: data.id,
      title,
      price,
    };

    console.log("Added Product:", addedProduct);

    setResponse(addedProduct);

    setTitle("");
    setPrice("");

  } catch (error) {
    console.log(error);
  }
};

  return (
    <form
      onSubmit={addProduct}
      className="bg-white p-6 rounded-xl shadow-lg mb-10 max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4">
        Add Product
      </h2>

      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
        Add Product
      </button>


       {/* // RESPONSE UI */}
      {response && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg">
            Product Added Successfully ✅
          </h3>

          <p>ID: {response.id}</p>
          <p>Title: {response.title}</p>
          <p>Price: ₹ {response.price}</p>
        </div>
      )}


      
    </form>
    
   



  );
}