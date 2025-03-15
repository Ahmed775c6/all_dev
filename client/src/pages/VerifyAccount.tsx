
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
// ✅ Handle input change
const handleChange = (index: number, value: string) => {
  setWorng(false)
    if (!/^\d?$/.test(value)) return; // Allow only single digits (0-9)

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input if not the last one
    if (value && index < 4) {
        document.getElementById(`digit-${index + 1}`)?.focus();
    }
};

// ✅ Handle backspace: Move to previous input if empty
const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
        document.getElementById(`digit-${index - 1}`)?.focus();
    }
};
const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const fullCode = code.join("");

  try {
 
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
  } catch (err: any) {
    seterror(err);
  }
};

  return (
<>
<div className="w-full flex flex-col gap-3 justify-center items-center h-[100vh] ">
<div className="auth-popup" >
      <div className="signup">
        <div className="auth_style">
          <div className="contact-form-header2">
        
            <h4>Verify Your Email :</h4>
          </div>
{
  !sucess ? <form onSubmit={handleVerify} className="flex flex-col justify-center gap-2 p-3">
  <h4>Enter 5 Digit code that has been sent to your email :</h4>
  {
    error1 ? <p className="bg-red-500">{error1} </p> : ''
  }
  {
    wrong ? <p className="text-yellow-500">Wrong Code</p> : ''
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Verify</button>
</form> : 

<>
<p>Your Account has been verifyed Succesfully you can login </p>
<a href="/home">Back To home </a>
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