import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState } from "react"
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { useLocation } from "react-router-dom";
const ChangeP1012 = () => {
    const [load,setLoad] = useState(false);
const [pass,setpass] = useState('');
const [found,setFound] = useState(false); 
   const location = useLocation();
   const [match,setNotMAtch] = useState(false);
   const [confrlpass,setconf] = useState('');
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const [sucess,setSucess] = useState(false);   

const handleSubmit = async(e : any)=>{
    try{
e.preventDefault();
setLoad(true);
if(pass == confrlpass){
    setNotMAtch(false)

    const res =await axios.post(`${baseUrl}/sayee/${id}`,{pass})
    if(res.data.message){
        setSucess(true);
        setLoad(false);
    }else{
    setFound(true)
    setLoad(false);
    }
}else{
    setNotMAtch(true)
    setLoad(false)
}

    }catch(err){
    console.log(err);
    alert("something went wrong ! refresh & try again");
    }
  }
  return (
<>
<Navbar/>
<div className="w-full p-6  flex flex-col justify-center bg-white shadow-sm rounded-sm items-center">

    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-white shadow-sm rounded-sm p-4">
    <h1 className="text-xl font-bold text-center">
    mot de passe oublié</h1>
{found ?  <p className="text-red-400">something went wrong try again</p>  : null}
{
    sucess ?  <p className="text-green-400">mot de passe modifié avec succès</p>:null
}
{match ? <p className="text-yellow-400">les mot de passe ne match pas</p> : null }
        <label htmlFor="email">
        nouveau mot de passe :</label>
<input type="password" name="password" id="password" placeholder=" password " value={pass} onChange={(e:any)=>{setpass(e.target.value)}} required className="bg-gray-200 w-full p-2 " />
<label htmlFor="email">confirmer votre mot de pass :</label>
<input type="password" name="password2" id="password2" placeholder="confirme password " value={confrlpass} onChange={(e:any)=>{setconf(e.target.value)}} required className="bg-gray-200 w-full p-2 " />
 
 
 <button className="bg-blue-950 p-2 text-white rounded-sm cursor-pointer uppercase" disabled = {load} type="submit">{load ? "recherche ..." : 'sauvegarder'}</button>
   {sucess ? <a href="/">accuiell</a> : null }
    </form>
</div>
<Footer/>
</>
  )
}

export default ChangeP1012