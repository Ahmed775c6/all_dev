import { User } from "../Types/types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchUserData = async (
  accessToken: string,
  setUser: (user: User | null) => void,
  refreshAccessToken: () => Promise<void>
) => {
  try {
    const res = await fetch(`${baseUrl}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.ok) {
      const data: User = await res.json();
      setUser(data);
    } else {
      await refreshAccessToken();
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const refreshAccessToken = async (
  setAccessToken: (token: string | null) => void,
  logout: () => Promise<void>
) => {
  try {
    const res = await fetch(`${baseUrl}/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      const { accessToken }: { accessToken: string } = await res.json();
      setAccessToken(accessToken);
    } else {
      await logout();
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

export const logout = async (
  setUser: (user: User | null) => void,
  setAccessToken: (token: string | null) => void
) => {
  await fetch(`${baseUrl}/logout`, {
    method: "POST",
    credentials: "include",
  });
  setUser(null);
  setAccessToken(null);
};