import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchClients = async () => {
  try {
    const response = await axios.get(`${baseUrl}/GetClients`);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
};

export const fetchClients101 = async () => {
  try {
    const response = await axios.get(`${baseUrl}/GetClientsm101`);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
};

export const FetchMessages = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/GETMSGS/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const FetchProductsByCategorie = async (id: any) => {
  try {
    const response = await axios.get(`${baseUrl}/GETPRODUCTS/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fecthDataAt = async () => {
  try {
    const response = await axios.get(`${baseUrl}/GETCards`);
    return response.data;
  } catch (err) {
    console.error('Error fetching cards:', err);
    return [];
  }
};

export const FetchAnalyse = async () => {
  try {
    const response = await axios.get(`${baseUrl}/Analyse`);
    return response.data;
  } catch (err) {
    console.error('Error fetching analysis:', err);
    return [];
  }
};

export const FetchAnalyse2 = async () => {
  try {
    const response = await axios.get(`${baseUrl}/AnalyseDh`);
    return response.data;
  } catch (err) {
    console.error('Error fetching analysis:', err);
    return [];
  }
};

export const FetchInvoices = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getInvoices`);
    return response.data;
  } catch (err) {
    console.error('Error fetching invoices:', err);
    return [];
  }
};