import { useState,useRef,useEffect } from "react";
import Hero from "./Hero";
import Publ from "./Publ";
import Product from "./Product";
import ProductOverviewPopup from "./Popup";
import BrandsLinks from "./BrandsLinks";
import { AboutSC } from "../Logic/getApp";
import VisageScanner from "./visageScanner";
import {motion} from "framer-motion"
import ProductGrid from "./TabsShop";
import Hair from "./Hair";
import { useNavigate } from "react-router-dom";

const MainSection = ({ products , blogs } : any) => {
const VisageSC = products.filter((item : any) =>{return item.Categorie == "visage" && item.sous == "soin de visage"})
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef1 = useRef<HTMLDivElement>(null);
const [AboutCon,setAboutCon] = useState<any>('');
const Navigate = useNavigate()
  const ScrollLeft = () => {
    if (scrollContainerRef.current ) {
      scrollContainerRef.current.scrollLeft -= 400;
    }
  };


  const ScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 400;
    }
  };
  
  const ScrollLeft2 = () => {
    if (scrollContainerRef1.current ) {
      scrollContainerRef1.current.scrollLeft -= 400;
    }
  };

  

  const ScrollRight2 = () => {
    if (scrollContainerRef1.current) {
      scrollContainerRef1.current.scrollLeft += 400;
    }
  };

  const [activeVisageTab, setActiveVisageTab] = useState('SOLAIRE');
  const [activeCheveauTab, setActiveCheveauTab] = useState('ANTI CHUTE');
  const [activePromoTab, setActivePromoTab] = useState('Nouveaux');
  const [showItem, setShowItem] = useState<boolean | null>(null);

