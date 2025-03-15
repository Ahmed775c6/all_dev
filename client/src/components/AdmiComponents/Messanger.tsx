
import Aside from "./Aside"
import Nav from "./Nav"
import AdminMSG from "../AdminMSG"
import { useEffect, useState } from "react"
import Themes from "./Themes"
import Loader from "../Loader"


const Messanger = () => {
const [zoom,setZoom] = useState(false);
const [Loading,setLoading] = useState(true);
const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");


const [AsideT, setAside] = useState(false)
useEffect(() => {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
  setTheme(theme)
  setLoading(false)
}, [theme]);



const [Changing,setChanging] = useState(false);

  
  return (
<>
{
  Loading ? <Loader/> : ''
}
{
  Changing ? <Themes setCh = {setChanging} /> : ''
}
{
  zoom === false ? <>
<div className="w-full flex dark:bg-[#2d3748] min-h-[100vh] h-full">
<Aside AsideT = {AsideT} setAsideT= {setAside}  />
<div className="w-full flex flex-col">
<Nav AsideT = {AsideT} setAside = {setAside} />
<div className="w-full flex flex-col p-4">
  <AdminMSG zoom = {zoom} setZoom = {setZoom}/>
</div>
</div>

</div>
  </>: <>


 </>

}


</>
  )
}

export default Messanger