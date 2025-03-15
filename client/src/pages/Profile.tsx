import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthContext from "../context/AuthProvider";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { useContext, useEffect, useState } from "react";
import {handelUpload} from "../Logic/UploadFile";
import { GenertalInfo, UPPassword } from "../Logic/ModifyUser";
import Wishlist from "../components/Wishlist";
import Loader from "../components/Loader";
import ChatSupport from "../components/ChatSupport";

import axios from "axios";


interface Order {
  _id: string;
  name_req: string;
  address: string;
  date: string;
  utiliste: number;
  status: string;
  ville: string;
  etat: string;
  postal: string;
  items: string;
  methode : string;
}

const OrderList = ({ done }: { done: Order[] }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="p-4 space-y-4">
      {
      
 done ? <>
 {
       done.map((item: any) => (
        <div key={item?._id} className="bg-white rounded-lg shadow-sm p-4 border">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-800">{item?.name_req}</h3>
              <p className="text-sm text-gray-600">
                {item?.address.substring(0, 30)}...
              </p>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500">{item?.date}</span>
                <span className="text-blue-600">
                  {item?.utiliste} points  Utilisée
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedOrder(item)}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
            >
           Voir plus
            </button>
          </div>
        </div>
      ))}


      {selectedOrder && (
        <div className="fixed inset-0 z-50 top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Détails de la commande</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Nom et prénom</label>
                  <p className="font-medium">{selectedOrder.name_req}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Date</label>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                  Points utilisés</label>
                  <p className="font-medium">{selectedOrder.utiliste}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Status</label>
                  <p className="font-medium">{selectedOrder.status}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Payement </label>
                  <p className="font-medium">{selectedOrder.methode}</p>
                </div>
             
              </div>

              <div>
                <label className="text-sm text-gray-600">
                Adresse complète</label>
                <p className="font-medium">
                  {selectedOrder.address}<br />
                  {selectedOrder.ville}, {selectedOrder.etat}<br />
                  Postal: {selectedOrder.postal}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Articles</h3>
                {JSON.parse(selectedOrder.items).map((product :any) => (
                  <div key={product.id} className="flex items-center border-b py-2">
                    <img
                      src={product.product_image_0}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        {product.quantity} × {product.current_price} TND
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <div className="flex justify-between font-medium">
                  <span>
                  Total des points utilisés:</span>
                  <span>{selectedOrder?.utiliste}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      
 }
 
 </> : null      
      }
    </div>
  );
};


const Profile = () => {
  const [current, setCurrent] = useState<string>("Compte");
  const auth = useContext(AuthContext);
const [wish,setFav] = useState<any>([])

const [Loading,setLoading] = useState(true)

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
const [Password,setPassword] = useState('');
const [newPass,setNewPass] = useState('');
  const [name, setName] = useState<string | undefined>("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [address, setAddress] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [points,setP] = useState<any>(0);
const [message,setMessage] = useState('')
const [done,setDone] = useState<any>([]);

useEffect(() => {
  const f1 = async (arr: any) => {
    const res = await axios.get(`${baseUrl}/getuserPurchases/${arr}`)
    if (res.data.message) {
      setDone(res.data.purchases);
    }
  }

  if (auth?.user) {
    setName(auth.user.name);
    setPhone(auth.user.tel);
    setAddress(auth.user.adress);
    setEmail(auth.user.email);
    setFav(auth.user.Fav)
    setP(auth.user.pts.pts - auth.user.pts.used)
    setLoading(false);
    f1(auth.user._id);
  }
}, [auth]);

const handlePAss = async (e: any) => {
  e.preventDefault();
  try {
    const Data = {
      email: email,
      password: Password,
      newpassword: newPass
    }
    const Do = await UPPassword(Data);
    console.log(Do)
    setMessage(Do)
  } catch (err) {
    console.log('err');
  }
}

const Modify_Avatar = async (id: any, link: any) => {
  try {
    const response = await axios.post(`${baseUrl}/ChangeAvatar`, { id: id, link: link }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const Result = response.data.message;
    return Result;
  } catch (err: any) {
    console.log(err);
  }
};

// Rest of the code remains the same as it doesn't contain hardcoded URLs
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  }
};

const handleUpload1 = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!file) return;

  console.log("Uploading file:", file);
  const link = await handelUpload(file);
  if (link?.status) {
    const u = await Modify_Avatar(auth?.user?._id, link.link);
    if (u == true) {
      window.location.reload();
    }
  } else {
    console.log('Upload failed');
  }
};

const handleAccountSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const updatedInfo = {
    name,
    email,
    phone,
    address,
  };
  console.log(updatedInfo)
  await GenertalInfo(updatedInfo);
};

  if (Loading) return <Loader />;

  return (
    <>
    {auth?.user ? (
      <>
      {<ChatSupport id = {auth.user._id} senderME = {{name : auth.user.name , photo : auth.user.pdf}}  />}
        <Navbar />
        <section className="w-full min-h-screen bg-gray-50 p-4">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 p-6">
              {/* Profile Section */}
              <div className="w-full md:w-1/4 flex flex-col items-center gap-4 border-r border-gray-200 pr-6">
                <div className="relative group">
                  <img
                    src={filePreview || (auth.user.pdf as string)}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <form onSubmit={handleUpload1} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        id="file"
                        onChange={handleFileChange}
                      />
                      <label 
                        htmlFor="file"
                        className="cursor-pointer text-white text-center text-sm px-3 py-1 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                      >
                        Changer
                      </label>
                      <button 
                        type="submit"
                        className="text-white text-sm px-3 py-1 bg-green-600 rounded-full hover:bg-green-700 transition-colors"
                      >
                    
Télécharger
                      </button>
                    </div>
                  </form>
                </div>
                <h2 className="text-xl font-bold text-gray-800">{auth.user.name}</h2>
                <div className="bg-yellow-100 px-4 py-2 rounded-full text-yellow-800 text-sm font-medium">
                
Points de fidélité :{points}
                </div>
              </div>

              {/* Navigation and Content */}
              <div className="flex-1">
                <nav className="mb-6">
                  <ul className="flex flex-wrap gap-2 border-b border-gray-200">
                    {["Compte", "Sécurité", "Achats", "List de souhait"].map((section) => (
                      <li
                        key={section}
                        className={`px-4 py-2 cursor-pointer font-medium ${
                          current === section 
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-blue-500"
                        } transition-colors`}
                        onClick={() => setCurrent(section)}
                      >
                        {section}
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Account Section */}
                {current === "Compte" && (
                  <form onSubmit={handleAccountSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {[
    { label: "Nom et prénom", value: name, setter: setName },
    { label: "Adresse email", value: email, setter: setEmail, type: "email" },
    { label: "Numéro de téléphone", value: phone, setter: setPhone, type: "tel" },
    { label: "Adresse", value: address, setter: setAddress },
  ].map(({ label, value, setter, type = "text" }) => (
    <div key={label}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        readOnly={label === "Adresse email"}  // Make only email read-only
        onChange={(e) => label !== "Adresse email" && setter(e.target.value)} // Disable changes for email
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          label === "Adresse email" ? "cursor-not-allowed bg-gray-300" : "" // Add forbidden cursor for email
        }`}
      />
    </div>
  ))}
</div>
                    <button
                      type="submit"
                      className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                  Enregistrer les modifications
                    </button>
                  </form>
                )}

                {/* Security Section */}
                {current === "Sécurité" && (
                  <form onSubmit={handlePAss} className="space-y-6 max-w-md">
                    {message}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        
Mot de passe actuel
                        </label>
                        <input
                          type="password"
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Mettre à jour
                    </button>
                  </form>
                )}

{current === "Achats" &&(<>

{
 done != null && done?.length > 0? <>

<OrderList done = {done} />
  </> : <>
  <p>pas d'achats </p>
  </>
} 

</>)


}


      {current === "List de souhait" && (
  <div className="w-full flex flex-col gap-2 items-center">
 <Wishlist products={wish ? wish : []} uid = {auth?.user?._id} />
  </div>
)}

              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    ) : (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
        <img 
          src="src/assets/403.png" 
          alt="Not authorized" 
          className="max-w-md mb-8"
        />
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
     Retour à laccuiell
        </button>
      </div>
    )}
  </>
  );
};

export default Profile;
