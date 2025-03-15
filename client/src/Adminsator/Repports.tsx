
import Aside from "../components/AdmiComponents/Aside"
import Nav from "../components/AdmiComponents/Nav"
import BoxMail from "./BoxMail";

import { useEffect, useState } from "react"


import Themes from "../components/AdmiComponents/Themes"

const Repports = () => {

 
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
 
  
  const [AsideT, setAside] = useState(false)
  
    useEffect(() => {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);
      localStorage.setItem("theme", theme);
      setTheme(theme)
    }, [theme]);
  


  const [Changing,setChanging] = useState(false);

  
  
  return (
<>

{
  Changing ? <Themes setCh = {setChanging} /> : ''
}
<div className="w-full flex dark:bg-[#2d3748] ">
<Aside AsideT = {AsideT} setAsideT= {setAside}  />
<div className="w-full min-h-[100vh] bg-[#edf4f6] dark:bg-[#2d3748] flex flex-col">
        <Nav AsideT = {AsideT} setAside = {setAside} />
<BoxMail/>
      </div>

<button className="fixed justify-center right-10 bottom-10 rounded-full w-11 h-11 text-center items-center outline-none border-none cursor-pointer flex p-2 bg-blue-400 text-white"
onClick={()=>{
  setChanging(true);
}}
>
  <i className="ri-settings-line"></i>
</button>
</div>
</>
  )
}

export default Repports