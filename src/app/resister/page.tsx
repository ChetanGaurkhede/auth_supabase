"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    console.log("start");
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://goal-tracker-api.onrender.com/api/v1/auth/register",
        userData
      );

      console.log("Response on me:", res.data);
    } catch (err) {
      console.error("Error submitting data:", err);
    }
  };

  return (
    <div>
      <h1>Resister page</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-2xl m-auto flex flex-col gap-4 bg-yellow-50 rounded-xl p-4">
          <input
            type="text"
            name="name"
            value={userData.name}
            placeholder="name"
            onChange={(e) => handleChange(e)}
            className="bg-gray-800 text-white rounded-xl"
          />
          <input
            type="text"
            name="email"
            value={userData.email}
            placeholder="email"
            onChange={(e) => handleChange(e)}
            className="bg-gray-800 text-white rounded-xl p-2"
          />
          <input
            type="password"
            name="password"
            value={userData.password}
            placeholder="password"
            onChange={(e) => handleChange(e)}
            className="bg-gray-800 text-white rounded-xl"
          />
          <button className="bg-blue-500 rounded-3xl" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
