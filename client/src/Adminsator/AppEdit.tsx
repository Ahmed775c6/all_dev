import Aside from "../components/AdmiComponents/Aside"
import Nav from "../components/AdmiComponents/Nav"
import TaskLoader from "../components/AdmiComponents/TaskLoader";
import HotDealsForm from "../components/AdmiComponents/HotDealsForm";
import { useEffect,useState } from "react";
import Themes from "../components/AdmiComponents/Themes";
import axios from "axios";
import Heto from "./EDitHero";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AppEdit = () => {

 // State for loading indicator


  const [Changing,setChanging] = useState(false)
   const [file1, setFile1] = useState<File | null>(null);
   const [file2, setFile2] = useState<File | null>(null);
   const [filePreview1, setFilePreview1] = useState<string | null>(null);
   const [filePreview2, setFilePreview2] = useState<string | null>(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // State for handling errors
  const [AsideT, setAside] = useState(false);
  const [heroImages,setHeroImages] = useState([]);
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  }, [theme]);
  const [onTask, setTask] = useState(false);
  // useEffect hook to fetch data when the component mounts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/appData`);

        const pubData = response.data?.Send?.pub?.Data;

        if (Array.isArray(pubData) && pubData.length >= 2) {
          setFilePreview1(pubData[0] || null);
          setFilePreview2(pubData[1] || null);
        }
      setHeroImages(response.data?.Send?.pub?.Hero);
      } catch (error) {
        console.error("Error fetching data:", error);
       
      }
    };

    fetchData();
  }, []);
  return (
<>

{
  Changing ? <Themes setCh = {setChanging} /> : ''
}
     
   {onTask && <TaskLoader />}

<div className="w-full flex  dark:bg-[#2d3748]">
<Aside AsideT={AsideT} setAsideT={setAside} />
<div className="w-full min-h-[100vh] bg-[#edf4f6] flex flex-col dark:bg-[#2d3748] ">
<Nav AsideT={AsideT} setAside={setAside} />
<section  className=" p-6 flex flex-col gap-3 dark:bg-[#2d3748] ">
<div className="page_title" id="with_menu" >
  <p className="dark:text-white">Dashboard / Application Edit</p>
  <button className="meny_btn p-2 bg-blue-500   float-right cursor-pointer rounded-sm text-white" onClick = {()=>{
    window.location.href = '/menuEdit'
  }} >Menu Edit</button>
</div>
<Heto heroImages= {heroImages} setHeroImages = {setHeroImages} />

<div className="hot-deals bg-white p-4 dark:bg-gray-900">
  <header className="edit_header">
    <h1 className="dark:text-white">Hot Deals Section :</h1>
  </header>
  
<HotDealsForm setTask = {setTask} file1 = {file1} setFile1= {setFile1}  file2 = {file2} setFile2 = {setFile2} filePreview1 = {filePreview1} setFilePreview1 = {setFilePreview1} filePreview2 = {filePreview2} setFilePreview2 ={filePreview2} />

</div>


</section>
  </div>
</div>
<button className="fixed justify-center right-10 bottom-10 rounded-full w-11 h-11 text-center items-center outline-none border-none cursor-pointer flex p-2 bg-blue-400 text-white"
onClick={()=>{
  setChanging(true);
}}
>
  <i className="ri-settings-line"></i>
</button>
</>
  )
}

export default AppEdit