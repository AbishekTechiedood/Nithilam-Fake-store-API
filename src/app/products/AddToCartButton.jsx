"use client";


export default function AddToCartButton({
  product,
}) {
  const handleAddToCart = () => {
    // GET EXISTING CART
    const existingCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    // CHECK IF PRODUCT ALREADY EXISTS
    const productExists =
      existingCart.find(
        (item) => Number(item.id) === Number(product.id)
      );

    if (productExists) {
      alert("Product already in cart");
      return;
    }

    // ADD NEW PRODUCT
    const updatedCart = [
      ...existingCart,
      product,
    ];

    // SAVE TO LOCAL STORAGE
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Product added to cart");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full mt-0 bg-purple-600 hover:bg-purple-700 text-white  py-3 rounded-lg transition"
    >
      Add to Cart
    </button>

    
  );
}