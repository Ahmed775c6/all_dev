import { useState } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import useSocket from "../Logic/socket.io";
const Contact = ({SetClose} : any) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
const {SendRepport} = useSocket();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/contact`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response) {
        SendRepport(formData);
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen h-full fixed z-50 w-full flex items-center justify-center ">
           <i className="ri-close-line text-xl absolute right-5 top-5 z-50 text-white cursor-pointer" onClick={()=>{
SetClose(false)
}}></i>
 
      <div className="w-[340px] h-[440px] bg-[#fff] rounded-lg shadow-lg p-6 max-w-[calc(100vw-40px)] relative font-montserrat">
  
        <h2 className="text-[#78788c] border-b-4 border-[#144273] w-[180px] pb-2 mb-4">
          Contacter nous
        </h2>
        {
        success ?  <p className="text-green-600">  Your   Message sent successfully , you will recive the replay in your email ... </p> : null
      }
        <form onSubmit={handleMessage} className="space-y-4">
          <div className="relative">
            <span className="block text-sm text-[#5a5a5a] mb-1">prénom</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom & Prénom"
              className="w-full p-2 border-b-2 border-[#144273] outline-none transition-all focus:border-[#144273] bg-transparent"
              required
            />
          </div>

          <div className="relative">
            <span className="block text-sm text-[#5a5a5a] mb-1">E-mail</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Exemple@gmail.com"
              className="w-full p-2 border-b-2 border-[#144273] outline-none transition-all focus:border-[#144273] bg-transparent"
              required
            />
          </div>

          <div className="relative">
            <span className="block text-sm text-[#5a5a5a] mb-1">Message</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="ecrire un Message pour nous "
              className="w-full p-2 border-b-2 border-[#144273] h-30 outline-none transition-all focus:border-[#144273] bg-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="float-right px-3 py-2 mt-2 border-2 border-[#144273] text-[#144273] transition-all hover:bg-[#144273] hover:text-white"
          >
            envoyer
          </button>
        </form>

        <div className="absolute bottom-[-25px] right-[-20px] flex-col bg-[#144273] text-white flex gap-2 w-[320px] p-4 rounded-lg text-sm shadow-lg">
          <span className="ml-4 flex gap-2 ">
            <i className="ri-phone-line"></i> +216 99 103 052
          </span>
          <span className="ml-4 flex gap-2">
            <i className="ri-mail-send-line"></i> alltunisiapara@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
