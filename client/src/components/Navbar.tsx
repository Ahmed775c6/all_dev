import { useState,useEffect,useContext } from "react";
import Carte from "./Carte";
import Login from "./Login";
import SignupForm from "./SignupForm";
import AuthContext from "../context/AuthProvider";
import Contact from "../pages/Contact";
import { Links } from "../Logic/getApp";
import {   useSelector } from "react-redux";

import { LVG } from "../Logic/getApp";

import MobileCategoryMenu from "./MobileMenu";


const Navbar = ( ) => {

 const {value} = useSelector((state : any) => state.counter);  
const [Gratuit,setGratuit] = useState<any>(0);

 const auth = useContext(AuthContext);
  const [caret,setCaret] = useState(false);
const [showp,setShowp] = useState(false);
const [showO,setShowO] = useState(false);
const [contactView,setContact] = useState(false);

const [links,setLinks] = useState<any>([]);
const [Sv,setSv] = useState('');
const [hImg,setHimg] = useState<any>([])
const [Menu,setMenu] = useState(false);

useEffect(() => {

  const FetchL = async() =>{
    const W = await Links();
    const G = await LVG();
    setLinks(W.requiredData);
    setHimg(W.images)
    setGratuit(G);
  }
  FetchL();

}, []);


  
  const popup = () => {
showp ? setShowp(false) : setShowp(true);
  };

  const popup2 = () => {
showO ? setShowO(false) : setShowO(true);
  };

  const toggelMenu = () => {
setMenu(!Menu)
  };

  const popupMenuBarPrf = () => {
    // Profile menu logic here
    setshow(!show)
  };


  const handelSrarh = async(e:any)=>{
  e.preventDefault()
try{
window.location.href = `/shop?direction=${Sv}`

} catch(err){

  alert('unexpected error refresh and try again')
} 
}
const [show,setshow] = useState(false);
const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (

  
<>
{
  Menu ? <MobileCategoryMenu links = {links} hImg = {hImg} setclose = {setMenu} /> : null
}

{
  caret ? <Carte setCaret = {setCaret}  /> : ''
}

{
  showp ? <Login closeSignIn = {popup} /> : ''
}
{
  showO ? <SignupForm closeSignUp = {popup2} /> :''
}
{
  contactView ? <Contact SetClose= {setContact} /> : ''
}

<header className="w-full max-w-full" >
      <div className="top-laiv-bar bg-[#144273] w-full max-w-full" >
        <div className="blog-link link">
          <i className="fas fa-book"></i>
          <p>
            <a href="/blog">Our Blog</a>
          </p>
        </div>
        <div className="liavrison">
          LIVRAISON GRATUITE À PARTIR DE {Gratuit} TND D'ACHATS DANS TOUTE LA TUNISIE!
        </div>
        <div className="contacts link">
          <i className="fas fa-phone"></i>
          <button onClick={()=>{
            setContact(true);
          }} >Contact</button>
        </div>
      </div>


     {
      auth?.user == null ?  <div className="nav-mobile w-full max-w-full">
      <button className="mobile-btn" onClick={popup}>
        <i className="fas fa-user"></i>
        <p>Se Connecter</p>
      </button>
      <button className="mobile-btn" onClick={popup2}>
        <i className="fas fa-pen"></i>
        <p>Register</p>
      </button>
    </div> :
    ''
     }

      <div className="flex w-full  justify-between items-center flex-col gap-2 max-w-full  p-3 bg-white ">
        <div className="left-side-bar w-full items-start   ">
          <a className="flex gap-0" href="/">
         
   <h2 className="w-full p-2 text-[1.2rem] text-[#144273] font-semibold ">AllParaTunisie</h2>
          </a>
     
        </div>

        <div className="flex w-full bg-gray-100">
          <form className="w-full flex" onSubmit={handelSrarh} >
            <input
              type="text"
              id="search"
              name="search"
              className="p-3 w-full flex  bg-gray-100 outline-none border-none "
              placeholder="Search ..."
              value={Sv}
              onChange={(e:any)=>{setSv(e.target.value)}}
            />
            <i className="ri-search-line text-white p-3 cursor-pointer bg-[#144273]" onClick={()=>{window.location.href = `/shop?direction=${Sv}`}}></i>
            <div className="suggestions" id="suggestions"></div>
          </form>
        </div>

        <div className="auth w-full">
          <div className="menu" onClick={toggelMenu}>
            <i className="fas fa-bars"></i>
            <p>Menu</p>
          </div>
    {
      auth?.user == null ?
     <>
          <div className="sign-in" onClick={popup}>
      <i className="ri-user-shared-line"></i>
      <p className="text-sm">Sign in</p>
    </div>
    <div className="sign-up" onClick={popup2}>
      <i className="ri-user-add-line"></i>
      <p className="text-sm">Sign up</p>
    </div>
     
     </>:''
    }
          <div className="profile_pic  " style={{
display : `${auth?.user == null ? 'none' : "flex"}`  , height : '25px !important'
          }} onClick={popupMenuBarPrf}>
            <img src={`${auth?.user?.pdf}`} alt="Profile" />
            <div className={
              `popup_menu_prf ${show ? "show" :  ""}`
            }>
              <a className="voir_profile" href={`/profile?id=${auth?.user?._id}`}>
                <i className="ri-user-line"></i> Show Profile
              </a>
              <div className="voir_profile">
                <i className="ri-settings-line"></i> Settings
              </div>
              <div className="voir_profile">
                
             
        
              <button  onClick={async()=>{
                await auth?.logout();
        
                window.location.href = "/";
              }} className="p-0 w-full flex gap-2 bggg">      Logout</button>

              </div>
            </div>
          </div>
          <div className="fav cart" onClick={()=>{auth?.user == null ? popup() : window.location.href = "profile"}}>
{
  auth?.user ?           <div className="absolute top-0 bg-red-400 rounded-full flex items-center justify-center text-center text-sm text-white p-1  h-4 right-4" id="cart_counter">
  {auth.user.Fav.length}
</div> : null
}
            <i className="ri-heart-line"></i>
            <p className="text-sm">Fav</p>
          </div>
          <div className="cart" onClick={()=>{setCaret(true)}}>
            <div className="absolute top-0 bg-red-400 rounded-full flex items-center justify-center text-center text-sm text-white p-1  h-4 right-4" id="cart_counter">
              {value }
            </div>
            <i className="ri-shopping-cart-2-line"></i>
            <p className="text-sm">Cart</p>
          </div>
        </div>
      </div>

      <div className="header-links w-full max-w-full">
        <div className="links">
          <ul>
            <li>Promos</li>
            <li>Nouveautés</li>
            <li>Bons Plans</li>
            <li>Marques</li>
            <li>Nos coffrets</li>
          </ul>
        </div>
        <div className="links2 makeup">
          <ul>
            <li >
              <img src="/assets/makeuo.png" alt="Makeup" />
              <a href="/makeup">Maquillage</a>
            </li>
          </ul>
        </div>
        <div className="links2 gym">
          <ul>
            <li>
              <img src="/assets/gym.png"  alt="Gym" />
              <a href="/gym">Nutrition Sportive</a>
            </li>
          </ul>
        </div>
        <div className="animals links2">
          <ul>
            <li>
              <img src="/assets/animals.png"  alt="Animals" />
              <a href="/animals">Animalerie</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="other-links relative">
  <ul>
    {[
      { id: "visage", text: "Visage", query: "Visage" },
      { id: "cheveux", text: "Chéveux", query: "Cheveux" },
      { id: "corps", text: "Corps", query: "Corps" },
      { id: "bebe", text: "Bébé et Maman", query: "Bebe" },
      { id: "complement", text: "Compléments Alimentaires", query: "Complement" },
      { id: "hygiene", text: "Hygiène", query: "Hygiene" },
      { id: "solaire", text: "Solaire", query: "Solaires" },
      { id: "bio", text: "Bio et Nature", query: "Bioetnature" },
      { id: "medical", text: "Matériel Médical", query: "Medical" },
      { id: "homme", text: "Homme", query: "Homme" },
    ].map((category) => (
      <li
        key={category.id}
        className={`links_with_drops ${hoveredCategory === category.id ? "active" : ""}`}
        onMouseEnter={() => setHoveredCategory(category.id)}
     
      >
        <a href={`/shop?direction=${category.query}`}>{category.text}</a>
      </li>
    ))}
  </ul>

  {hoveredCategory && (
    <div 
      className="absolute bg-white shadow-sm z-20 w-full top-full min-h-[60vh] flex justify-between p-4"
      onMouseLeave={() => setHoveredCategory(null)}
    >
  {
    <div className="w-full grid grid-cols-4  ">
  {links
    ?.filter((link: any) => 
      link.content.categorie.toLowerCase() === hoveredCategory.toLowerCase()
    )
    // Group links by slug
    .reduce((groups: {[key: string]: any[]}, link: any) => {
      const slug = link.content.slug;
      if (!groups[slug]) groups[slug] = [];
      groups[slug].push(link);
      return groups;
    }, {})
    // Map through the groups
    && Object.entries(
      links?.filter((link: any) => 
        link.content.categorie.toLowerCase() === hoveredCategory.toLowerCase()
      ).reduce((groups: {[key: string]: any[]}, link: any) => {
        const slug = link.content.slug;
        if (!groups[slug]) groups[slug] = [];
        groups[slug].push(link);
        return groups;
      }, {})
    ).map(([slug, groupLinks], index) => (
      <div key={`${slug}-${index}`} className="w-full p-2 flex flex-col gap-2 justify-start text-start">
        <h3 className="text-lg font-semibold text-[var(--text-color)] cursor-pointer " onClick={()=>{window.location.href = `/shop?direction=${slug}`}}>{slug}</h3>
        <div className="ml-4 grid flex-col gap-1">
          {(groupLinks as any[]).map((link :any, linkIndex :any) => (
            <a 
              key={`${slug}-link-${linkIndex}`}
              href={link.content.linkName}
              className="text-[#144273] transition duration-300 ease-in-out"
            >
              {link.content.linkName}
            </a>
          ))}
        </div>
      </div>
    ))}
</div>
  }
  {
hImg.map((o:any)=>(
  <>
  {o.id == hoveredCategory ? 
  <>
  <div className="w-56 p-2 bg-blue-100 flex flex-col h-full min-h-[50vh] gap-3 rounded-sm relative ">
  <img src={o.link} alt={`o-${o.id}`} className="w-full object-cover h-full min-h-[40vh] rounded-sm mr-2 relative" key ={`index-${o.id}`} /> 
   
   <button className="aw-full p-2 rounded-sm  flex gap-2 text-gray-900" onClick={()=>{window.location.href = `/shop?direction=${hoveredCategory}`}}>
   Découvrir toute la gamme <i className="ri-arrow-right-line"></i>				</button> 
  </div>
  </>
  
  : null}
  </>
))
  }
    </div>
  )}
</div>

      
    </header>
</>
  );
};

export default Navbar;
