import { useState,useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
type SliderProps = {
  images: any[];
  width: number;
  height: number;
  reverse?: boolean;
};

const Slider: React.FC<SliderProps> = ({ images, width, height }) => {

  return (
    <div
      className="slider"
      style={{
        "--width": `${width}px`,
        "--height": `${height}px`,
        "--quantity": images.length,
        
      } as React.CSSProperties}
      data-reverse={'true'}
    
    >
      <div className="list">
        {images.map((src, index) => (
          <div key={index} className="item border-none  p-2 justify-center items-center text-center relative cursor-pointer" style={{ "--position": index + 1 } as React.CSSProperties} onClick={()=>{window.location.href = `/shop?direction=${src.name}`}} >

<p>{src.name}</p>
            <img src={src.logo} alt="slider image " className="w-20 h-20"  />
    
          </div>
        ))}
      </div>
    </div>
  );
};


type MainProps = {
  pr: any;
};

const Main: React.FC<MainProps> = ({ pr }) => {

  return (
    <main className="w-full bg-transparent">
 
      <Slider
        images={pr }
        width={100}
        height={120}
    
      />
 
    </main>
  );
};



const BrandsLinks = ( ) => {
    const [brandsList, setBrandsList] = useState<any>([]);
    useEffect(() => {
      const fetchBrands = async () => {
        try {
          const response = await axios.get(`${baseUrl}/brands`);
          setBrandsList(response.data.message);
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      };
      fetchBrands();
    }, []);
 
 return (
<>
<div className="w-full p-3 shadow-xs rounded-md bg-white">
<div className="w-full flex justify-between">
<h1 className="font-semibold">TOP MARQUES DE PARAPHARMACIE</h1>
<a href="/brands" className="font-semibold text-black flex justify-center gap-2 ">Voir Tous <i className="ri-arrow-right-line"></i> </a>
</div>
     <div className="w-full p-3 ">
     <Main pr={brandsList}/>
     </div>
</div>
</>
  )
}

export default BrandsLinks