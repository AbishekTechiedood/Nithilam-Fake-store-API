 import Link from "next/link";
 import AddProduct from "@/app/products/AddProduct";
import AddToCartButton from "@/app/products/AddToCartButton";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Navbar from "@/app/components/Navbar";


async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
} 

export default async function ProductsPage({
  searchParams,
}) {
  const products = await getProducts();

  // PRODUCTS PER PAGE
  const productsPerPage = 4;

  // CURRENT PAGE
  const params = searchParams;

const currentPage =
  Number(params.page) || 1;

  // START INDEX
  const startIndex =
    (currentPage - 1) * productsPerPage;

  // END INDEX
  const endIndex =
    startIndex + productsPerPage;

  // CURRENT PAGE PRODUCTS
  const paginatedProducts =
    products.slice(startIndex, endIndex);

  // TOTAL PAGES
  const totalPages = Math.ceil(
    products.length / productsPerPage
  );

  return (
    
    <ProtectedRoute>
    <Navbar />
    <main className="min-h-screen bg-gray-100 p-10 pt-32">     
    <h1 className="text-4xl font-bold text-center mb-10">
        Products
    </h1>


      {/* Add Product Form */}
      <AddProduct />

      {/* PRODUCTS GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-60 w-full object-contain"
            />

            <h2 className="text-xl font-bold mt-4">
              {product.title}
            </h2>

            <p className="text-pink-600 text-3xl font-bold mt-3">
              ${product.price}
            </p>

            <p className="text-gray-600 mt-3 line-clamp-3">
              {product.description}
            </p>

            <AddToCartButton product={product} />           

          </div>
        ))}
      </div>

      {/* PAGINATION */}

      <div className="flex justify-center items-center gap-3 mt-12">
        {Array.from({ length: totalPages }).map(
          (_, index) => {
            const pageNumber = index + 1;

            return (
              <Link
                key={pageNumber}
                href={`/products?page=${pageNumber}`}
                className={`w-12 h-12 flex items-center justify-center rounded-full font-bold transition
                  
                  ${
                    currentPage === pageNumber
                      ? "bg-purple-600 text-white"
                      : "bg-white text-black border hover:bg-gray-200"
                  }
                `}
              >
                {pageNumber}
              </Link>
            );
          }
        )}
      </div>

       
    </main>
    </ProtectedRoute>

  );
}