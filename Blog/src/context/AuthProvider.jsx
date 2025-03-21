import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlog] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem("jwt")); // ✅ Check token on initial load

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return; // ✅ Avoid unnecessary API calls if no token exists

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:5505/api/users/my-profile", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Use JWT token in API call
          },
        });
        setProfile(data.user);
        setIsAuth(true);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setIsAuth(false); // If the request fails, mark user as not authenticated
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5505/api/blogs/all-blogs", {
          method: "GET",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Use JWT token in API call
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs, profile, setProfile, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
