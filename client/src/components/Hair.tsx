import { motion } from "framer-motion";
import React, { useState } from "react";
const hairColors = [
    { id: 1, color: "red", name: "rgb(165, 42, 42)" }, // Auburn  
    { id: 2, color: "black", name: "rgb(10, 10, 10)" }, // Jet Black  
    { id: 3, color: "yellow", name: "rgb(234, 192, 134)" }, // Honey Blonde  
    { id: 4, color: "brown", name: "rgb(139, 69, 19)" }, // Chestnut Brown  
    { id: 5, color: "orange", name: "rgb(204, 85, 0)" }, // Copper  
  ];
  


type SliderProps = {
    images: any[];
    width: number;
    height: number;
    reverse?: boolean;
  };
  
  const Slider: React.FC<SliderProps> = ({ images, width, height, reverse }) => {

    return (
      <div
        className="slider"
        style={{
          "--width": `${width}px`,
          "--height": `${height}px`,
          "--quantity": images.length,
        } as React.CSSProperties}
        data-reverse={reverse ? "true" : "false"}
      >
        <div className="list">
          {images.map((src, index) => (
            <div key={index} className="item border-none  relative" style={{ "--position": index + 1 } as React.CSSProperties}>
<div className="w-full p-2 flex flex-col absolute top-0 left-0">
    <p>{src.name}</p>
    <span>{src.price}</span>
</div>
              <img src={src.img} alt="slider image "  />
      
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const Products: any[] = [];
  const Main: React.FC = () => {
    return (
      <main>
   
        <Slider
          images={Products }
          width={200}
          height={200}
          
        />
       <button className='p-2 bg-white w-full mt-auto rounded-3xl'>
       Découvrez tout</button>
      </main>
    );
  };
  


const Hair = () => {   
    const [selectedColor, setSelectedColor] = useState(hairColors[0].color);
  

  return (
<>
<div className="w-full flex xlsmj  ">
    
<div className="w-full h-full p-6 flex flex-col relative gap-3">
<label className="p-2 bg-[#144273] rounded-lg text-white w-fit ">Coloration cheveux</label>
<h1 className="text-[#144273] font-semibold text-[1.5rem]">Découvrez la coloration naturelle Phyto</h1>
<p>Essayer une nouvelle teinte n'a jamais été aussi simple. Vous pouvez essayer n'importe quelle nuance et voir comment elle vous va</p>
<div className="w-full flex flex-col gap-3 ">
<Main/>

</div>
</div>
<div className="w-full p-4 relative">
          <div className="w-full flex flex-col-reverse  gap-0 justify-center">
            <motion.img
              key={selectedColor}
              src={`/assets/${selectedColor}.png`}
              alt="Hair Color Preview"
              className="w-full h-[60vh] p-2 object-contain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
            <div className="flex justify-center gap-3">
              {hairColors.map((color) => (
                <motion.button
                  key={color.id}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.color ? "border-white shadow-md" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.name }}
                  onClick={() => setSelectedColor(color.color)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
              ))}
            </div>
          </div>
        </div>
        
</div>

</> 
  )
}

export default Hair