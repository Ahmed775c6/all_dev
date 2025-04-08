import { useState,useContext } from "react";
import { addToCart } from "../Logic/utils";
import Placed from "./Placed";
import { motion } from "framer-motion";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/counter";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const Product = ({ product, seti }: any) => {
  const toggleProductOverview = (id: any) => {
    seti(id);

  };
const saveFav = async(product : any)=>{
  try{
    const ProdcutNess = {_id : product._id ,name: product.name, currentPrice : product.currentPrice, mainImage : product.mainImage}

if(auth){

  const AuthFav = auth.user?.Fav
  const exist = AuthFav.find((item:any)=>item._id === product._id)
  if(exist){
    const index = AuthFav.indexOf(exist)
    AuthFav.splice(index,1)
    await axios.post(`${baseUrl}/saveFavorit`,{id : auth?.user?._id , Fav : AuthFav})
 
  }else{
    const newFav = ProdcutNess
    const newAuthFav = [...AuthFav,newFav]
    await axios.post(`${baseUrl}/saveFavorit`,{id : auth?.user?._id , Fav : newAuthFav})
 
  }
    

 
}


  }catch(err){
    console.log(err);
    alert("connecter a votre compte pour enregistrer cette produit sur votre favorise");
  }
}
  const [C, setC] = useState(false);
const auth = useContext(AuthContext)
const {value} = useSelector((state : any)=>state.counter)
if(value){

}
const dipatch = useDispatch();
  return (
    <>
      {C ? <Placed setC={setC} /> : ""}
      <motion.div layout className="product2">
        <div className="product_img  bg-white">
          <img
            src={product.mainImage} // Updated to use mainImage
            alt={product.name }
            className="max-h-[60%] object-cover h-[60%]"
          />
          <div className="actions z-20">
            <i
              className="ri-shopping-cart-line"
              onClick={() => {
                addToCart(product);
                dipatch(increment())
                setC(true);
              }}
              id={product._id} // Updated to use _id
            ></i>
            <i className={`ri-heart-line `}  onClick={()=>{saveFav(product)}}></i>
            <i
              className="ri-eye-line"
              id={`click_${product._id}`} // Updated to use _id
              onClick={() => toggleProductOverview(product)} // Pass _id to toggleProductOverview
            ></i>
          </div>
        </div>
        <div className="product_content">
          <div className="title_dis">
            <p style={{color : '#4338ca' }}>{product.name.substring(0,21)} </p>
            <span>{product.description.substring(0, 30)}...</span>
          </div>
          <div className="price_pource">
            <div className="price flex-wrap">
              <div className="current_price">{product.currentPrice} TND</div> {/* Updated to currentPrice */}
             {product.discount > 0 ?   <div className="old_price">{product.oldPrice} TND</div> : null}
            </div>
          {
            product.discount > 0 ?   <span className="purcentage absolute top-5 z-10 bg-rose-100 text-rose-500 px-2 rounded-full text-xs font-medium">
          ⚡  {product.discount} %
          </span> : null
          }
          {<span className=" flex justify-center items-center text-center text-xs font-medium px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full " >{product.Categorie} </span>}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Product;
