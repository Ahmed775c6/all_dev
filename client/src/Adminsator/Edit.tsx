import { useState ,useEffect} from "react";
import Aside from "../components/AdmiComponents/Aside";
import Nav from "../components/AdmiComponents/Nav";
import axios from "axios";
import { useAdminAuth } from "../context/AdminAuthProvider";
import Themes from "../components/AdmiComponents/Themes";
import { handelUpload } from "../Logic/UploadFile";
import TaskLoader from "../components/AdmiComponents/TaskLoader";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const Edit = () => {
  const auth = useAdminAuth();
const [bezy,setBezy] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const[send,setSend] = useState<any>(null);
 
console.log(auth)
const [AsideT, setAside] = useState(false)
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  }, [theme]);


const [Loading,setLoading] = useState(true);
const [Changing,setChanging] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setFile] = useState<string>("/src/assets/empty.jpg"); // Default image
const [name,setName] = useState('');
const [fixed,setFixed] = useState('');
const [id,setID] = useState('');
  // Password change handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");
  
    if (!oldPassword || !newPassword || !pinCode) {
      setErrorMessage("Please fill out all fields.");
      return;
    }
  
    try {
      // Assuming your token is stored in localStorage or a state
      const token = localStorage.getItem("adminToken"); // Or get it from a global state/context
  
      if (!token) {
        setErrorMessage("Authorization token missing.");
        return;
      }
  
      // Send password change request to the backend with the token
      const response = await axios.post(
        `${baseUrl}/ADchangePassword`, 
        { oldPassword, newPassword, pinCode },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        }
      );
  
      if (response.data.success) {
        setSuccessMessage("Password updated successfully!");
      } else {
        setErrorMessage(response.data.message || "An error occurred.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update password.");
    }
  };
  

  const handlePersonnel = async (e: React.FormEvent) => {
    e.preventDefault();
    setBezy(true)
  
    try {
   
  
      let link = await handelUpload(send);  // Renamed from 'handelUpload'
  

  
      console.log("Got link:", link?.link);
  const   formData = {
        id:id,
        prf :""  ,
        name : name,
      };
   if(link?.link){
 formData.prf = link.link;

   }else {
formData.prf = fixed;
   }

      const response = await axios.post(
      `${baseUrl}/update_personnel`,
        formData,
      );
  console.log(response.data)
      if (response.data) {
        setSuccessMessage("Profile updated successfully!");
      } else {
        setErrorMessage(response.data.message || "An error occurred while updating profile.");
      }
      setBezy(false)
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please check your connection and try again.");
      setBezy(false)
    }
  };
  

  // Handle file input change and update file state
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSend(selectedFile)
      const fileURL = URL.createObjectURL(selectedFile);
      setFile(fileURL);
    }
  };
useEffect(()=>{
 setName(auth.userData?.name)
 setFile(auth.userData?.prf)
 setID(auth?.userData?._id || '');
 setFixed(auth.userData?.prf)
setLoading(false);
},[auth])


  return (
<>
{
  Loading ? <p>loading ...</p> : <>
{
  Changing ? <Themes setCh= {setChanging} /> : ''
}
{
  bezy ?<TaskLoader/> : ''
}
<div className="w-full flex bg-[#edf4f6] dark:bg-[#2d3748] ">
     <Aside AsideT = {AsideT} setAsideT= {setAside}  />
      <div className="w-full min-h-screen">
      <Nav AsideT = {AsideT} setAside = {setAside} />
        <section className="main p-6 w-full min-h-screen flex flex-col gap-11 ">
            <h1 className="text-3xl font-semibold dark:text-white"> Dashboard / Profile Settings</h1>
          <div className="w-full flex gap-3 alors">
            <div className="w-full flex gap-3 p-4 flex-col bg-white shadow-md rounded-md dark:bg-gray-900">
              <header className="w-full flex flex-row p-2 gap-3">
                <i className="ri-profile-line text-[1rem]" ></i>
                <h4 className="text-[1rem]">Personnel Information :</h4>
              </header>
              <p className="flex w-full gap-2 text-[0.9rem]"> <i className="ri-image-edit-line"></i> Profile Photo :</p>

              <form onSubmit={handlePersonnel} className="w-full flex flex-col gap-3">
                <div className="w-full flex gap-0 alors2">
                  <div className="w-full flex flex-col justify-center items-center">
                    <img src={file} alt="Profile" className="w-40 h-40 rounded-md object-cover" />
                    <input
                      type="file"
                      accept="image/*"
                      id="file"
                      hidden
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      className="p-2 w-full outline-none border-none text-blue-400 cursor-pointer"
                      onClick={() => document.getElementById('file')?.click()}
                    >
                      Import an image
                    </button>
                  </div>
                  <div className="w-full gap-3 flex flex-col">
                    <label htmlFor="name" className="w-full flex gap-2 text-[0.9rem]"> <i className="ri-user-smile-line"></i> User Name :</label>
                    <input
                      type="text"
                      className="p-2 w-full bg-gray-200 outline-none border-none dark:bg-gray-700"
                      placeholder="User Name :"
                 value={name}
                 onChange={(e : any)=>{
                  setName(e.target.value);
                 }}
                    />
                  </div>
                </div>
                <button type="submit" className="bg-blue-500 p-2 text-white rounded-md cursor-pointer w-full">
                  Save
                </button>
              </form>
            </div>
            <div className="w-full flex flex-col gap-3 p-4 bg-white shadow-md rounded-md dark:bg-gray-900">
              <header className="w-full flex flex-row p-2">
                <h4 className="text-[1rem]">Password :</h4>
              </header>
              <form onSubmit={handleChangePassword} className="w-full p-2 flex flex-col gap-4">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="old" className="w-full flex gap-2">
                    <i className="ri-lock-unlock-line"></i> Old password :
                  </label>
                  <input
                    type="password"
                    name="old"
                    placeholder="Old Password :"
                    className="p-2 w-full bg-gray-200 outline-none border-none dark:bg-gray-700"
                    value={oldPassword}
                    required
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <label htmlFor="new" className="w-full flex gap-2">
                    <i className="ri-lock-2-line"></i> New password :
                  </label>
                  <input
                    type="password"
                    name="new"
                    placeholder="New Password :"
                    className="p-2 w-full bg-gray-200 outline-none border-none dark:bg-gray-700"
                    value={newPassword}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label htmlFor="pin" className="w-full flex gap-2">
                    <i className="ri-user-settings-fill"></i> Code Pin :
                  </label>
                  <input
                    type="password"
                    placeholder="Code Pin:"
                    name="pin"
                    className="p-2 w-full bg-gray-200 outline-none border-none dark:bg-gray-700"
                    value={pinCode}
                    required
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-green-500 text-sm">{successMessage}</p>
                )}
                <button type="submit" className="bg-blue-500 p-2 text-white rounded-md cursor-pointer">
                  Save
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <button className="fixed justify-center right-10 bottom-10 rounded-full w-11 h-11 text-center items-center outline-none border-none cursor-pointer flex p-2 bg-blue-400 text-white"
onClick={()=>{
  setChanging(true);
}}
>
  <i className="ri-settings-line"></i>
</button>
    </div>
 </> 
}

</>
    
  );
};

export default Edit;
