

const Footer = () => {
  return (
    <div className="footer w-full max-w-full">
      <div className="up">
        <div className="left-up">
          <h5>Abonnez-Vous À Notre Newsletter</h5>
          <p className="max-w-full ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut ab laboriosam aspernatur eius, aperiam illum porro voluptate distinctio esse sed neque officiis sint, asperiores facere eaque quisquam tenetur nam aliquid.
          </p>
          <div className="footer-mail">
            <input type="email" placeholder="Votre Adresse email ..." />
            <button>S'abonner</button>
          </div>
        </div>
        <div className="right-up">
          <span className="fas fa-headphones-alt footer-call"></span>
          <div className="right-right-up">
            <h5>CONTACTER LE SERVICE CLIENT</h5>
            <h3 className="text-[#144273]" style={{color : "144273 !important"}}>+216 25 743 292</h3>
            <div className="footer-pies">
              <p>Prix d'un appel local.</p>
              <p>
                Disponible du lundi au vendredi de 9h à 19h et le samedi matin de 9h à 12h.
                Vous pouvez aussi consulter notre FAQ.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="down">
        <div className="logos footer-helpful-links">
          <h3 className="footer-logo">Parashop</h3>
          <p>
          AllParaPharmacie.tn est N°1 parapharmacie en ligne en Tunisie. Vous trouverez chez Pharma-shop.tn tous vos produits parapharmaceutique (santé, beauté, minceur...)
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
              <a href="tel:+21625743292" className="text-[#144273]">+216 25 743 292</a>
            </li>
            <li className="contact-link text-[#144273]">
              <span>Email :</span>
              <a href="mailto:ahmed.chouikh2020@gmail.com" className="text-[#144273]">parashop@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <footer>
        <div className="copy-right">
          <span>All rights Reserved © AllParaPharmacie </span>
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
