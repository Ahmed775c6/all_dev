import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import useSocket from "../Logic/socket.io";
import {motion} from 'framer-motion'

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const ByingPopup = ({ setBying , amount ,ob}: any) => {
  const { saveorder } = useSocket();
  const user = useContext(AuthContext)?.user;
  const [isOui, setIsOui] = useState(false);

  const [Methodof,setMethodP] = useState('Paiement en espèces');

  const [formData, setFormData] = useState({
    name_req: user?.name || "",
    address: user?.adress || "",
    tel: user?.tel || "",
    postal: user?.postal || "",
    req_email: user?.email || "",
    etat: user?.estate || "",
    ville: user?.ville || "",
    gen: user?.gender || "Male",
    utiliste :  user?.pts.pts - user?.pts.used ,
    iu : false,
    merci : Number(ob.mrc),
    items: localStorage.getItem('cart') ? localStorage.getItem('cart') : [], // Parse cart data to array
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 

 if(Methodof === 'Paiement en espèces'){
  try {
    if(!isOui){
      formData.utiliste = 0;
    }else{
      formData.iu = true;
    }
    const response = await axios.post(`${baseUrl}/request_command/${user?._id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensures cookies (e.g., session tokens) are sent if needed
    });

    if (response.status) {
      await saveorder({ n: response.data.notifu ,t: response.data.tbl} );
      
      alert("Commande envoyée avec succès !");
      setBying(false);
    } else {
      alert("Erreur lors de l'envoi de la commande.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Une erreur est survenue.");
  }
 }else{
alert('this methode is not supported yet')
 }
  };

  return (
    <div className="command-popup-container w-full pay ">
      <div className="contact-form-wrap active w-full" id="form_form">
        <div className="contact-form-container w-full">
          <div className="contact-form-main w-full fl-wrap" id="info">
            <div className="contact-form-header">
              <span><i className="fas fa-check"></i></span>
              <h4><i className="ri-shopping-cart-2-line"></i> Commander Request</h4>
            </div>
            <span className="noteX">Tous les champs sont obligatoires</span>

            <form onSubmit={handleSubmit} className="custom-form checkout_form_active_user ">
              {/* Form fields */}
              <div className="gl">
                <label htmlFor="name_req">Votre Nom Complet :</label>
                <input type="text" name="name_req" placeholder="Votre Nom" required value={formData.name_req} onChange={handleChange} />
              </div>
              <div className="gl">
                <label htmlFor="address">Votre Adresse :</label>
                <input type="text" name="address" placeholder="Votre Adresse" required value={formData.address} onChange={handleChange} />
              </div>
              <div className="gl">
                <label htmlFor="tel">Votre Tel Mobile :</label>
                <input type="tel" name="tel" placeholder="0000000" required value={formData.tel} onChange={handleChange} />
              </div>
              <div className="gl">
                <label htmlFor="postal">Code Postal :</label>
                <input type="number" name="postal" placeholder="0000" required value={formData.postal} onChange={handleChange} />
              </div>
              <div className="gl">
                <label htmlFor="req_email">Email :</label>
                <input type="email" name="req_email" placeholder="exemple@gmail.com" required value={formData.req_email} onChange={handleChange} />
              </div>
              <div className="gl">
  <label htmlFor="etat">État :</label>
  <select 
    name="etat" 
    required 
    value={formData.etat} 
    className="w-full p-2 bg-gray-100 h-11 border-none outline-none"
    onChange={handleChange}
  >
    <option value="" disabled>Choisie un Etat</option>
    <option value="Tunis">Tunis</option>
    <option value="Ariana">Ariana</option>
    <option value="Ben Arous">Ben Arous</option>
    <option value="Manouba">Manouba</option>
    <option value="Nabeul">Nabeul</option>
    <option value="Zaghouan">Zaghouan</option>
    <option value="Bizerte">Bizerte</option>
    <option value="Beja">Beja</option>
    <option value="Jendouba">Jendouba</option>
    <option value="Kef">Kef</option>
    <option value="Kairouan">Kairouan</option>
    <option value="Kasserine">Kasserine</option>
    <option value="Sidi Bouzid">Sidi Bouzid</option>
    <option value="Sfax">Sfax</option>
    <option value="Gabes">Gabes</option>
    <option value="Medenine">Medenine</option>
    <option value="Tataouine">Tataouine</option>
    <option value="Gafsa">Gafsa</option>
    <option value="Tozeur">Tozeur</option>
    <option value="Kebili">Kebili</option>
    <option value="Siliana">Siliana</option>
    <option value="Mahdia">Mahdia</option>
    <option value="Monastir">Monastir</option>
    <option value="Sousse">Sousse</option>
    <option value="Mahares">Mahares</option>
    <option value="Nabeul">Nabeul</option>
    <option value="Sfax">Sfax</option>

  </select>
</div>

              <div className="gl">
                <label htmlFor="ville">Ville :</label>
                <input type="text" name="ville" placeholder="Ville" required value={formData.ville} onChange={handleChange} />
              </div>
              <div className="gl">
                <label htmlFor="gen">Genre :</label>
                <select name="gen" id="gen" value={formData.gen} onChange={handleChange} required className="w-full bg-gray-100 p-2 h-11 border-none outline-none">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
          {   
          user?.pts.pts > 0 ?
          <div className="gl w-full flex flex-col">
    <div className="w-full flex gap-3 items-center">
      <label htmlFor="ptss" className="text-gray-700 flex w-full">
        Utiliser les points de fidélité ? : <p>{(user?.pts.pts - user?.pts.used)}</p> , argant : { (user?.pts.pts - user?.pts.used) * Number(ob.mrc)} TND
      </label>
      
      <label className="flex items-center cursor-pointer">
        <span className="mr-2 text-gray-700">{isOui ? "Oui" : "Non"}</span>
        
        <div
          className={`relative w-12 h-5 rounded-full cursor-pointer transition-colors duration-300 ${
            isOui ? "bg-black" : "bg-gray-400"
          }`}
          onClick={() => {
            setIsOui(!isOui)
       
          }}
        >
          <motion.div
            className="absolute w-5 h-5 bg-white rounded-full shadow-md"
            layout
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            animate={{ x: isOui ? 28 : 0 }} // Moves the switcher
          />
        </div>
      </label>
    </div>
    {isOui ? <>
      <p >SOUS-TOTAL : {amount + Number(ob.lv)} TND </p>
      <p>- { (user?.pts.pts - user?.pts.used) * Number(ob.mrc)} TND</p> 
      <p>  TOTAL   : {( amount - (ob.mrc * (user?.pts.pts - user?.pts.used) ) ) + Number(ob.lv)} TND </p>

    
    </> : <p>TOTAL : {amount + Number(ob.lv)} TND </p> }


              </div> : null}
    
              <div className="gl">
                <label htmlFor="pay">Payement  :</label>
                <select name="pay"  id="pay" value={Methodof} onChange={(e:any)=>{setMethodP(e.target.value)}} required className="w-full p-2 h-11 bg-gray-100 border-none outline-none">
                  <option value="Paiement en espèces">Paiement en espèces</option>
                  <option value="Carte">Carte Bancaire</option>
                </select>
              </div>

<div className="w-full flex gap-2 p-2">
  
<button type="button" className="toggle w-full bg-gray-300" onClick={() => setBying(false)}>Annuler</button>
              <button type="submit" id="rqst_btn" className="w-full ">Continuer</button>
</div>
            </form>
          </div>
        </div>
        <div className="contact-form-overlay"></div>
      </div>
    </div>
  );
};

export default ByingPopup;
