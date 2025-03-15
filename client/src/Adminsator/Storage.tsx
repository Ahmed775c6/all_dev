
import Aside from "../components/AdmiComponents/Aside"
import Nav from "../components/AdmiComponents/Nav"

import "../Adminsator/Styles.css"
import { useEffect, useState } from "react"



import Themes from "../components/AdmiComponents/Themes"
import InvoiceForm from "../components/AdmiComponents/InvoiceForm"
import { FetchInvoices } from "./Utils/getData"
import ReceiptsTable from "../components/AdmiComponents/ReciptsTable"

const Strorage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "darl");
const [Create , setCreate] = useState('view')
const [loadi,setLoidi] = useState(true);
const [Recipts,setRecipts] = useState<any>([])
useEffect(()=>{
    const fetchData = async()=>{
        const DT = await FetchInvoices();
        if(DT){

            setRecipts(DT.reverse())
            setLoidi(false)

        }
    }
    fetchData()
},[])
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
 <div className="w-full flex flex-col gap-3 p-6">
    <h1 className="dark:text-white text-xl font-semibold">Dashbord / Storage</h1>
 <ul className="flex w-full gap-3 flex-row-reverse flew-wrap bg-white dark:bg-gray-900 p-2 rounded-sm">
    <li className={` cursor-pointer p-2 hover:bg-blue-500 text-white rounded-sm ${Create === 'create' ? 'bg-blue-500' : "bg-gray-500"}`} onClick={()=>{
        setCreate("create")
    }}>Create New Invoice</li>
    <li className={` cursor-pointer p-2 text-white rounded-sm ${Create === 'view' ? 'bg-blue-500' : "bg-gray-500"}`} onClick={()=>{
        setCreate("view")
    }}>View All Invoices</li>

 </ul>
<div className="w-full bg-white rounded-md flex-col gap-3 flex dark:bg-gray-900">
{
    Create === "create" ? <InvoiceForm count = {Recipts.length} setCreate = {setCreate}/> :
    null
 
}
<>
    <div className="w-full flex flex-col gap-3 h-full bg-white shadow-md dark:bg-gray-900">
{
    loadi ? <>
    <div className="w-full flex justify-center items-center p-4 text-center">
        <p>Loading ...</p>
    </div> 
    </>: <>
    
    <ReceiptsTable data= {Recipts} />
    </>
}
    </div>
    
    </>
</div>
 </div>
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

export default Strorage