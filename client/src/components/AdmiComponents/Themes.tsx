import { useState, useEffect } from "react";

import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const Themes = ({setCh} : any) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
const [lv,setLV] = useState<any>(0);
const [status,setStarus] = useState(false)
const [merci,setMerci] = useState<any>(0)
const [ld,setLd] = useState(false);
const [l1,setL11] = useState(false);
const [l2,setL21] = useState(false);

const [Gratuit,setGratuit] = useState<any>(0);
const handlLev = async(e:any)=>{
  e.preventDefault();
  setLd(true)
  
  try{
const res = await axios.post(`${baseUrl}/upLev`,{lv});
console.log(res)
if(res){
setStarus(true);
}
setLd(false)
  }catch(err){
    console.log(err)
    alert('something went refresh & wrong try again ');
    setLd(false)
  }
}
const handlPnt = async(e:any)=>{
  e.preventDefault();
  setL11(true)
  
  try{
const res = await axios.post(`${baseUrl}/upPnt`,{merci});

if(res){
setStarus(true);
}
setL11(false)
  }catch(err){
    console.log(err)
    alert('something went refresh & wrong try again ');
setL11(false)
  }
}
const handlGrT = async(e:any)=>{
  e.preventDefault();
  setL21(true)
  
  try{
const res = await axios.post(`${baseUrl}/upGrt`,{Gratuit});

if(res){
setStarus(true);
}
setL21(false)
  }catch(err){
    console.log(err)
    alert('something went refresh & wrong try again ');
    setL21(false)
  }
}
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(()=>{
const F = async()=>{
  const res = await axios.get(`${baseUrl}/lvs`);

  if(res){
    setLV(res.data.message.lv);
    setMerci(res.data.message.merci)
    setGratuit(res.data.message.Gratuit);
    
  }

} 
 F();
  },[])


  return (
    <>
      <div className="flex bg-white dark:bg-gray-900 w-[300px] fixed h-full flex-col right-0 top-0 z-50">
        <header className="w-full flex justify-between p-4 bg-gray-400 dark:bg-gray-800 flex-row">
          <h1 className="text-black dark:text-white">Switchers</h1>
          <i className="ri-close-line text-black dark:text-white cursor-pointer" onClick={()=>{
            setCh(false)
          }}></i>
        </header>

        <div className="w-full flex-col flex gap-3 p-4">
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-black dark:text-white">Themes :</h1>
            <div className="flex w-full gap-4">
              <label htmlFor="light" className="font-[500] text-black dark:text-white">Light</label>
              <input
                type="radio"
                id="light"
                value="light"
                name="mode"
                checked={theme === "light"}
                onChange={() => setTheme("light")}
              />
              <label htmlFor="dark" className="font-[500] text-black dark:text-white">Dark</label>
              <input
                type="radio"
                value="dark"
                id="dark"
                name="mode"
                checked={theme === "dark"}
                onChange={() => setTheme("dark")}
              />
            </div>
          </div>

<h1 className="text-black dark:text-white font-[500]">Values Settings :</h1>
          <div className="flex w-full flex-col p-4 gap-2">
            {status ? <p className="text-emerald-500">Value Updated Sucessfully</p> : null }

            <h2 className="text-black dark:text-white">laivraison (TND) </h2>
            <form className="flex w-full gap-2 flex-wrap items-center" onSubmit={handlLev}>
      <input type="text" placeholder="laivraison prix  :" className="p-2 bg-gray-200 dark:bg-gray-800 rounded-sm" value={lv} onChange={(e)=>{setLV(e.target.value); setStarus(false)} } />
            <button className="bg-blue-500 w-full p-2 text-white rounded-sm cursor-pointer" type="submit" disabled = {ld} >{ld ?  'loading..' : 'Save' }</button>
            </form>
            
            <h2 className="text-black dark:text-white">Point fidélité Value (TND) </h2>
            <form className="flex w-full gap-2 flex-wrap items-center" onSubmit={handlPnt}>
              <p> 1 point == ? TND </p>
      <input type="text" placeholder="laivraison prix  :" className="p-2 bg-gray-200 dark:bg-gray-800 rounded-sm" value={merci} onChange={(e)=>{setMerci(e.target.value); setStarus(false)}} />
            <button className="bg-blue-500 p-2 w-full text-white rounded-sm cursor-pointer" type="submit" disabled = {l1} >{l1 ?  'loading..' : 'Save' }</button>
            </form>
            <h2 className="text-black dark:text-white">Laivraison Free ? (TND) </h2>
            <form className="flex w-full gap-2 flex-wrap items-center" onSubmit={handlGrT}>
          
      <input type="text" placeholder="laivraison prix  :" className="p-2 bg-gray-200 dark:bg-gray-800 rounded-sm" value={Gratuit} onChange={(e)=>{setGratuit(e.target.value); setStarus(false)}} />
            <button className="bg-blue-500 w-full  p-2 text-white rounded-sm cursor-pointer" type="submit" disabled = {l2} >{l2 ?  'loading..' : 'Save' }</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Themes;
