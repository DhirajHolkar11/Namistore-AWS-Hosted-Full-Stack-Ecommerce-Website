

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginUser }
from "@/services/auth.service";

import "@/styles/LoginPage.css";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      const data =
        await loginUser(
          email,
          password
        );

      localStorage.setItem(
        "token",
        data.token
      );

      if(data.user.role === "ADMIN"){
        router.push("/admin");
      }
      else{
        router.push("/profile");

      }

    }
    catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Login failed"
      );
    }
    finally {

      setLoading(false);
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Login</h1>

        {error && (
          <p>
            {error}
          </p>
        )}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

      </div>

    </div>
  );
}