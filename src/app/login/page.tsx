"use client";

import React, { useState } from "react";
import axios from "axios";

const page = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  console.log("logindat", loginData);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("logindat:", loginData);

    e.preventDefault();
    console.log("loading...");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Login Success:", res.data);
    } catch (err: any) {
      console.error("❌ Login Failed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-center">login page</h1>

      <form onSubmit={handleSubmit}>
        <div className="w-xl m-auto flex flex-col gap-4 bg-yellow-50 rounded-xl p-4">
          <div className="bg-gray-600"></div>
          <input
            type="text"
            name="email"
            value={loginData.email}
            placeholder="email"
            onChange={(e) => handleChange(e)}
            className="bg-gray-800 text-white rounded-xl p-2"
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            placeholder="password"
            onChange={(e) => handleChange(e)}
            className="bg-gray-800 text-white rounded-xl p-2"
          />
          <button
            className="bg-blue-500 rounded-xl w-fit flex px-4 py-2 m-auto "
            type="submit"
          >
            {loading ? "Loding" : "Submit form"}
          </button>
        </div>
      </form>
      <div className="m-auto w-fit">
        {loading ? (
          <p className="text-white m-auto text-green">you are loged in</p>
        ) : (
          <p className="text-red-700">credencial failed</p>
        )}
      </div>
    </div>
  );
};

export default page;
