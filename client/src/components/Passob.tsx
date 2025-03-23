import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState } from "react"
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const Passob = () => {
    const [load,setLoad] = useState(false);
const [email,setEmail] = useState('');
const [found,setFound] = useState(false);    

const handleSubmit = async(e : any)=>{
    try{
e.preventDefault();
setLoad(true);
const res =await axios.post(`${baseUrl}/findme/${email}`)
if(res.data.message){
    window.location.href = `/er?token=${res.data.token}`
}else{
setFound(true)
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
    <h1 className="text-xl font-bold text-center">Mot de passe Oublié</h1>
{found ?  <p className="text-yellow-400">il n'y a aucun utilisateur avec cet e-mail </p>  : null}
        <label htmlFor="email">Email :</label>
<input type="email" name="email" id="email" placeholder="email " value={email} onChange={(e:any)=>{setEmail(e.target.value)}} required className="bg-gray-200 w-full p-2 " />
 <button className="bg-blue-950 p-2 text-white rounded-sm cursor-pointer uppercase" type="submit">{load ? "recherche ..." : 'trouver mon compte'}</button>
    </form>
</div>
<Footer/>
</>
  )
}

export default Passob