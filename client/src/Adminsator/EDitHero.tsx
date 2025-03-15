import { useRef, ChangeEvent, useState } from 'react'; 
import axios from 'axios';
import { handleUploadMulti } from '../Logic/UploadFile';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
interface NewHeroImage {
  id: number;
  url: string;
  file: File; // New images include the File for upload.
}


const Heto: React.FC<any> = ({ heroImages, setHeroImages }) => {
  const [load,setLoad] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  // Trigger the hidden file input.
  const handleAddFile = () => {
    fileInputRef.current?.click();
  };

  // When files are selected, create object URLs and add them as new images.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: NewHeroImage[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(), // Generate a unique ID.
      url: URL.createObjectURL(file),   // Temporary preview URL.
      file,                             // Store the file for later upload.
    }));

    setHeroImages((prevImages : any) => [...prevImages, ...newImages]);
    event.target.value = ''; // Reset the input.
  };

  // Delete an image by its index (removing it from the state).
  const handleDeleteImage = (deleteIndex: number) => {
    setHeroImages((prevImages : any) => {
      const newArray = [...prevImages];
      const removed = newArray.splice(deleteIndex, 1)[0];
      // If the removed image is a new image with a temporary URL, revoke it.
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
  
      // Build a mapping from new image id to secure URL.
      const secureUrlMap: Record<number, string> = {};
      newImages.forEach((img: any, index: any) => {
        const result = uploadResults[index];
        secureUrlMap[img.id] = result.status && result.link ? result.link : img.url;
      });
  
      // Replace temporary URLs with uploaded URLs
      finalImages = heroImages.map((img: any) =>
        typeof img === 'string' ? img : secureUrlMap[img.id]
      );
    }
  
    try {
      // Send the final images to the backend, even if it's an empty array
      const response = await axios.post(
       `${baseUrl}/hero`,
        { images: finalImages },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Backend response:', response.data);
      setLoad(false);
  setSucess(true);
      // Update the state with final URLs (strings only).
      setHeroImages(finalImages);
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
  <button onClick={()=>{setSucess(false)}} className='float-right p-1  w-full bg-blue-500 rounded-sm  text-white'>Got it</button>
</div>
</div>

</>
: null
}
     <div className="heroSetting w-full p-4  flex flex-col gap-3 bg-white shadow-xl dark:bg-gray-900 rounded-sm">

      <h1 className="dark:text-white">Hero Section :</h1>
      <div className="w-full p-2 flex-col gap-3">
        <button onClick={handleAddFile} className="p-2 mb-3 bg-blue-500 text-white rounded">
          Add A file
        </button>
        {/* Hidden file input for uploading images */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div className="w-full overflow-auto flex min-w-full  gap-3 ">
          {heroImages.map((image : any, index: any) => {
            // If the image is a string, it's already a URL; otherwise, use its url property.
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
          className="submit bg-black p-2 w-full rounded-sm cursor-pointer text-white"
        >
          {load ?  "loading .. " :'Submit'}
        </button>
      </div>
    </div>
    
    
    </>

  );
};

export default Heto;
