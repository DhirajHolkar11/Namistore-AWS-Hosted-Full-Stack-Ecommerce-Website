


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { registerUser }
from "@/services/auth.service";

import "@/styles/RegisterPage.css";

export default function RegisterPage() {

  const router = useRouter();

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (
      password !==
      confirmPassword
    ) {

      setError(
        "Passwords do not match"
      );

      return;
    }

    try {

      setLoading(true);
      setError("");

      await registerUser(
        firstName,
        lastName,
        email,
        password
      );

      router.push("/login");
    }
    catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Registration failed"
      );
    }
    finally {

      setLoading(false);
    }
  }

  return (

    <div className="register-page">

      <div className="register-card">

        <h1>Create Account</h1>

        {error && (
          <p>{error}</p>
        )}

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>First Name</label>

            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                )
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Last Name</label>

            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value
                )
              }
              required
            />

          </div>

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

          <div className="form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
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
                ? "Creating Account..."
                : "Create Account"
            }

          </button>

        </form>

      </div>

    </div>
  );
}