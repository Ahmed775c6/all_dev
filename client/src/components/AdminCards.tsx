import { fecthDataAt } from "../Adminsator/Utils/getData";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; 

const Card = ({ icon, iconBg, iconColor, value, category }: { icon: string, iconBg: string, iconColor: string, value: string, category: string }) => {
  return (
    <motion.div
      className="p-4 bg-white dark:bg-gray-900 rounded-sm shadow-sm relative justify-center flex items-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }} 
    >
      <div
        className="w-12 h-12 absolute top-5 left-5 flex items-center justify-center rounded-full"
        style={{ backgroundColor: iconBg }}
      >
        <span style={{ color: iconColor, fontSize: "24px" }} className={icon}></span>
      </div>
      <div className="ml-4 text-gray-900 dark:text-white">
        <h3 className="text-lg font-medium">{category}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
};

const AdminCards = () => {
  const [Data, setData] = useState<any>({});
  useEffect(() => {
    const fecthing = async () => {
      const DT = await fecthDataAt();
      if (DT.message) {
        setData(DT.message);
      }
    };
    fecthing();
  }, []);
  
  const OverView = [
    { category: "Sales", value: Data.sales || 0 , icon: "ri-bar-chart-line", iconBg: "#E3FCEF", iconColor: "#4CAF50" },
    { category: "Orders", value: Data.orders || 0, icon: "ri-shopping-cart-line", iconBg: "#FFF4E5", iconColor: "#FF9800" },
    { category: "Customers", value: Data.clients || 0, icon: "ri-user-line", iconBg: "#E3F2FD", iconColor: "#2196F3" },
    { category: "Expenses", value: `${Data.cost ?Number(Data.cost).toFixed(3) : 'calculating'} TND`, icon: "ri-money-dollar-circle-line", iconBg: "#FCE4EC", iconColor: "rgb(235, 84, 99)" },
    { category: "Revenue", value: `${Data.Revenu ? Number(Data.Revenu).toFixed(3) : "calculating" } TND`, icon: "ri-line-chart-line", iconBg: "#E8F5E9", iconColor: "rgb(96, 236, 171)" }
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {OverView.map((card, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }} 
          >
            <Card
              icon={card.icon}
              iconBg={card.iconBg}
              iconColor={card.iconColor}
              value={card.value}
              category={card.category}
            />
            {/* Chart Line */}
            <svg className="w-16 h-full  absolute top-0 right-4">
              <path
                d="M 0 40 L 25 20 L 50 35 L 75 10 L 100 30"
                style={{ stroke: card.iconColor, strokeWidth: 2, fill: "none" }}
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AdminCards;
