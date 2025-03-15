import { useEffect, useState } from "react";
import { FetchAnalyse } from "./Utils/getData";

import Aside from "../components/AdmiComponents/Aside";
import Nav from "../components/AdmiComponents/Nav";
import Loader from "../components/Loader";
import Themes from "../components/AdmiComponents/Themes";
import "../Adminsator/Styles.css";
import DisplayIncomeChart from "./IncomeLine";
import RankTb from "./RankMP";
import { Bar, Pie, Doughnut ,PolarArea  } from 'react-chartjs-2';
import CustomerTables from "./BestCostumers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,RadialLinearScale,
} from 'chart.js';


// Register the required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,RadialLinearScale,
  Legend,
);
const Analytics = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [GeneralData, setGeneralData] = useState<any>(null);
  const [byState,setByEstate] = useState<any>([]);
  const [SalesByGendre, setSalesByGendre] = useState<any>([]);
  const [SalesByCategory, setSalesByCat] = useState<any>([]);
  const [Brands,setBrands] = useState<any>([])
  const [AsideT, setAside] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Changing, setChanging] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const DT = await FetchAnalyse();
      if (DT) {
        setGeneralData(DT);
        setSalesByCat(DT.CategorieCal);
        setSalesByGendre(DT.Gen);
        setByEstate(DT.State)
        setBrands(DT.Brands.Brands)
 
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  }, [theme]);



 
  let t1 = 0;
  SalesByCategory?.map((item: any) => {
    t1 += item.value;
  });


  const chartData = {
    labels: SalesByCategory?.map((item: any) => item.name),
    datasets: [{
      data: SalesByCategory?.map((item: any) => (item.value / t1) * 100),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        '#FFCD56', '#FFB6C1', '#C2C2F0', '#FF6666', '#FFB3FF', '#A0E4FF'
      ],
    }],
  };

const barChartData = {
  labels: SalesByGendre?.map((item: any) => item.name) || [],
  datasets: [
    {
      label: 'Sales by Gendre',
      data: SalesByGendre?.map((item: any) => parseFloat(item.value)) || [],
      backgroundColor: ['#36A2EB', '#FF6384'],
      borderColor: ['#1E90FF', '#FF4500'],
      borderWidth: 1,
    },
  ],
};

  
  
    const barChartData2 = {
      labels: byState?.map((item: any) => item.etat),
      datasets: [{
      
        data: byState?.map((item: any) => parseFloat(item.percentage)), 
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF',
          '#FF9F40', '#FFCD56', '#4BC0C0', '#7E57C2', '#26A69A', '#EC407A',
          '#AB47BC', '#8D6E63', '#78909C', '#D4E157', '#F06292', '#BA68C8',
          '#4DD0E1', '#FFD54F', '#FF7043', '#42A5F5', '#66BB6A', '#D81B60'
        ],
      
        borderColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF',
          '#FF9F40', '#FFCD56', '#4BC0C0', '#7E57C2', '#26A69A', '#EC407A',
          '#AB47BC', '#8D6E63', '#78909C', '#D4E157', '#F06292', '#BA68C8',
          '#4DD0E1', '#FFD54F', '#FF7043', '#42A5F5', '#66BB6A', '#D81B60'
        ],
        borderWidth: 1,
      }],
    };
    const generateRandomColor = () => {
      const randomChannel = () => Math.floor(Math.random() * 256); // 0-255
      return `rgb(${randomChannel()}, ${randomChannel()}, ${randomChannel()})`;
    };
    const backgroundColor = Array.from({ length: 2000 }, generateRandomColor);
    const barChartData3 = {
      labels: Brands?.map((item: any) => item.name),
      datasets: [{
      
        data: Brands?.map((item: any) => (item.value / t1) *100), 
        backgroundColor: backgroundColor,
      
        borderColor: backgroundColor,
        borderWidth: 1,
      }],
    }; 
   
   const Income = GeneralData?.General?.filter((item : any)=>{
    return item.status === "Dilivired"
 
   })


  
const d = GeneralData?.General

  return (
    <>
{Loading ? <Loader/>: null}
      {Changing ? <Themes setCh={setChanging} /> : ''}
      <div className="w-full flex dark:bg-[#2d3748] ">
        <Aside AsideT={AsideT} setAsideT={setAside} />
        <div className="w-full min-h-[100vh] bg-[#edf4f6] dark:bg-[#2d3748] flex flex-col">
          <Nav AsideT={AsideT} setAside={setAside} />
          <div className="w-full grid grid-cols-3 gap-3 xsx p-6">
            <div className="w-full bg-white flex flex-col gap-2 justify-center items-center dark:bg-gray-900">
              <header className="w-full p-2 text-center">
                <h1 className="p-2 text-xl font-semibold dark:text-white">Sales By Categories (%)</h1>
              </header>
              <div className="w-full flex justify-center items-center max-w-full rounded-md p-4">
                <Pie data={chartData} />
              </div>
            </div>

            <div className="w-full bg-white flex flex-col gap-2 justify-center items-center dark:bg-gray-900">
              <header className="w-full p-2 text-center">
                <h1 className="p-2 text-xl font-semibold dark:text-white">Sales By Genders (%)</h1>
              </header>
              <div className="w-full flex justify-center items-center max-w-full rounded-md p-4">
                <Bar data={barChartData} />
              </div>
            </div>
            <div className="w-full bg-white flex flex-col gap-2 justify-center items-center dark:bg-gray-900">
              <header className="w-full p-2 text-center">
                <h1 className="p-2 text-xl font-semibold dark:text-white">Sales By State (%) </h1>
              </header>
              <div className="w-full flex justify-center items-center max-w-full rounded-md p-4">
              <Doughnut data={barChartData2} />
              </div>
            </div>
  

          </div>
    <div className="w-full grid grid-cols-2 gap-3 p-6 lara">
  <div className="w-full bg-white flex flex-col gap-2 justify-center items-center dark:bg-gray-900">
              <header className="w-full p-2 text-center">
                <h1 className="p-2 text-xl font-semibold dark:text-white">Sales By Brands (%) </h1>
              </header>
              <div className="w-full flex justify-center items-center max-w-full rounded-md p-4">
                <PolarArea data={barChartData3} />
              </div>
            </div>
            <div className="w-full bg-white flex flex-col gap-2 justify-center items-center dark:bg-gray-900">
              <h1 className="text-xl font-semibold dark:text-white">Income (TND) </h1>
   <DisplayIncomeChart Income={Income} />
    </div>

{
  d ? <>
      <CustomerTables data={GeneralData?.General} /></> : null
}
{
<RankTb  data={GeneralData?.General}/>
}
  </div>
        </div>

        <button
          className="fixed justify-center right-10 bottom-10 rounded-full w-11 h-11 text-center items-center outline-none border-none cursor-pointer flex p-2 bg-blue-400 text-white"
          onClick={() => {
            setChanging(true);
          }}
        >
          <i className="ri-settings-line"></i>
        </button>
      </div>
    </>
  );
};

export default Analytics;
