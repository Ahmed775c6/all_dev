import { useState,useEffect } from "react"
import axios from "axios"
import { GetHotDL } from "../Logic/getApp"
import { addToCart } from "../Logic/utils"
import Placed from "./Placed"
import CountdownTimer from "../Adminsator/counterTimer"

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const Data = [{
    id : '1',
    src : '/assets/pr1.png',
},
{
    id : '2',
    src : '/assets/pr2.png',
},
{
    id : '2',
    src : '/assets/pr3.png',
}

]



const Publ = () => {
    const [index,setIndex] = useState(0);
    const [current,setCurrent] = useState<any>(`${Data[index].src}`);
    const [data, setData] = useState<any>(null); // State to store the data from the GET request
  
    const [error, setError] = useState<string | null>(null);
    const [Publll,setPublll] = useState([]); // State for handling errors
const [C,setC] = useState(false);
    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
      const fetchData = async () => {
     
        try {
          const response = await axios.get(`${baseUrl}/appData`);
          const Pub = response.data.Send.pub.Data;
      
          Pub != null ?  
          setPublll(Pub) : 
          setPublll([])
         // Store the response data in state
        
        } catch (err) {
          setError("An error occurred while fetching data."); 
        
        }
      };
      const F = async() =>{
        const d = await GetHotDL();
      setData(d);
      setCurrent(d[0])
      }
      F();
  
      fetchData();
    
    }, []);
    console.log(error)
  return (
<>
{C ? <Placed setC={setC} /> : ""}
<section className="publiciteé bg-white" >
      <div className="two-splits">
        <div className="pub">
            {
                Publll.map((img,index)=>(
                    <img src={img} className="w-full  max-h-80 object-contain" alt={`pub-${index}`} key={index} id={`hot_pub_${index}`} />            
                ))
            }
   
        </div>
        <div className="w-full relative">
          <div className="command-line">
            <div className="right">
              <i className="fas fa-hand-point-right"></i>
              <h4>Hot Deals</h4>
              <i className="fas fa-fire"></i>
            </div>
     
          </div>
          <div className="displayed-command p-2 w-full ">
            <div className="small-images ">
          {
            data?.map((pr:any,index :any)=>(
                <img src={pr.mainImage} alt={`pr-${index}`} className="w-32  h-32" key={index} onClick={()=>{
                    setIndex(index);
                    setCurrent(pr);
                  
                 
                }} />

            ))
          }
            </div>
            <div className="w-full flex flex-col ml-0 relative  gap-0 shadow-lg cursor-pointer " onClick={()=>{
              window.location.href = `/ViewProduct?id=${current._id}`
            }} >
    {
            current?.discount > 0 ?   <span className="purcentage absolute top-5 left-2 z-10 bg-rose-100 text-rose-500 px-2 rounded-full text-xs font-medium">
          ⚡  {current?.discount} %
          </span> : null
          }
     <img src={current?.mainImage} className="w-full min-w-full" alt="big-boy" />
     <CountdownTimer expirationDate={current?.expiration}/>
            
            <div className="w-full flex flex-col gap-2 p-2 bg-blue-100" >
<h1 className="uppercase text-lg font-semibold"> {current?.name} </h1>

<div className="price flex  gap-2">
  <div className="current_price">{current?.currentPrice} TND</div>
 <div className="old_price line-through text-[12px]">{current?.oldPrice} TND</div> 
 </div>
<button className="bg-[var(--ghame9)] text-white cursor-pointer p-2 rounded-3xl" onClick={()=>{
  addToCart(current)
  setC(true)
}}>Ajouter au Panier</button>
            </div>
     </div>
          </div>
        </div>
      </div>
    </section>


</>
  )
}

export default Publ