import axios from "axios";

export const handelUpload = async (File: File) => {
  if (!File) {
    console.error("No file selected for upload.");
    return null;
  }
console.log('got , ',File);
  const formData = new FormData();
  formData.append("file", File);
  formData.append("upload_preset", "TEST101");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dbbc3ueua/image/upload",
      formData
    );

 

    return {status : true , link : response.data.secure_url}; // Ensure this is returned
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};


export const handleUploadMulti = async (files: File[]) => {
  if (!files || files.length === 0) {
    console.error("No files selected for upload.");
    return null;
  }

  const uploadResults = [];
console.log('m',files)
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "TEST101");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dbbc3ueua/image/upload",
        formData
      );

      uploadResults.push({ status: true, link: response.data.secure_url });
    } catch (error) {
      console.error("Upload failed for a file:", error);
      uploadResults.push({ status: false, link: null });
    }
  }

  return uploadResults; // Return an array of results for all files
};
  
