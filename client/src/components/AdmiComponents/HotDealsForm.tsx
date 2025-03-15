import React, { useState, useEffect } from "react";
import { handelUpload } from "../../Logic/UploadFile";
import axios from "axios";
import { GetHotDL } from "../../Logic/getApp";
import { AboutSC } from "../../Logic/getApp";
import MyEditor from "../TextEditor";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const HotDealsForm = ({setTask, file1, setFile1, file2,setFile2 , filePreview1,setFilePreview1, setFilePreview2, filePreview2 } :any) => {

const [TL,setTL] = useState(false);
const [Hottie,setHottie] = useState<any>([])
const [Con,setContent] = useState<any>('');
 useEffect(()=>{
  const FetchHot = async()=>{
const ll = await GetHotDL();
const jkl = await AboutSC();

setContent(jkl.message.Con) 
setHottie(ll);
  }
FetchHot();

 },[])

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleSubmit1 = async (
    e: React.FormEvent,
    file: File | null,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    e.preventDefault();
    if (!file) return;
    setTask(true);
 

    try {
      const uploadedFile = await handelUpload(file);
      await axios.post(`${baseUrl}/publi`, { "f1": { link: uploadedFile?.link } });
      console.log("Upload successful:", uploadedFile?.link);
      setPreview(uploadedFile?.link || null);
      
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setTask(false);
      
window.location.reload();
    }
  };
  
  const handleSubmit2 = async (
    e: React.FormEvent,
    file: File | null,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    e.preventDefault();
    if (!file) return;
    setTask(true);

    try {
      const uploadedFile = await handelUpload(file);
      await axios.post(`${baseUrl}/publi`, { "f2": { link: uploadedFile?.link } });
      console.log("Upload successful:", uploadedFile?.link);
      setPreview(uploadedFile?.link || null);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setTask(false);
      

      window.location.reload();
    }
  };
const handleAbout = async(e:any) =>{
  e.preventDefault();
const Send = await axios.post(`${baseUrl}/About`,{Con});

if(Send.data.message){
  window.location.reload();
}

}
 
  const handelSDeals =async (e: React.FormEvent) => {
    e.preventDefault();setTL(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    const deals = [];
    for (let i = 0; i < 3; i++) {
      const productId = formData.get(`productId-${i}`);
      const expiration = formData.get(`expiration-${i}`);
      
      if (productId && expiration) {
        deals.push({
          productId: productId.toString(),
          expiration: new Date(expiration.toString())
        });
      }
    }
  
    // Save only the first 3 valid entries
    const finalDeals = deals.slice(0, 3);
    // Submit finalDeals to your backend/state
  await axios.post(`${baseUrl}/saveDeals`,finalDeals);

    setTL(false);
  };
  return (
    <>
     

      {/* Form for first file */}
  <div className="w-full grid grid-cols-2 lmsx">
<div className="w-full flex flex-col gap-3">
<form
        onSubmit={(e) => handleSubmit1(e, file1, setFilePreview1)}
        className="w-full flex flex-col gap-2 p-2 dark:bg-gray-900"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setFile1, setFilePreview1)}
          className="w-full border p-2 rounded-md"
        />
        {filePreview1 && <img src={filePreview1} alt="pub-1" className="w-full mt-2" />}
        <button
          type="submit"
          className="bg-black w-full p-2 text-white outline-none border-none rounded-md mt-4"
        >
          Upload File 1
        </button>
      </form>

   
      <form
        onSubmit={(e) => handleSubmit2(e, file2, setFilePreview2)}
        className="w-full flex flex-col gap-2 p-2 mt-4"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setFile2, setFilePreview2)}
          className="w-full border p-2 rounded-md"
        />
        {filePreview2 && <img src={filePreview2} alt="pub-2" className="w-full mt-2" />}
        <button
          type="submit"
          className="bg-black w-full p-2 text-white outline-none border-none rounded-md mt-4"
        >
          Upload File 2
        </button>
      </form>
</div>
<div className="w-full flex flex-col gap-3">
<form onSubmit={handelSDeals} className="w-full flex flex-col gap-3 p-3 dark:text-white dark:bg-gray-800 rounded-sm ">
  <h1 className="w-full text-lg dark:text-white p-2">Setup Hot Deals Products</h1>

  <div className="flex flex-col gap-3  ">
    {/* Editable existing deals */}
    {Hottie.map((item: any, index: number) => (
      <div key={item._id} className="flex flex-wrap gap-3">
        <label htmlFor={`productId-${index}`}>Product ID :</label>
        <input
          type="text"
          name={`productId-${index}`}
          defaultValue={item._id}
          className="w-full p-2 min-w-full rounded-sm border-none dark:bg-gray-600 outline-none"
          placeholder="Product ID"
          required
        />
        <label htmlFor={`expiration-${index}`}>Expiration Date :</label>
        <input
          type="datetime-local"
          name={`expiration-${index}`}
          defaultValue={new Date(item.expiration).toISOString().slice(0, 16)}
          className="p-2 w-full rounded-sm  border-none dark:bg-gray-600 outline-none"
          required
        />
      </div>
    ))}

    {/* Empty slots for new deals (up to 3 total) */}
    {Array.from({ length: 3 - Hottie.length }).map((_, index) => (
      <div key={`new-${index}`} className="flex gap-3">
        <input
          type="text"
          name={`productId-${Hottie.length + index}`}
          className="w-full p-2 rounded-sm border-none dark:bg-gray-600 outline-none"
          placeholder="Product ID"
        />
        <input
          type="datetime-local"
          name={`expiration-${Hottie.length + index}`}
          className="p-2 rounded-sm border-none dark:bg-gray-600 outline-none"
        />
      </div>
    ))}
  </div>

  <button
    type="submit"
    disabled = {TL}
    className="bg-blue-400 text-white p-2 border-none rounded-md hover:bg-blue-500 transition-colors"
  >
    {Hottie.length > 0 ? "Update Hot Deals" : "Save Hot Deals"}
    
  </button>

  {/* Show message when maximum reached */}
  {Hottie.length >= 3 && (
    <p className="text-sm text-yellow-500">
      Maximum of 3 hot deals . Edit existing deals or remove some to add new ones.
      Do not Delete any Hot Deal product from the Database inless you remove it from hot deals !
    </p>
  )}
</form>
<form onSubmit={handleAbout} className="w-full flex flex-col gap-3 p-3 dark:text-white dark:bg-gray-800 rounded-sm ">
<h1 className="w-full p-2 dark:text-white text-lg">About Section</h1>
<p><strong>Note :</strong>Don"t forget to add a space between lines</p>

<MyEditor initialContent={Con} setContent={setContent} />


<button
    type="submit"
    disabled = {TL}
    className="bg-blue-500 text-white p-2 border-none rounded-md hover:bg-blue-600 transition-colors"
  >
{TL ? 'loading ...' :  'Save'}
  </button>
</form>
</div>
  </div>
    </>
  );
};

export default HotDealsForm;