useEffect(()=>{
const F = async()=>{
  const data = await AboutSC();

  setAboutCon(data.message.Con);

}
F();
},[])

  const changeActiveTab = (setter : any, value : any) => setter(value);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 1; // Adjust speed if needed
    let interval: NodeJS.Timeout;

    const startScrolling = () => {
      interval = setInterval(() => {
        if (!slider) return;

        slider.scrollLeft += scrollAmount;

        
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
          slider.scrollLeft = 0;
        }
      }, 20);
    };

    startScrolling();

    return () => clearInterval(interval);
  }, []);  const slides = [...blogs, ...blogs]; 
  return (

<>

{
  showItem ? <ProductOverviewPopup  product = {showItem} onClose = {()=>{setShowItem(null)}} /> : ''
}

<section id="main" className="w-full h-full " >

<Hero/>
<Publ/> 
      <div className="visage">
        <div className="visage-top">
          <h3>Visage</h3>
          <div className="vis-link">
            <ul className="vis-links" id="sous-grps-visage">
              {['SOLAIRE', 'Peaux grasses', 'Soins anti-âge', 'Soins Anti-taches'].map(tab => (
                <li
                  key={tab}
                  className={activeVisageTab === tab ? 'active' : ''}
                  onClick={() => changeActiveTab(setActiveVisageTab, tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
            <div className="switch-modes">
              <ul>
                <li className="scroll-left" onClick={ScrollLeft}><i className="fas fa-caret-left"></i></li>
                <li className="scroll-right" onClick={(ScrollRight)} ><i className="fas fa-caret-right"></i></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="visage-main">
          <div className="visage-image">
            <img src="/assets/face.png" alt="" />
          </div>
          <div className="visage-shop" id="shopContainer" ref={scrollContainerRef} key="shopContainer">
  {products.map((product: any) => {
    if (
      product.status &&
      product.Categorie.toLowerCase() === "visage" &&
      activeVisageTab.toLowerCase() === product.sous.toLowerCase()
    ) {
      return (
        <div className="w-full" key={product._id}>
          <Product product={product} seti={setShowItem} />
        </div>
      );
    }
    return null; // Render nothing if conditions aren't met
  })}
</div>
        </div>
<VisageScanner p = {VisageSC}/>

      </div>
      <div className="w-full grid grid-cols-2 gap-2 xlsmjxxx h-full min-h-full p-2" >
        <div className="w-full flex flex-col gap-2 justify-center items-start p-4 h-full rounded-md ppp">
        <h1 className="text-3xl font-semibold text-pink-500">Makeup & Parfum</h1>
<p className="text-pink-900">Découvrez notre maquillage et parfums.</p>
<button className=" p-2 rounded-md uppercase bg-pink-500 text-white">Découvrir plus
</button>
        </div>
        <div className="w-full flex flex-col justify-center items-start ppp1 p-4 h-full gap-2 rounded-md">
<h1 className="text-3xl font-semibold text-[#144273]">Matériel orthopédique</h1>
<p className="text-blue-900">Découvrez notre gamme de matériel orthopédique, spécialement conçue pour offrir confort et mobilité aux personnes ayant des besoins spécifiques. Nos fauteuils roulants sont disponibles à la location pour vous offrir une solution pratique et adaptée à vos besoins quotidiens.

</p>
<button className="bg-blue-400 text-white p-2 rounded-md uppercase">Découvrir plus
</button>
        </div>
      </div>

      <div className="visage">
        <div className="visage-top">
          <h3>Cheveux</h3>
          <div className="vis-link">
            <ul className="vis-links" id="sous-grps-che">
              {['ANTI CHUTE', 'Compléments cheveux et ongles', 'SHAMPOOING', 'Kératine'].map(tab => (
                <li
                  key={tab}
                  className={activeCheveauTab === tab ? 'active' : ''}
                  onClick={() => changeActiveTab(setActiveCheveauTab, tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
            <div className="switch-modes">
              <ul>
                <li className="scroll-left" onClick={ScrollLeft2} ><i className="fas fa-caret-left"></i></li>
                <li className="scroll-right" onClick={ScrollRight2}><i className="fas fa-caret-right"></i></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="visage-main">
          <div className="visage-image ch">
            <img src="/assets/hair.png" alt="chevaux" />
          </div>
          <div className="visage-shop" id="shopContainer2" ref={scrollContainerRef1}>
  {products.map((product: any) => {
    if (
      product.Categorie.toLowerCase() === "cheveau" &&
      activeCheveauTab.toLowerCase() === product.sous.toLowerCase()
    ) {
      return (
        <div className="w-full" key={product.id}>
          <Product product={product} seti={setShowItem} />
        </div>
      );
    }
    return null;
  })}
</div>
        </div>
        <Hair/>
      </div>
      <div className="w-full grid grid-cols-2 gap-2 xlsmjxxx h-full min-h-full p-2" >
        <div className="w-full flex flex-col gap-2 justify-center items-start p-4 h-full min-h-96 rounded-md ppp2">
        <h1 className="text-3xl text-yellow-400 font-semibold">Nitrition Sportive</h1>
<p className="text-gray-200">Découvrez notre complement nitrtive </p>
<button className="bg-yellow-500 p-2 rounded-md uppercase text-white ">Découvrir plus</button>
        </div>
        <div className="w-full flex flex-col justify-center items-start ppp3 p-4 h-full min-h-96 gap-2 rounded-md">
<h1 className="text-3xl font-semibold text-green-900">Animalerie</h1>
<p className = 'text-gray-600'>tout ce dont votre animal a besoin.</p>
<button className="bg-green-800 text-white p-2 uppercase rounded-md">Découvrir plus</button>
        </div>
      </div>
      <div className="top-promos">
        <div className="switch-buttons">
          <ul className="hhhhxx flex bg-white  ">
            {['Nouveaux',  'NOS TOP PROMOS'].map(tab => (
              <li
                key={tab}
                className={` sw-btn new_btn  justify-center text-center ${tab.toLowerCase().replace(/ /g, '_')}_btn ${activePromoTab === tab ? 'active' : ''}`}
                onClick={() => setActivePromoTab(tab)}
              >
                <span>{tab}</span>
              </li>
            ))}
          </ul>
        </div>
   <ProductGrid products={products} activePromoTab={activePromoTab} setShowItem={setShowItem}  />
        <div className="about-us bg-white ">
        <div className="col-inner">
  <h1>PARAPHARMACIE MAPARA TUNISIE</h1>
  <div className="j">
    <iframe 
      srcDoc={`
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
          * {
            font-family: Poppins, sans-serif !important;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        </style>
        ${AboutCon}
      `}
      style={{ 
        width: '100%',
        border: 'none',
        overflow: 'hidden',
      }}
      scrolling="no"
      onLoad={(e) => {
        const iframe = e.target as HTMLIFrameElement;
        const resizeObserver = new ResizeObserver(() => {
          if (iframe.contentWindow) {
            iframe.style.height = `${iframe.contentWindow.document.documentElement.scrollHeight}px`;
          }
        });

        // Observe changes in the iframe content
        iframe.contentWindow?.document.body && 
          resizeObserver.observe(iframe.contentWindow.document.body);
      }}
    />
  </div>
</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md shadow-sm flex flex-col gap-3" id="magazine" data-blog={blogs}>
        <div className="w-full flex justify-between">
          <h2 className="text-md text-gray-900">Nos Articles</h2>
          <a href="/blog" className="uppercase text-md text-gray-900 flex gap-2" onClick={()=>{Navigate('/blog')}}>lire Plus <i className="ri-arrow-right-line"></i></a>
        </div>
        <div className="w-full overflow-hidden relative "> {/* Dark background for entire slider */}
      <motion.div
        className="flex gap-2 rounded-md"
        animate={{
          x: ["0%", "-100%"], // Moves left continuously
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 10, // Adjust speed (lower = faster)
        }}
        style={{ width: "100%" }}
      >
        {slides.map((item: any, index: number) => (
          <div
            className="relative flex flex-col gap-3 w-[33.33%] shrink-0 cursor-pointer"
            key={`b-${index}`}
onClick={()=>{
  window.location.href=`blog_item?id=${item._id}`
}}
          >
            {/* Image wrapper with dark overlay */}
            <div className="relative w-full h-full">
              <img
                src={item.image}
                alt={`Blog ${index}`}
                className="w-full rounded-md h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/35 rounded-md"></div>
            </div>

            {/* Title Text */}
            <p className="absolute bottom-4 w-full text-center p-4 text-white flex justify-center items-center">
              {item.title.substring(0, 120)}..
            </p>
          </div>
        ))}
      </motion.div>
    </div>
      </div>
<BrandsLinks/>
 
    </section>

</>
  );
};

export default MainSection;
