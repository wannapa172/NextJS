"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignUpPage() {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    });

    if (response.ok) {
      console.log("User created successfully");
      setSignUpSuccess(true);
    } else {
      const data = await response.json();
      if (data.error === "Username is already in use") {
        console.error("Username is already in use");
      } else {
        console.error("User creation failed");
      }
    }
  } catch (error) {
    console.error("Error during user creation:", error);
  }
};


  return (
    <> 
      {signUpSuccess ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "80px", fontSize: "1.5rem" }}>
        <p>Signup successful! Please sign in.</p>
      </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1>This is Signup Page</h1>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formValue.username}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formValue.name}
              onChange={handleChange}
            />
            <button className="btn btn-primary" type="submit">
            Sign Up
           </button>
          </div>
        </form>
      )}
    </>
  );
}//<Link href="/signin">
//<button className="btn btn-primary">Sign In</button>
//</Link>
