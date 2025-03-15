import axios from "axios";
import Nav from "./Nav";
import Aside from "./Aside";
import Themes from "./Themes";
import { useEffect,useState } from "react";
import { Loader } from "lucide-react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const Sales = () => {
const [sale,setsale] = useState<any>([]);
const [Loading,setLoading] = useState(true)
    const [Changing,setChanging] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [AsideT, setAside] = useState(false)
    const [Stat , setStatus] = useState('');
    const [selectedDate, setSelectedDate] = useState("");
    const [View,setView] = useState(false);
    const [Target,setTarget] = useState<any>(null);
    const [StTarget,setStTarget] = useState('');
    const [filter, setFilter] = useState("All");
    const filteredSales = sale?.filter((order: any) => {
      
      const matchStatus = filter === "All" ? true : order.status === filter;
      
      const matchDate = selectedDate
        ? (() => {
            // Handle date parsing from "DD/MM/YYYY, HH:mm" format
            const [datePart] = order.data.date.split(', ');
            const [day, month, year] = datePart.split('/');
            const isoDate = `${year}-${month}-${day}`;
            return isoDate === selectedDate;
          })()
        : true;
      return matchStatus && matchDate;
    });

  
    const handelSubmit = async (e: any) => {
      e.preventDefault();
    
      try {
        // Send the updated status to the server
        const response = await axios.post(`${baseUrl}/update_Sales_status`, {
          status: Stat,
      orderID : StTarget
        });

        // You can handle success or response here
 if(response.data.message == true){
window.location.reload();
 }
        
        
    
      } catch (err) {
        console.log(err);
      }
    };

    const ChangeStatus = ()=>{
        return(
            <>
            <div className="w-full flex flex-col fixed h-full z-20 bg-[rgba(0,0,0,0.5)] justify-center items-center">
<div className="w-[80%] flex flex-col p-2 gap-3 z-50 bg-white dark:bg-gray-900">
<header className="w-full p-2 flex justify-between flex-row bg-gray-500 dark:bg-gray-800">
    <h1 className="dark:text-white">Change Sale Status </h1>
    <i className="ri-close-line cursor-pointer dark:text-white " onClick={()=>{
setView(false);
    }}></i>
</header>
<form onSubmit={handelSubmit} className="w-full flex flex-col gap-3">
    
<div className="w-full flex gap-2">

<button 
    className={`p-2 w-full text-white  ${Stat == "Canceled" ? "bg-blue-500" : "bg-gray-500"} `} 
onClick={()=>{
        setStatus('Canceled')
    }} >
      Canceled
    
    </button>
    <button

    className={`p-2 w-full text-white  ${Stat == "Dilivired" ? "bg-blue-500" : "bg-gray-500"} `} 

    onClick={()=>{
        setStatus('Dilivired')
    }} >Delivered</button>
</div>
    
<button type="submit" className="p-2">Save</button>

</form>
</div>

            </div>
            </>
        )
    }
    useEffect(() => {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);
      localStorage.setItem("theme", theme);
      setTheme(theme)
      setLoading(false)
    }, [theme]);
  
  useEffect(() => {
    axios
      .get(`${baseUrl}/Getsales`)
      .then((response) => {
        const Sales101 = response.data;
 if(Sales101){
  setsale(Sales101.reverse());
 }
      
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <>
    {
      Loading ? <Loader/> : null
    }
    {
        Changing ? <Themes setCh = {setChanging} /> : ''
    }
     {
        View ? <ChangeStatus/> : ""
     }
{
  Target != null ? (
    <>
      <div className="w-full flex h-full fixed overflow-auto top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)]">
        <button
          className=" flex gap-2 absolute right-5 bottom-5 bg-black p-2 cursor-pointer text-xl dark:text-white"
          onClick={() => {
            setTarget(null);
          }}
        >Close</button>
        <div className="overflow-auto w-full p-6 mt-10">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border border-gray-300">Image</th>
                <th className="p-2 border border-gray-300">Name</th>
                <th className="p-2 border border-gray-300">Quantity</th>
                <th className="p-2 border border-gray-300">Price</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(Target).map((item: any) => (
                <tr key={item._id} className="bg-white dark:bg-gray-900">
                  <td className="p-2 border border-gray-300">
                    <img src={item.product_image_0} alt={item.name} className="w-12 h-12" />
                  </td>
                  <td className="p-2 border border-gray-300">{item.name}</td>
                  <td className="p-2 border border-gray-300">{item.quantity}</td>
                  <td className="p-2 border border-gray-300">{item.current_price} TND</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Calculate total price */}
          <div className="mt-4 text-white float-end text-lg font-semibold">
            Total : (TND)
            {JSON.parse(Target).reduce((total: number, item: any) => {
              return total + item.current_price * item.quantity;
            }, 0).toFixed(3)}
          </div>
        </div>
      </div>
    </>
  ) : null
}


<div className="w-full flex dark:bg-[#2d3748] ">
<Aside AsideT = {AsideT} setAsideT= {setAside}  />
<div className="w-full min-h-[100vh] bg-[#edf4f6] dark:bg-[#2d3748] overflow-auto flex flex-col">
        <Nav AsideT = {AsideT} setAside = {setAside} />
        <div className="overflow-auto w-full  p-6 table-auto">
      <header className="w-full gap-3 bg-white flex p-2 justify-between dark:bg-gray-800">
        <h1 className="dark:text-white text-xl">Sales</h1>
        <div className="w-full flex flex-wrap gap-3 items-center">
      {/* Status Filters */}
      <ul className="flex gap-3 overflow-auto table-auto">
        {["All", "Delivered", "DeliveryPending", "Canceled"].map((status) => (
          <li
            key={ status == 'Delivered' ? 'Dilivired' : status }
            onClick={() => setFilter(status == 'Delivered' ? 'Dilivired' : status)}
            className={`cursor-pointer p-2 rounded-md ${
           filter == "Dilivired" && status == 'Delivered' ||     filter === status   
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {status}
          </li>
        ))}
      </ul>

      {/* Date Filter */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="p-2 border rounded-md text-gray-800 dark:bg-gray-800 dark:text-white"
      />
    </div>
      </header>
<div className="w-full overflow-auto">
  
<table className="min-w-full table-auto border-collapse border max-w-full overflow-auto bg-white shadow-md border-gray-300 dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left dark:bg-gray-900">
          <th className="p-2 border border-gray-300">Date</th>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Phone</th>
            <th className="p-2 border border-gray-300">Methode </th>
         
            <th className="p-2 border border-gray-300">Address</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Items</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.length > 0 ? (
            filteredSales.map((order :any, index : any) => (
              <tr key={index}>
                 <td className="p-2 border border-gray-300">{order.data.date}</td>
                <td className="p-2 border border-gray-300">{order.data.name_req}</td>
                <td className="p-2 border border-gray-300">{order.data.req_email}</td>
                <td className="p-2 border border-gray-300">{order.data.tel}</td>
                <td className="p-2 border border-gray-300 text-center">{order.data.methode}</td>
                <td className="p-2 border border-gray-300">{order.data.address}</td>
                <td className="p-2 border border-gray-300">
                  {order.status == 'Dilivired'? 'Delivered' :order.status }{" "}
                  <i
                    className="ri-edit-box-line text-blue-500 cursor-pointer"
                   title="edit"
                    onClick={() => {
                      setStTarget(order.data._id);
                      setView(true);
            
                    }}
                  ></i>
                </td>
                <td className="p-2 border border-gray-300 justify-center flex text-center items-center">
                  <button
                    className="bg-blue-400 text-blue rounded-md border-none outline-none text-white p-2"
                    onClick={() => {setTarget(order.data.items)  }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="w-full flex p-4 justify-center items-center text-center">
                <p>No Sales made yet</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

export default Sales