"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // REMOVE TOKEN
    localStorage.removeItem("token");

    // REDIRECT TO LOGIN
    router.push("/login");
  };

  return (
    <nav className="bg-black text-white px-10 py-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Gadget Store
      </h1>


      <div className="flex gap-5 items-center">
        <Link href="/products">
          Products
        </Link>

        <Link href="/cart">
          Cart
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}