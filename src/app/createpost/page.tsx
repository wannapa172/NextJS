
"use client"
import React, { useState } from "react";
import createPost from "../api/create-post/route";

export default function CreatePostPage() {
  const [formValue, setFormValue] = useState({
    title: "",
    content: "",
  });
  const [createSuccess, setCreateSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createPost; // เรียกใช้ฟังก์ชันสร้างโพสต์
      
      if (response.ok) {
        console.log("Post created successfully");
        setCreateSuccess(true);
      } else {
        console.error("Post creation failed");
      }
    } catch (error) {
      console.error("Error during post creation:", error);
    }
  };

  return (
    <>
      {createSuccess ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "80px", fontSize: "1.5rem" }}>
          <p>Post created successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Create a Post</h1>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formValue.title}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              value={formValue.content}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button className="btn btn-primary" type="submit">
              Create Post
            </button>
          </div>
        </form>
      )}
    </>
  );
}
