import { useRef, ChangeEvent, useState } from 'react'; 
import axios from 'axios';
import { handleUploadMulti } from '../Logic/UploadFile';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
interface NewHeroImage {
  id: number;
  url: string;
  file: File; 
}


const Heto: React.FC<any> = ({ heroImages, setHeroImages }) => {
  const [load,setLoad] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);



  const handleAddFile = () => {
    fileInputRef.current?.click();
  };


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: NewHeroImage[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(), 
      url: URL.createObjectURL(file),  
      file,                             
    }));

    setHeroImages((prevImages : any) => [...prevImages, ...newImages]);
    event.target.value = ''; 
  };


  const handleDeleteImage = (deleteIndex: number) => {
    setHeroImages((prevImages : any) => {
      const newArray = [...prevImages];
      const removed = newArray.splice(deleteIndex, 1)[0];
 
      if (typeof removed !== 'string' && removed.file) {
        URL.revokeObjectURL(removed.url);
      }
      return newArray;
    });
  };

const [sucess,setSucess] = useState(false);
  const handleSubmit = async () => {

    setLoad(true);
    const newImages = heroImages.filter(
      (img: any): img is NewHeroImage => typeof img !== 'string' && Boolean(img.file)
    );
    const filesToUpload: File[] = newImages.map((img: any) => img.file);
  
    let finalImages: string[] = heroImages.map((img: any) =>
      typeof img === 'string' ? img : img.url
    );
  
    if (filesToUpload.length > 0) {
      // Upload new images
      const uploadResults = await handleUploadMulti(filesToUpload);
      if (!uploadResults) {
        console.error('No upload results.');
        return;
      }
  
    
      const secureUrlMap: Record<number, string> = {};
      newImages.forEach((img: any, index: any) => {
        const result = uploadResults[index];
        secureUrlMap[img.id] = result.status && result.link ? result.link : img.url;
      });
  
     
      finalImages = heroImages.map((img: any) =>
        typeof img === 'string' ? img : secureUrlMap[img.id]
      );
    }
  
    try {
      setHeroImages(finalImages);
      const response = await axios.post(
       `${baseUrl}/hero`,
        { images: finalImages },
        { headers: { 'Content-Type': 'application/json' } }
      );
   if(response.data.message ==='Hero images updated successfully'){
 

    setLoad(false);
    setSucess(true);
      
     
   }else{
    setLoad(false)

   }
 
    } catch (error) {
      console.error('Error posting to backend:', error);
    }
  };
  

  return (
    <>
{
sucess ? <>
<div className="w-full fixed h-full bg-[rgba(0,0,0,0.4)] justify-center z-50 top-0 left-0  items-center flex ">
<div className="bg-white p-3 rounded-sm  flex flex-col gap-3 dark:bg-gray-900 w-[300px] ">
  <h1 className='dark:text-gray-200'>Updated Sucesssfully</h1>
  <button onClick={()=>{setSucess(false)}} className='float-right p-1  w-full bg-blue-500 hover:bg-blue-600 rounded-sm  text-white'>Got it</button>
</div>
</div>

</>
: null
}
     <div className="heroSetting w-full p-4  flex flex-col gap-3 bg-white shadow-xl dark:bg-gray-900 rounded-sm">

      <h1 className="dark:text-white">Hero Section :</h1>
      <div className="w-full p-2 flex-col gap-3">
        <button onClick={handleAddFile} className="p-2 mb-3 bg-blue-500 hover:bg-blue-600 text-white rounded">
          Add A file
        </button>
      
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div className="w-full overflow-auto flex min-w-full  gap-3 ">
          {heroImages.map((image : any, index: any) => {
        
            const url = typeof image === 'string' ? image : image.url;
            return (
              <div key={index} className="relative w-full  ">
                <img
                  src={url}
                  alt="Hero Section"
                  className="min-w-full w-screen h-full object-cover rounded border"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
        disabled = {load}
          onClick={handleSubmit}
          className="submit bg-blue-500 p-2 hover:bg-blue-600 w-full rounded-sm cursor-pointer text-white"
        >
          {load ?  "Uploading .. " :'Save'}
        </button>
      </div>
    </div>
    
    
    </>

  );
};

export default Heto;
