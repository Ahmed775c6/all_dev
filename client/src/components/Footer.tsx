import axios from "axios";
import { useState } from "react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Footer = () => {
  const [l,setL] = useState(false)
  const [m,setM] =useState('')
  const [n,setN] = useState('')
  const [s,setS] = useState('')
  return (
    <div className="footer w-full max-w-full">
      <div className="up">
        <div className="left-up">
          <h5>Abonnez-Vous À Notre Newsletter</h5>
          {s != ""  ? <span className="text-emerald-500 " >{s} ✓</span> : null}
          <p className="max-w-full  ">
          Ne manquez rien ! ✨
Abonnez-vous à notre newsletter et bénéficiez en avant-première :


          </p>
          <div className="w-full flex-col gap-2 max-w-full">
          ✓ Des mises à jour en temps réel
✓ Les dernières sorties de produits
✓ Des promotions exclusives
✓ Des contenus inédits
… et bien plus encore, directement dans votre boîte mail !
          </div>
          <div className="footer-mail">
         <form onSubmit={async(e)=> {
          e.preventDefault()
          try{
            setL(true)
           const res = await axios.post(`${baseUrl}/SubSr`, {name : n , email : m});
            setS(res.data.message);
            setL(false)
          }catch(err){
            setL(false)
          alert('something went wrong please refresh & try again')
          }

         }} className="w-full flex flex-col gap-2">
          <input type="text" placeholder="votre nom complet ..." value={n} onChange={(e:any)=>{setN(e.target.value) ; setS('')}} />
         <input type="email" placeholder="Votre Adresse email ..." value={m} onChange={(e:any)=>{setM(e.target.value); setS('')}}/>
         <button type="submit" className={l ? 'cursor-not-allowed' : 'cursor-pointer'} disabled = {l}>{l ? "S'abonner en cours .." : "S'abonner"}</button>
         </form>
          </div>
        </div>
        <div className="right-up">
          <span className="fas fa-headphones-alt footer-call"></span>
          <div className="right-right-up">
            <h5>CONTACTER LE SERVICE CLIENT</h5>
            <h3 className="text-[#144273]" style={{color : "144273 !important"}}>+216 99 103 052</h3>
            <div className="footer-pies">
              <p>Prix d'un appel local.</p>
              <p>
                Disponible du lundi au vendredi de 9h à 19h et le samedi matin de 9h à 12h.
                Vous pouvez aussi consulter notre <a href="/legal" className="text-blue-500">FAQ</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="down">
        <div className="logos footer-helpful-links">
          <h3 className="footer-logo uppercase " onClick={()=> {
            window.location.href = '/'
          }}>all tunisia para</h3>
          <p>
          ALLTUNISIAPARA est N°1 parapharmacie en ligne en Tunisie. Vous trouverez chez alltunisiapara.com  tous vos produits parapharmaceutique (santé, beauté, minceur...)
          </p>
 
        </div>
        <div className="informations footer-helpful-links">
          <h4>Informations</h4>
          <ul>
            <li><a href="/prometion">Promotions</a></li>
            <li><a href="/new_pr">Nouveaux produits</a></li>
            <li><a href="/best_sales">Meilleures ventes</a></li>
            <li><a href="/contact">Contactez-nous</a></li>
            <li><a href="/conditions">Conditions d'utilisation</a></li>
            <li><a href="/about">A propos</a></li>
          </ul>
        </div>
        <div className="mon_compt footer-helpful-links">
          <h4>Mon compte</h4>
          <ul>
            <li><a href="/client_commands">Mes commandes</a></li>
            <li><a href="/client_avoir">Mes avoirs</a></li>
            <li><a href="/client_adresses">Mes adresses</a></li>
            <li><a href="/contact">Contactez-nous</a></li>
            <li><a href="/edit-profile">Mes informations personnelles</a></li>
            <li><a href="/client_reduction">Mes bons de réduction</a></li>
          </ul>
        </div>
        <div className="service-client footer-helpful-links">
          <h4>Service client</h4>
          <ul>
            <li className="contact-link text-[#144273]">
              <span>Tél :</span>
              <a href="tel:+21625743292" className="text-[#144273]">+216 99 103 052</a>
            </li>
            <li className="contact-link text-[#144273]">
              <span>Email :</span>
              <a href="mailto:ahmed.chouikh2020@gmail.com" className="text-[#144273]">ALLTUNISIAPARA@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <footer>
        <div className="copy-right">
          <span>All rights Reserved © ALLTUNISIAPARA </span>
          <div className="questions-marks">
            <ul>
              <li><a href="/Comment_commander">Comment commander ?</a></li>
              <li><a href="/Comment_marche">Comment ça marche ?</a></li>
              <li><a href="/Comment_livraison">Méthodes de livraison ?</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <ul>
              <li className="fb xy"><a href="https://www.facebook.com/"><i className="ri-facebook-line"></i></a></li>
              <li className="inst xy"><a href="https://www.instagram.com/"><i className="ri-instagram-line"></i></a></li>
              <li className="yout xy"><a href="https://www.youtube.com/"><i className="ri-youtube-line"></i></a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
