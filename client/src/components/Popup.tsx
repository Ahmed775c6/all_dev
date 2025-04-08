import { addToCart } from "../Logic/utils";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { increment } from "../redux/counter";
import axios from "axios";
import { useDispatch } from "react-redux";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const ProductOverviewPopup = ({ product, onClose } : any ) => {
  const [done,setDone] = useState(false);

const [f101,setF101] = useState(false);
  const auth = useContext(AuthContext)
  const onSaveFavorite = async(product : any)=>{
  
    try{
      const ProdcutNess = {_id : product._id ,name: product.name, currentPrice : product.currentPrice, mainImage : product.mainImage}
  
  if(auth){
  
    const AuthFav = auth.user?.Fav
    const exist = AuthFav.find((item:any)=>item._id === product._id)
    if(exist){
      const index = AuthFav.indexOf(exist)
      AuthFav.splice(index,1)
      const r = await axios.post(`${baseUrl}/saveFavorit`,{id : auth?.user?._id , Fav : AuthFav})
if(r.data.message){
  setF101(true)

}
    }else{
      const newFav = ProdcutNess
      const newAuthFav = [...AuthFav,newFav]
      const r = await axios.post(`${baseUrl}/saveFavorit`,{id : auth?.user?._id , Fav : newAuthFav})
      if(r.data.message){
        setF101(true)
      
      }
    }
      
  
   
  }
  
  
    }catch(err){
      console.log(err);
      alert("something went wrong please try again");
    }
  }
  if (!product) return null;

  const onShowDetails  = (id : any) => {
    window.location.href = `/ViewProduct?id=${id}`;

  }

  const dipatch = useDispatch();
  return (
    <div className="product-popup-container w-screen min-w-screen h-screen p-0  flex fixed top-0 left-0 justify-center flex-col items-center z-50 min-h-[100vh] show" style={{display : "flex"}}>
      <div className="contact-form-wrap flex flex-col justify-center items-center  h-[100%]  active max-w-[700px]  xsxssx " id="product_popup">
        <div className="">
          <div className="contact-form-main fl-wrap " id="info_u">
            {done ? <>
            <div className="p-2  shadow-md rounded-md w-fit left-[40%] bg-gray-100 absolute z-20 top-[40%] ">
              <p className="w-full p-2">le produit est ajouté sur votre carte</p>
     <div className="w-full flex gap-3 flex-row-reverse">
     <button className="bg-indigo-400 text-white p-2 text-xs rounded-lg float-end" onClick={()=>{setDone(false)}}>J'ai compris</button>
              <button className="bg-indigo-700 text-white p-2 text-xs rounded-lg float-end" onClick={()=>{ 
window.location.href = '/cart'

              }}>Voir carte</button>
     </div>
            </div>
            </> : null}
            {f101 ? <>
            <div className="p-2  shadow-md rounded-md w-fit left-[40%] bg-gray-100 absolute z-20 top-[40%] ">
              <p className="w-full p-2">le produit est ajouté sur votre List de souhait</p>
     <div className="w-full flex gap-3 flex-row-reverse">
     <button className="bg-indigo-400 text-white p-2 text-xs rounded-lg float-end" onClick={()=>{setDone(false)}}>J'ai compris</button>
              <button className="bg-indigo-700 text-white p-2 text-xs rounded-lg float-end" onClick={()=>{ 
window.location.href = `/profile?id=${auth?.user?._id}`

              }}>Voir carte</button>
     </div>
            </div>
            </> : null}
            <div className="contact-form-header">
              <span onClick={onClose}>
                <i className="fas fa-times"></i>
              </span>
              <h4>{product.name} </h4>
              
            </div>
            <div className="product_detials">
              <div className="the_pr_image bg-white">
   {
    product.discount > 0 ?              <span className="discount_pr bg-rose-100 text-rose-500 px-2 rounded-full text-xs font-medium left-0"> ⚡{product.discount}%</span> :null
   }
                <img src={product.mainImage} alt={product.name} className="max-h-[400px] object-contain " />
              </div>
              <div className="the_pr_dt">
                <h3>{product.name}</h3>
              <div className="w-full flex gap-3">
              {<span className=" flex justify-center items-center text-center text-xs font-medium px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full " >{product.Categorie} </span>}
              {product.sous ? <span className=" flex justify-center items-center text-center text-xs font-medium px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full " >{product.sous } </span> : null}
              </div>
                <span>{product.description}</span>
                <div className="prices">
                  <span>{product.currentPrice} TND</span>
      {
        product.discount > 0 ?              <span className="old_p">{product.oldPrice} TND</span>:null
      }
                </div>
                <ul>
                  <li><span>Disponibilité: </span><span className="box_av  bg-emerald-300 rounded-full p-2 text-xs text-emerald-600">En stock</span></li>
                  <li><span>
                  Marque: </span><span className="box_brand">{product.marques}</span></li>
{product.point > 0 ?                   <li><span>
  Points de fidélité : </span><span className="box_brand">{product.point}</span></li>: null}
                </ul>
                
                <span>Livraison: Max 48h</span>
              </div>
            </div>
          </div>
          <div className="actions__hope relative">
            <button className="panier1 bg-emerald-400 rounded-3xl" onClick={() => {addToCart(product);  dipatch(increment()) ; setDone(true)}}>
              <i className="ri-shopping-cart-line"></i>Ajouter au panier
            </button>
            <button className="details1 bg-rose-400 rounded-3xl" onClick={() => onSaveFavorite(product)}>
              <i className="ri-heart-line"></i>Favorise
            </button>
            <button className="details1 bg-violet-700 rounded-3xl" onClick={() => onShowDetails(product._id)}>
              <i className="ri-eye-line"></i>Plus de détails
            </button>
  
          </div>
        </div>
        <div className="contact-form-overlay" onClick={onClose}></div>
      </div>
    </div>
  );
};

export default ProductOverviewPopup;
