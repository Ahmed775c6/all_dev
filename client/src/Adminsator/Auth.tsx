import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useAdminAuth } from "../context/AdminAuthProvider"; // Import the custom hook
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const AdminAuth = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({
    email: "",
    code: "",
    password: "",
  });

  const { login } = useAdminAuth();
  const h = useAdminAuth(); // Access the login function from the context
if(h.userData != null) {
window.location.href = "/dashbord"
}
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
  
    try {
      // Use axios to send the POST request with credentials
      const response = await axios.post(
        `${baseUrl}/admin_login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ Ensures cookies (refreshToken1) are stored
        }
      );
  
      // Save the token using the login function from context
      login(response.data.accessToken);
      window.location.href = "/dashbord";
    } catch (error) {
      // Handle error if the login fails
      alert("Login failed");
      console.error("Login error:", error);
    }
  
    setLoad(false);
  };
  
  return (
    <div className="w-full flex justify-center items-center flex-col bg-[var(--bg)] h-[100vh]">
      <form onSubmit={handleSubmit} className="w-[400px] p-4 bg-white flex flex-col gap-3">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          className="w-full p-2 outline-none border-none bg-[var(--bg)] shadow-sm rounded-sm"
          placeholder="Email Address"
          required
          value={data.email}
          name="email"
          onChange={handleChange}
        />

        <label htmlFor="password">Password :</label>
        <input
          type="password"
          className="w-full p-2 outline-none border-none bg-[var(--bg)] shadow-sm rounded-sm"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          required
          value={data.password}
        />

        <label htmlFor="code">Code :</label>
        <input
          type="password"
          className="w-full p-2 outline-none border-none bg-[var(--bg)] shadow-sm rounded-sm"
          onChange={handleChange}
          name="code"
          placeholder="####"
          required
          value={data.code}
        />
        <button type="submit" className="w-full p-2 bg-black text-white rounded-sm cursor-pointer" disabled={load}>
          {load ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminAuth;
