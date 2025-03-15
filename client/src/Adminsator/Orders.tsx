
import Aside from "../components/AdmiComponents/Aside"
import Nav from "../components/AdmiComponents/Nav"
import { motion } from "framer-motion"
import "../Adminsator/Styles.css"
import { useEffect, useState } from "react"


import Themes from "../components/AdmiComponents/Themes"
import OrderTable from "../components/AdmiComponents/Order";

const Orders = () => {
 
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");


const [AsideT, setAside] = useState(false)

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  }, [theme]);



const [Changing,setChanging] = useState(false);



const [status, setStatus] = useState<string>('all');
  
  return (
<>

{
  Changing ? <Themes setCh = {setChanging} /> : ''
}
<div className="w-full flex dark:bg-[#2d3748] ">
<Aside AsideT = {AsideT} setAsideT= {setAside}  />
<div className="w-full min-h-[100vh] bg-[#edf4f6] dark:bg-[#2d3748] flex flex-col">
        <Nav AsideT = {AsideT} setAside = {setAside} />
      <div className="w-full p-6 gap-3 flex flex-col h-full">
<h1 className="dark:text-white">Dashbord / ALL-Orders</h1>
<div className="w-full flex flex-col p-3 rounded-md shadow-md bg-white dark:bg-gray-900">
          <header className="w-full p-2 flex flex-row gap-3 ew justify-between" style={{
            borderBottom: "1px solid #ccc"
          }}>
            <h1 className="bg-gray-200 text-black dark:text-white dark:bg-gray-600 jsh w-full ">Orders</h1>
            <ul className="flex gap-3 kdkls w-full">
              <motion.li
                className={`rounded-sm p-1 cursor-pointer ${status === 'all' ? 'bg-gray-200 dark:bg-gray-700' : ''} text-gray-900 dark:text-white`}
                onClick={() => setStatus('all')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                All
              </motion.li>
              <motion.li
                className={`rounded-sm p-1 cursor-pointer ${status === 'pending' ? 'bg-gray-200 dark:bg-gray-700' : ''} text-gray-900 dark:text-white`}
                onClick={() => setStatus('pending')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Pending
              </motion.li>
              <motion.li
                className={`rounded-sm p-1 cursor-pointer ${status === 'confirmed' ? 'bg-gray-200 dark:bg-gray-700' : ''} text-gray-900 dark:text-white`}
                onClick={() => setStatus('confirmed')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Confirmed
              </motion.li>
              <motion.li
                className={`rounded-sm p-1 cursor-pointer ${status === 'canceled' ? 'bg-gray-200 dark:bg-gray-700' : ''} text-gray-900 dark:text-white`}
                onClick={() => setStatus('canceled')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Canceled
              </motion.li>
            </ul>
          </header>
          <OrderTable statusOeder={status} />
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

export default Orders