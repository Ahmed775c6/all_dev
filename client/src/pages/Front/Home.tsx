import { useState,useContext ,useEffect } from "react"

import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import MainSection from "../../components/MainSection"
import Loader from "../../components/Loader"

import ChatSupport from "../../components/ChatSupport"
import { GetP ,Blogs} from "../../Logic/getApp"
import AuthContext from "../../context/AuthProvider"






const Home = () => {
  const [Loading,setLoading] = useState(true);
  const [products, setProducts] = useState<any | []>([]); 
  const [art, setArt] = useState<any | []>([]); 
const me = useContext(AuthContext)?.user
const idM = me?._id;
const name = me?.name;
const photo = me?.pdf;


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetP();
        const b = await Blogs();
setArt(b.data)
        setProducts(response); 
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    setLoading(false)
  }, []); // Empty dependency array to run once on mount

  
  
  return (
 <>
{
  Loading ?  <Loader/> : ''
}


 <Navbar />

 <MainSection products ={products} blogs = {art} />

<Footer/>
{
  <ChatSupport id = {idM} senderME = {{
    name: name,
    photo: photo
    
  }}/>
}
 </>
  )
}

export default Home