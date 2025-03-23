
import { useState } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { useLocation } from "react-router-dom";
import useSocket from "../Logic/socket.io";
const VerifyAccount = () => {
const [error1,seterror] = useState('');
const [sucess,setSucess] = useState(false)
const [wrong,setWorng] = useState(false)
const [code, setCode] = useState(["", "", "", "", ""]);
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const token = queryParams.get("token");
const {Verfied} = useSocket();
const [loading, setLoading] = useState(false);

const handleChange = (index: number, value: string) => {
  setWorng(false)
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
const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const fullCode = code.join("");

  try {
 setLoading(true)
    const response = await axios.post(`${baseUrl}/VerifyAccount`, { 
      token: token,
      fullCode: fullCode 
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const Result = response.data.message;
    if (Result) {
      setSucess(true);
      await Verfied(response.data.skls);
    } else {
      setWorng(true);
    }
    setLoading(false)
  } catch (err: any) {
    seterror(err);
    setLoading(false)
  }
};

  return (
<>
<div className="w-full flex flex-col gap-3 justify-center items-center h-[100vh] ">
<div className="auth-popup" >
      <div className="signup">
        <div className="auth_style">
          <div className="contact-form-header2">
        
            <h4>Vérifiez votre e-mail :</h4>
          </div>
{
  !sucess ? <form onSubmit={handleVerify} className="flex flex-col justify-center gap-2 p-3">
  <h4>Entrez le code à 5 chiffres qui a été envoyé à votre adresse e-mail :</h4>
  {
    error1 ? <p className="bg-red-500">{error1} </p> : ''
  }
  {
    wrong ? <p className="text-yellow-500">incorrect Code</p> : ''
  }
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled = {loading}>{loading ? "vérification" : 'Vérifier'}</button>
</form> : 

<>
<p>
Your Account has been verifyed Succesfully you can login
Votre compte a été vérifié avec succès, vous pouvez vous connecter </p>
<a href="/home">Retour à l'accueil</a>
</>
}
       
        </div>

        
      </div>
    </div>
</div>

</>
  )
}

export default VerifyAccount