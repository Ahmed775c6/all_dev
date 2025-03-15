import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const GenertalInfo = async (Data: any) => {
  try {
    const response = await axios.post(`${baseUrl}/UpdateAccount`, Data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.data.message;
    if (result === "success") {
      window.location.reload();
    }
  } catch (error) {
    console.error("Error updating account info:", error);
  }
};

const UPPassword = async (DT: any) => {
  try {
    const response = await axios.post(`${baseUrl}/ChangePassword`, DT, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.data.message;
    if (result === "success") {
      // Handle success
    }
    return result;
  } catch (error) {
    console.error("Error updating account info:", error);
  }
};

export { GenertalInfo, UPPassword };