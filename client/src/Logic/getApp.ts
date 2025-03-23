import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const GetD = async function () {
  try {
    const response = await axios.get(`${baseUrl}/appData`);
    console.log('g : ', response.data);
    return response.data.Data.Data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetP = async function () {
  try {
    const response = await axios.get(`${baseUrl}/ProductsPl`);
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetP1 = async (page = 1, limit = 100) => {
  try {
    const response = await fetch(`${baseUrl}/ProductsPl2?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const GetP22 = async (id :any) => {
  try {
    const page = 1;
    const limit = 10;
 
    const response = await fetch(`${baseUrl}/ProductsPl2014?page=${page}&limit=${limit}&id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const Blogs = async (page = 1, limit = 15) => {
  try {
    const response = await axios.get(`${baseUrl}/Blogs?page=${page}&limit=${limit}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const Blogs101 = async (page = 1, limit = 3) => {
  try {
    const response = await axios.get(`${baseUrl}/Blogs?page=${page}&limit=${limit}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const Links = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getLinks`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching Links:", error);
    throw error;
  }
};

export const GetHotDL = async () => {
  try {
    const Responde = await axios.get(`${baseUrl}/gghotDeals`);
    return Responde.data;
  } catch (err) {
    console.log(err);
  }
};

export const AboutSC = async () => {
  try {
    const Responde = await axios.get(`${baseUrl}/ggAbout`);
    return Responde.data;
  } catch (err) {
    console.log(err);
  }
};

export const LVG = async () => {
  try {
    const Responde = await axios.get(`${baseUrl}/lvs`);
    return Responde.data.message.Gratuit;
  } catch (err) {
    console.log(err);
  }
};

export const BrandsCC = async () => {
  try {
    const D = await axios.get(`${baseUrl}/brands`);
    return D;
  } catch (err) {
    console.log('err', err);
    return [];
  }
};