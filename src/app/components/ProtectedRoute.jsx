"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}) {
  const router = useRouter();

  useEffect(() => {
    const validateToken = () => {
      const token =
        localStorage.getItem("token");

      const refreshToken =
        localStorage.getItem(
          "refreshToken"
        );

      const expiry =
        localStorage.getItem(
          "tokenExpiry"
        );

      // NO TOKEN
      if (!token || !expiry) {
        router.push("/login");
        return;
      }

      // TOKEN EXPIRED
      if (
        Date.now() > Number(expiry)
      ) {
        const refreshCount =
          Number(
            localStorage.getItem(
              "refreshCount"
            )
          ) || 0;

        // ALLOW ONLY 3 REFRESHES
        if (
          refreshToken &&
          refreshCount < 3
        ) {
          // NEW TOKEN
          const newAccessToken =
            Math.random().toString(
              36
            );

          // NEW EXPIRY
          const newExpiry =
            Date.now() + 30000;

          // SAVE
          localStorage.setItem(
            "token",
            newAccessToken
          );

          localStorage.setItem(
            "tokenExpiry",
            newExpiry
          );

          // UPDATE COUNT
          localStorage.setItem(
            "refreshCount",
            refreshCount + 1
          );

          alert(
            `New Token Generated (${refreshCount + 1}/3)`
          );

          startAutoLogout(
            newExpiry
          );
        } else {
          logoutUser();
        }
      } else {
        startAutoLogout(expiry);
      }
    };

    // TIMER
    const startAutoLogout = (
      expiryTime
    ) => {
      const remainingTime =
        Number(expiryTime) -
        Date.now();

      setTimeout(() => {
        validateToken();
      }, remainingTime);
    };

    // LOGOUT
    const logoutUser = () => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "refreshToken"
      );

      localStorage.removeItem(
        "tokenExpiry"
      );

      localStorage.removeItem(
        "refreshCount"
      );

      alert("Session Expired");

      router.push("/login");
    };

    validateToken();
  }, []);

  return children;
}