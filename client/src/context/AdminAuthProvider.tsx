import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
// Define interfaces for user data and context value
interface UserData {
  _id: string;
  role: string;
  [key: string]: any; // Allow additional fields if needed
}

interface AdminAuthContextType {
  token: string | null;
  userData: UserData | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create context with proper typing
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Define props for the provider
interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>('null');
  const [userData, setUserData] = useState<UserData | null>(null);

  // Axios instance with base URL
  const api = axios.create({
    baseURL: `${baseUrl}`,
    withCredentials: true,
  });

  // Token refresh function
  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const res = await fetch(`${baseUrl}/refreshAD101`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        // If the response is not ok, trigger logout
        logout();
        return null;
      }
  
      const { accessToken }: { accessToken: string } = await res.json();
  
      if (!accessToken) {
        // In case the accessToken is missing in the response, logout
        logout();
        return null;
      }
  
      // Update your token state or storage
      console.log(accessToken)
      setToken(accessToken);
      return accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return null;
    }
  };
  

  // Axios interceptor for token refresh
  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await refreshAccessToken();
     
          if (newToken ) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );
  }, [refreshAccessToken]);

  const fetchUserData = useCallback(async (currentToken: string) => {
    try {
      const response: AxiosResponse<UserData> = await api.get("/meBoss", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
   
      setUserData(response.data.user);
    } catch (error) {
      
      logout();
    }
  }, []);

  // Initial setup and periodic refresh
  useEffect(() => {
    if (token ) {
      fetchUserData(token);
      const interval = setInterval(refreshAccessToken, 14 * 60 * 1000); 
      return () => clearInterval(interval);
    }
  }, [token, fetchUserData]);

  const login = (newToken: string) => {
  
    setToken(newToken);
    fetchUserData(newToken);
  };

  const logout = useCallback(async() => {
    await fetch(`${baseUrl}/logoutAD`, { method: "POST", credentials: "include" });
  
    setToken(null);
    setUserData(null);
    // Optionally: api.post("/logout") to invalidate refresh token server-side
  }, []);

  return (
    <AdminAuthContext.Provider value={{ token, userData, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);

  if (!context) throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  return context;
};