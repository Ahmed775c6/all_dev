import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
interface LoginProps {
    closeSignIn: () => void;
}

const Login: React.FC<LoginProps> = ({ closeSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [accessToken, setAccessToken] = useState<string | null>(null);
const [Dis,setDis] =useState(false)
  
    const getNewAccessToken = async () => {
        try {
            const response = await axios.post(
                `${baseUrl}/refresh`,
                {},
                { withCredentials: true }
            );

            if (response.status === 200) {
                setAccessToken(response.data.accessToken);
            } else {
                throw new Error("Failed to refresh token");
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            setError("Session expired. Please log in again.");
            setAccessToken(null);
        }
    };

   
    useEffect(() => {
        if (!accessToken) return;

        const timer = setInterval(() => {
            getNewAccessToken();
        }, 9 * 60 * 1000); 

        return () => clearInterval(timer);
    }, [accessToken]);

   
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
setDis(true)
        try {
            const response = await axios.post(
            `${baseUrl}/login`,
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 200 && response.data.accessToken) {
                setAccessToken(response.data.accessToken);
                closeSignIn(); // Close the login modal
            window.location.href = '/profile';
            }else if(response.data.token){
                window.location.href = `/verify?token=${response.data.token}`;

            }
             else {
                setDis(false)
                setError("Invalid credentials");
            }
       
        } catch (error) {
            setDis(false)
            console.error("Login failed:", error);
            setError("Invalid credentials");
        }
    };

    return (
        <div className="auth-popup show" id="login_form">
            <div className="login">
                <div className="auth_style">
                    <div className="contact-form-header2">
                        <span className="fas fa-times" onClick={closeSignIn}></span>
                        <h4 className="font-semibold">Déjà Client</h4>
                    </div>

                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">E-mail :</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Votre Email ..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="password">Mot de passe :</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Mot de passe ..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && <p className="error-message text-red-500">{error}</p>}

                        <a href="/forget_password" className="forget-pass-link">
                            Mot de passe oublié ?
                        </a>

                        <button type="submit" className={Dis ? 'cursor-not-allowed' : 'cursor-pointer'} disabled = {Dis}>{Dis ? 'connexion .. ' : "Se Connecter"}</button>
                    </form> 
                </div>

                <div className="other-auth-options">
                    <p><strong>Ou se connecter avec :</strong></p>
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

export default Login;
