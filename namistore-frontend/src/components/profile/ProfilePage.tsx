

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getProfile }
from "@/services/profile.service";

import "@/styles/ProfilePage.css";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export default function ProfilePage() {

  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    async function loadProfile() {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) {

          router.push("/login");
          return;
        }

        const data =
          await getProfile();

        setUser(data.user);
      }
      catch (error) {

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load profile"
        );
      }
      finally {

        setLoading(false);
      }
    }

    loadProfile();

  }, [router]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!user) {
    return <h2>User not found</h2>;
  }

  return (

    <div className="profile-page">

      <div className="profile-card">

        <h1>My Profile</h1>

        <div className="profile-info">

          <div className="profile-row">
            <span>First Name</span>
            <span>{user.firstName}</span>
          </div>

          <div className="profile-row">
            <span>Last Name</span>
            <span>{user.lastName}</span>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <span>{user.email}</span>
          </div>

        </div>

      </div>

    </div>
  );
}