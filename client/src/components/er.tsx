import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect, useState } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom";


const baseUrl = import.meta.env.VITE_API_BASE_URL;
const Er = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("token");
    const [la,setLA] = useState(false);
    useEffect(()=>{
  const F = async ()=>{
    const v = await axios.get(`${baseUrl}/estque/${id}`);
    console.log(v.data)
    if(v.data.message){
     setLA(true)
    }
  }
  F()
    },[la])
    const [load,setLoad] = useState(false);
    const [code, setCode] = useState(["", "", "", "", ""]);

const [found,setFound] = useState(false);    
const handleSubmit = async(e : any)=>{

    let l = '';
    code.map((i)=>{l+=i})
    try{
e.preventDefault();
setLoad(true);
const res =await axios.post(`${baseUrl}/vme/${id}`,{code : l})
if(res.data.message){
    window.location.href = `/changex?id=${res.data.id}`
}else{
setFound(true)
}
    }catch(err){
    console.log(err);
    alert("something went wrong ! refresh & try again");
    }
  }
  const handleChange = (index: number, value: string) => {

      if (!/^\d?$/.test(value)) return; 
  
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
  
 
      if (value && index < 4) {
          document.getElementById(`digit-${index + 1}`)?.focus();
      }
  };
  

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
          document.getElementById(`digit-${index - 1}`)?.focus();
      }
  };

  return (
    <>
    {la ?
        <>
        <Navbar/>
<div className="w-full p-6  flex flex-col justify-center bg-white shadow-sm rounded-sm items-center">

    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-white shadow-sm rounded-sm p-4">
    <h1 className="text-xl font-bold text-center">
    mot de passe oublié</h1>
{found ?  <p className="text-yellow-400">incorrect Code</p>  : null}

<p><strong>
REMARQUE : ce jeton expirera dans 15 minutes</strong></p>
<p>
un code a été envoyé à votre email, s'il ne se trouve pas dans votre boîte de réception, vérifiez vos spams
<span className="text-amber-600">SI VOUS N'AVEZ PAS REÇU D'E-MAIL, VEUILLEZ VÉRIFIER VOS SPAMS OU ESSAYER DE RECEVOIR LE CODE</span>
</p>
        <label htmlFor="email">code :</label>
        <div className="w-full p-2 flex gap-2 justify-center items-center">
              {code.map((digit, index) => (
                  <input
                      key={index}
                      id={`digit-${index}`}
                      type="text" 
                      maxLength={1}
                      value={digit}
                      required
                      placeholder="#"
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="oppp w-10 h-12 text-center text-xl border border-gray-400 rounded-md focus:border-blue-500 outline-none"
                  />
              ))}
          </div>
 <button className="bg-blue-950 p-2 text-white rounded-sm cursor-pointer uppercase" type="submit">{load ? "vérification en cours ..." : 'envoyé'}</button>
    </form>
</div>
<Footer/>
        </> : <p>this token is expired</p>
    }
    
    </>
  )
}

export default Er