import { useState,useEffect } from "react";
import Notofications from "./Notofications";
import { useAdminAuth } from "../../context/AdminAuthProvider";
import { ClipboardPen } from "lucide-react";

const Nav = ({AsideT, setAside} : any) => {
  const [N, SetN] = useState(false);
  const [A,setA] = useState(false)
  const [file,setFile] = useState<any>(null)
const auth = useAdminAuth();
useEffect(()=>{

 setFile(auth.userData?.prf)


},[auth])
  return (
    <>
      <nav className="w-full flex justify-between bg-white nvg dark:bg-gray-900 p-2 shadow-sm dark:shadow-gray-700">
        <div className="flex relative">

          <i className="ri-menu-2-line p-2 cursor-pointer text-gray-900 dark:text-white" onClick={()=>{
            setAside(!AsideT);
          }} ></i>
        </div>
        <div className="flex gap-3 relative">

          <i
            className="ri-notification-3-line p-2 cursor-pointer text-gray-900 dark:text-white"
            onClick={() => {
              SetN(!N);
            }}
          ></i>
      
          <i className="ri-function-line p-2 cursor-pointer text-gray-900 dark:text-white relative " onClick={()=>{
setA(!A)
          }}>
             <>
 {
A ? <>
<div className=" min-w-[300px] absolute rounded-sm top-14 right-0 z-20  w-full bg-white shadow-sm p-2 dark:bg-gray-700 dark:text-white">
<h1 className="w-full p-2 text-md dark:text-white  " style={{borderBottom : "1px solid #ccc"}}>Related Apps</h1>

<div className="w-full grid grid-cols-3 gap-2 p-4 text-blue-900 font-semibold">
<a href="/blogEditor" className="rounded-sm w-20 h-20 bg-blue-400 p-2 flex-col gap-2 flex justify-center text-center items-center">
<ClipboardPen />
<span>BlogEditor</span>
</a>
<a href="/MenuEdit" className="rounded-sm w-20 h-20 bg-blue-400 p-2 flex-col gap-2 flex justify-center text-center items-center">
<i className="ri-menu-add-fill"></i>
<span>Menu Edit</span>
</a>
<a href="/Orders" className="rounded-sm w-20 h-20 bg-blue-400 p-2 flex-col gap-2 flex justify-center text-center items-center">
<i className="ri-archive-drawer-line"></i>
<span>View Orders</span>
</a>
<a href="/ProductReviews" className="rounded-sm w-20 h-20 bg-blue-400 p-2 flex-col gap-2 flex justify-center text-center items-center">
<i className="ri-chat-quote-line"></i>
<span>View Reviews</span>
</a>
  
  
</div>
  </div></>    :""         
          }
 </>
        <Notofications n = {N}/>
          </i>
          <img
            src={file}
            alt="avatar"
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 dark:border-gray-700"
          />
        </div>
      </nav>
    </>
  );
};

export default Nav;
