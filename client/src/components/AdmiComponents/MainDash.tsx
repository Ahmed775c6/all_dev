import { useEffect, useState } from "react";
import AdminCards from "../AdminCards";

import { motion } from 'framer-motion';

import CustomerTables from "../../Adminsator/BestCostumers";
import { FetchAnalyse2 } from "../../Adminsator/Utils/getData";
import { useAdminAuth } from "../../context/AdminAuthProvider";
import ProductTables from "../../Adminsator/ProductsToptable";
import OVChart from "../../Adminsator/OvChart";
import Devices from "../../Adminsator/Devices";
import OrderTableToday from "./OrdersOfToday";
const MainDash = () => {

  const auth = useAdminAuth()
  const [GeneralData, setGeneralData] = useState<any>(null);

  const [name,setName] = useState('')
  useEffect(()=>{
setName(auth.userData?.name)
   const fetchData = async () => {
      const DT = await FetchAnalyse2();
      if (DT) {
        setGeneralData(DT);

      }
    };
    fetchData();
  },[auth])
  const [status, setStatus] = useState<string>('all');
  const d = GeneralData?.General
  return (
    <>
      <section className="w-full flex flex-col p-4 gap-3">
        <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb this_div">
          <div>
            <p className="fw-semibold fs-18 mb-0 text-gray-900 dark:text-white">Welcome back, {name} </p>
            <span className="fs-semibold text-muted dark:text-gray-400">Track your sales activity, leads, and deals here.</span>
          </div>
        </div>

        <AdminCards />

   <div className="w-full flex gap-3 sx">
   <div className="w-full flex flex-col p-3 rounded-md shadow-md bg-white dark:bg-gray-900">
          <header className="w-full p-2 flex flex-row gap-3 ew justify-between" style={{
            borderBottom: "1px solid #ccc"
          }}>
            <h1 className="bg-gray-200 text-black dark:text-white dark:bg-gray-600 jsh w-full ">Orders Of Today</h1>
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
          <OrderTableToday statusOeder={status} />
        </div>
     <div className="w-full gap-3">
{
  d ? <>
  <OVChart data={GeneralData?.General} />
  </> : null
}

     </div>
       
   </div>
<div className="w-full flex gap-3 sx">
<div className="w-full gap-3">
{
  d ? <>
      <ProductTables data={GeneralData?.General} /></> : null
}
        </div>
        <div className="w-full gap-3">
{
  d ? <>
      <CustomerTables data={GeneralData?.General} /></> : null
}

        </div>
        
</div>
<Devices adminId={auth.userData?._id || ''} />
      </section>
    </>
  );
};

export default MainDash;
