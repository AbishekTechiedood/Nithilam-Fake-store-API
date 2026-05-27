"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Enter credentials");
    return;
  }

  // ACCESS TOKEN
  const accessToken =
    Math.random().toString(36);

  // REFRESH TOKEN
  const refreshToken =
    Math.random().toString(36);

  // EXPIRY (30 SECONDS)
  const expiryTime =
    Date.now() + 30000;

  // SAVE
  localStorage.setItem(
    "token",
    accessToken
  );

  localStorage.setItem(
    "refreshToken",
    refreshToken
  );

  localStorage.setItem(
  "refreshCount",
  0
);

  localStorage.setItem(
    "tokenExpiry",
    expiryTime
  );

  alert("Login Success");

  router.push("/products");

};


return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-5"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-5"
        />

        <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
          Login
        </button>
      </form>
    </main>
  );

};
