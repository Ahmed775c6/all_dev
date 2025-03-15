import { createContext, useState, useEffect, ReactNode } from "react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { AuthContextType,User } from "../Types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Function to fetch authenticated user
  const fetchUserData = async () => {
    try {
      const res = await fetch(`${baseUrl}/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.ok) {
        const data: User = await res.json();
        setUser(data);
     

      } else {
        refreshAccessToken(); // Try refreshing the token
      }


   
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${baseUrl}/refresh`, { method: "POST", credentials: "include" });

      if (res.ok) {
        const { accessToken }: { accessToken: string } = await res.json();
        setAccessToken(accessToken);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect( () => {
    fetchUserData();
  }, [accessToken]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Invalid credentials");
console.log(res)
      const { accessToken }: { accessToken: string } = await res.json();
      setAccessToken(accessToken);
      fetchUserData();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout function
  const logout = async () => {
    await fetch(`${baseUrl}/logout`, { method: "POST", credentials: "include" });
    setUser(null);
    setAccessToken(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
