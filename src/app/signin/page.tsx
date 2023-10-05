"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formValue.username,
          password: formValue.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          const authResponse = await signIn("credentials", {
            username: formValue.username,
            password: formValue.password,
            redirect: false,
            callbackUrl: "/posts", 
          });

          if (authResponse?.ok) {
            router.push("/posts");
          } else {

            console.error("Authentication failed");
          }
        } else {

          console.error("Authentication failed");
        }
      } else {
        
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <>
      
      <form onSubmit={onSubmit}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>This is Signin Page</h1>
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
          <button className="btn btn-primary" type="submit">
          Signin
        </button>
        </div>
        
      </form>
    </>
  );
}
//<Link href="/signup">
//<button className="btn btn-primary">Sign Up</button>
//</Link>