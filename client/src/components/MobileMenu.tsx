import { useState } from "react";

const MobileCategoryMenu = ({ links , setclose } :any) => {
  const [openCategory, setOpenCategory] = useState(null);
  
  const toggleCategory = (categoryId : any) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="fixed left-0 z-20 top-0 h-full w-full max-w-[350px] bg-white">
      <i className="ri-close-line text-3xl w-full flex p-2 " onClick={()=>{setclose(false)}}></i>
      <ul className="flex flex-col gap-0">
        {[ 
          { id: "visage", text: "Visage", query: "Visage" },
          { id: "cheveux", text: "Chéveux", query: "Cheveux" },
          { id: "corps", text: "Corps", query: "Corps" },
          { id: "bebe", text: "Bébé et Maman", query: "Bebe" },
          { id: "complement", text: "Compléments Alimentaires", query: "Complement" },
          { id: "hygiene", text: "Hygiène", query: "Hygiene" },
          { id: "solaire", text: "Solaire", query: "Solaires" },
          { id: "bio", text: "Bio et Nature", query: "Bioetnature" },
          { id: "medical", text: "Matériel Médical", query: "Medical" },
          { id: "homme", text: "Homme", query: "Homme" },
        ].map((category) => (
          <li key={category.id} className=" ">
            <button 
              className="w-full text-left font-semibold flex justify-between items-center p-2 bg-gray-100 outline-none"
              onClick={() => toggleCategory(category.id)}
            >
              {category.text}
              <span>{openCategory === category.id ? "▲" : "▼"}</span>
            </button>
            {openCategory === category.id && (
              <div className="bg-gray-200 p-2 ">
                <div className="flex flex-col gap-2">
                  {links
                    ?.filter((link : any) => link.content.categorie.toLowerCase() === category.id.toLowerCase())
                    .map((link : any, index : any) => (
                      <a 
                        key={index} 
                        href={link.content.linkName} 
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {link.content.linkName}
                      </a>
                    ))}
                </div>
       
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileCategoryMenu;