import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Aside from "../components/AdmiComponents/Aside";
import Nav from "../components/AdmiComponents/Nav";
import { fetchClients } from "./Utils/getData";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import CustomerPopupEdit from "../components/CustomerPopupEdit";
import { SuccessLabel } from "../components/labels";
import Themes from "../components/AdmiComponents/Themes";



const Clients = () => {

  const [Loading, setLoading] = useState(true);
  const [Customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const [settigns, setSettings] = useState(false);
  const [Target, setTarget] = useState("");
  const [Banned, setBanned] = useState(false);
  const [Label, setLabel] = useState(false);
  const handleViewDetails = (id: string) => {
    navigate(`/customer/${id}`);
  };  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");


const [AsideT, setAside] = useState(false)
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  }, [theme]);



const [Changing,setChanging] = useState(false);

  useEffect(() => {
    const getClients = async () => {
      const data = await fetchClients();
      setCustomers(data);
    };

    if (Label) {
      getClients();
    }
  }, [Label]);

 

  useEffect(() => {
    const getClients = async () => {
      const data = await fetchClients();
      setCustomers(data);
    };
    getClients();
    setLoading(false)
  }, []);

  const filteredCustomers = Customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>{
      Changing ? <Themes setCh = {setChanging} /> : ''
    }
      {Loading ? (
        <Loader />
      ) : (
        <>
          {settigns && (
            <CustomerPopupEdit
              id={Target}
              setClose={setSettings}
              Banned={Banned}
              setLabel={setLabel}
            />
          )}
          {Label && <SuccessLabel message="Update Done Successfully!" setClose={setLabel} />}

         

          <div className="w-full flex dark:bg-[#2d3748]">
          <Aside AsideT = {AsideT} setAsideT= {setAside}  />
            <div className="w-full min-h-[100vh] bg-[#edf4f6] flex flex-col dark:bg-[#2d3748]">
            <Nav AsideT = {AsideT} setAside = {setAside} />
              <section className="p-6 flex flex-col w-full gap-3 lx2 dark:bg-[#2d3748]">
                <div className="w-full flex flex-col gap-3 p-4">
                  <div className="w-full flex items-center gap-2 shadow-sm rounded-md bg-white p-2 dark:bg-gray-900">
                    <input
                      type="text"
                      className="w-full bg-transparent outline-none p-3 transition-all"
                      placeholder="Search by name..."
                      value={searchTerm}
                      list="custem"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <datalist id="custem">
                      {Customers.map((customer) => (
                        <option key={customer._id} value={customer.name} />
                      ))}
                    </datalist>
                    <button className="px-4 py-2 bg-black text-white font-semibold rounded-md uppercase hover:bg-gray-800 transition-all">
                      Search
                    </button>
                  </div>

                  <motion.div
                    className="w-full grid grid-cols-3 gap-3 p-4 df"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((member, index) => (
                        <motion.div
                          key={member._id}
                          className="w-full bg-white rounded-md shadow-xl relative p-2 dark:bg-gray-900"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1, type: "spring" }}
                        >
                          <header className="w-full flex flex-row justify-between p-2 border-b border-gray-200">
                            <p className="text-black dark:text-gray-300">ID: {member._id}</p>
                            <ul className="flex gap-2">
                              <i
                                className="ri-chat-3-line cursor-pointer"
                                onClick={() => navigate(`/messages?TargetID=${member._id}`)}
                              ></i>
                              <i
                                className="ri-settings-4-line cursor-pointer"
                                onClick={() => {
                                  setSettings(true);
                                  setTarget(member._id);
                                  setBanned(member.isBanned);
                                }}
                              ></i>
                            </ul>
                          </header>

                          <div className="w-full flex flex-col items-center text-center p-2 gap-3">
                            <img
                              src={member.pdf}
                              alt={member.name}
                              className="w-24 h-24 rounded-full object-cover bg-gray-500"
                            />
                            <p className="text-lg font-bold">{member.name}</p>
                            <div className="w-full flex items-center justify-center text-center gap-2">
                              <i className="ri-phone-line"></i>
                              <p>+216 {member.tel}</p>
                            </div>
                          </div>
                          {member.isBanned && (
                            <p className="bg-red-100 p-1 text-red-400 absolute top-5 left-5 rotate-45">
                              Banned
                            </p>
                          )}
                    <button
  className="text-blue-500 outline-none border-none cursor-pointer hover:text-blue-700 transition-all w-full text-center p-2"
  onClick={() => handleViewDetails(member._id)}
>
  More Details
</button>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 col-span-3">No customers found.</p>
                    )}
                  </motion.div>
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Clients;
