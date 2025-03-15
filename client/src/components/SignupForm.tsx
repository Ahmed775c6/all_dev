import { useState } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const SignupForm = ({ closeSignUp }: any) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    tel: "",
    pass: "",
    confirm_password: "",
    acceptedTerms: false,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.pass !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
const Result = response.data.message;
      if(Result){
window.location.href = `/verify?token=${response.data.token}`;
      }else {
        alert('email allready exist');
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert(error);
    }
  };

  return (
    <div className="auth-popup" id="sign_up_form">
      <div className="signup">
        <div className="auth_style">
          <div className="contact-form-header2">
            <span className="fas fa-times" onClick={closeSignUp}></span>
            <h4>ٍRegister</h4>
          </div>

          <form onSubmit={handleSignup} method="POST" id="split_reg">
            <div className="split-register">
              <div className="contact-form-header2">
                <h4>Votre Information</h4>
              </div>

              <label htmlFor="full_name">Nom complet :</label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">E-mail :</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Votre Email ... "
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="tel">Téléphone :</label>
              <input
                type="tel"
                name="tel"
                id="tel"
                placeholder="Téléphone ... "
                value={formData.tel}
                onChange={handleChange}
                required
              />
            </div>

            <div className="split-register">
              <div className="contact-form-header2">
                <h4>Votre mot de passe</h4>
              </div>

              <label htmlFor="pass">Mot de passe :</label>
              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Mot de passe ... "
                value={formData.pass}
                onChange={handleChange}
                required
              />

              <label htmlFor="confirm-password">Confirmer le mot de passe :</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm_password"
                placeholder="Confirmer le mot de passe ... "
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />

              <p className="legal-link">
                J’ai lu et accepté les
                <a href="/legal">Mentions légales</a>
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleChange}
                />
              </p>

              <button type="submit" className="w-full">
                Continue
              </button>
            </div>
          </form>
        </div>

        <div className="other-auth-options">
          <p>
            <strong>Ou se registre avec :</strong>
          </p>
          <div className="buttons-auth">
            <a href="/fb_auth" className="fb_link">
              <i className="ri-facebook-fill"></i>
              <span>Facebook</span>
            </a>
            <a href="/google_auth" className="ggl_link">
              <i className="ri-google-fill"></i>
              <span>Google</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
