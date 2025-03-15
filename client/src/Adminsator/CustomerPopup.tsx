import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Nav from "../components/AdmiComponents/Nav";
import Aside from "../components/AdmiComponents/Aside";
import Themes from "../components/AdmiComponents/Themes";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
interface Order {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  date: string;
}

interface Purchase {
  _id: string;
  productName: string;
  amount: number;
  date: string;
}

interface Customer {
  _id: string;
  name: string;
  pdf: string;
  tel: string;
  memberSens: String;
  email: string;
  isBanned: boolean;
  purchases: Purchase[];
  orders: Order[];
  pts : any
}

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [tie, setTie] = useState('purchases');
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
const [sales,setSales] = useState<any>([])
const [orders,setOrdrs] = useState<any>([])
const [AsideT, setAside] = useState(false)
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  }, [theme]);



const [Changing,setChanging] = useState(false);

  useEffect(() => {
    const getCustomer = async () => {
      const data = await axios.get(`${baseUrl}/thisCus/${id}`); 

      setCustomer(data.data.message);
      setSales(data.data.sales.sales)
      setOrdrs(data.data.sales.orders)
      setLoading(false);
    };

    getCustomer();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!customer) return <p>Customer not found.</p>;
console.log(sales)
  return (
    <>
    {
  Changing ? <Themes setCh = {setChanging} /> : ''
}
   {
    loading ? <p>Loading ...</p> : 
   <>
      <div className="w-full flex h-full min-h-[100vh] dark:bg-[#2d3748] ">
      <Aside AsideT = {AsideT} setAsideT= {setAside}  />
        <div className="w-full flex flex-col h-full dark:bg-[#2d3748]">
        <Nav AsideT = {AsideT} setAside = {setAside} />
          <div className="w-full flex gap-3 p-4 bg-[#edf4f6] h-full dark:bg-[#2d3748] ali">
            <div className="flex flex-col gap-3 w-[40%] xs bg-white p-4 shadow-md h-full dark:bg-gray-900">
              <h2 className="text-2xl font-bold mb-4">{customer.name}</h2>
              <img
                src={customer.pdf}
                alt={customer.name}
                className="w-24 h-24 rounded-full object-cover mx-auto"
              />
              <p className="text-gray-700">ID: {customer._id}</p>
              <p className="text-gray-700">Phone: +216 {customer.tel}</p>
              <p className="text-gray-700">Email: {customer.email}</p>
              <p className="text-gray-700">Member Sens: {customer.memberSens}</p>
              <p className="text-gray-700">Fidility points Collected: {customer.pts.pts  } ,<span>used :  {customer.pts.used}</span>, <span>remain :{customer.pts.pts - customer.pts.used} </span> </p>
              <p className={`p-1 ${customer.isBanned ? 'text-red-500' : 'text-green-500'}`}>
                {customer.isBanned ? 'Banned' : 'Active'}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3">
              <div className="w-full bg-white p-2 flex dark:bg-gray-900">
                <ul className="w-full gap-3 flex justify-end">
                  <li
                    onClick={() => setTie('purchases')}
                    className="p-2 cursor-pointer"
                  >
                    Purchases
                  </li>
                  <li
                    onClick={() => setTie('orders')}
                    className="p-2 cursor-pointer"
                  >
                    Orders
                  </li>
                </ul>
              </div>

              {tie === 'purchases' ? (
                <div className="w-full overflow-x-auto bg-white p-3 dark:bg-gray-900">
                  <h3 className="text-lg font-semibold mt-4">
                    Purchases: {customer.purchases?.length > 0 ? customer.purchases?.length : 0 }
                  </h3>
                  {customer.purchases?.length > 0 ? (
                      <table className="min-w-full table-auto overflow-auto max-w-full w-full mt-4 border border-gray-300">
                      <thead>
                        <tr className="border-b bg-gray-100">
                 
                          <th className="px-4 py-2 text-left">Address</th>
                          <th className="px-4 py-2 text-left">Tel</th>
                          <th className="px-4 py-2 text-left">Postal</th>
                         
                          <th className="px-4 py-2 text-left">Quantity</th>
                    
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">Product Name</th>
                          <th className="px-4 py-2 text-left">Amount (DT)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sales.map((purchase :any) =>
                          JSON.parse(purchase.items).map((item : any) => (
                            <tr key={item.id} className="border-b">
                         
                              <td className="px-4 py-2">{purchase.address}</td>
                              <td className="px-4 py-2">{purchase.tel}</td>
                              <td className="px-4 py-2">{purchase.postal}</td>
                            
                              <td className="px-4 py-2 text-center">{item.quantity}</td>
                              <td className="px-4 py-2">{purchase.date}</td>
                              <td className="px-4 py-2">{item.name}</td>
                              <td className="px-4 py-2">{item.current_price * item.quantity} DT</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-500">No purchases found.</p>
                  )}
                </div>
              ) : (
                <div className="w-full overflow-x-auto p-4 bg-white dark:bg-gray-900">
                  <h3 className="text-lg font-semibold mt-6">
                    Orders: {customer.orders?.length}
                  </h3>
                  {orders?.length > 0 ? (
          <table className="min-w-full mt-4 border border-gray-300">
          <thead>
            <tr className="border-b bg-gray-100">

              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Tel</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left"> Total Amount </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((purchase :any) =>
              JSON.parse(purchase.items).map((item : any) => (
                <tr key={item.id} className="border-b">
             
                  <td className="px-4 py-2">{purchase.address}</td>
                  <td className="px-4 py-2">{purchase.tel}</td>
                  <td className="px-4 py-2 text-center ">{item.quantity}</td>
                  <td className="px-4 py-2">{purchase.req_email}</td>
                  <td className="px-4 py-2">{purchase.status}</td>
                  <td className="px-4 py-2">{purchase.date}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.current_price * item.quantity} DT</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
                  ) : (
                    <p className="text-gray-500">No orders found.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
   
   </> 
   }
    </>
  );
};

export default CustomerDetails;
