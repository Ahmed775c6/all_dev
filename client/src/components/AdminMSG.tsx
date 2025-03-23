import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { fetchClients101, FetchMessages,fetchClients } from "../Adminsator/Utils/getData";
import { handelchangeMSg } from "../Logic/helps";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const socket = io(`${baseUrl}`);
import { showNotification } from "../Logic/BrowserN";

const parseDate = (dateString: string) => {
  try {
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number); 
    return new Date(year, month - 1, day, hours, minutes);
  } catch (error) {
    console.error('Invalid date format:', dateString);
    return new Date(0); 
  }
};

const sortMembersByDate = (members: any[]) => {
  return [...members].sort((a, b) => {
    const dateA = parseDate(a.lastMSG.date);
    const dateB = parseDate(b.lastMSG.date);
    return dateB.getTime() - dateA.getTime(); 
  });
};

const AdminMSG = ({ zoom, setZoom }: any) => {
  const [Members, setMembers] = useState<any[]>([]);
  const [Target, setTarget] = useState<any>(null);
  const  [Cls,setCls] = useState<any>([]);
  const [Het, setHet] = useState("");
  const [LoadingMSG, setLoadingMSG] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState(""); 
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [Mobile,setMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupSearch, setPopupSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  setSearchQuery('')
  }, [theme]);
  


  // Fetch messages when a member is selected
  const fetchMSG = async (uid: string) => {
    setLoadingMSG(true);
    const msgs = await FetchMessages(uid);
    if (msgs) {
      setMessages(msgs);
    }
    setLoadingMSG(false);
  };


  useEffect(() => {
    socket.on("connect", () => {});

    const fetchData = async () => {
      const clients = await fetchClients101();
      setMembers(sortMembersByDate(clients));
      const ALL = await fetchClients();
      setCls(ALL);
    };
    fetchData();

    socket.on("recive-admin-msg", async (data) => {
      showNotification("New Message", data.msg, data.senderME.name, data.senderME.photo);
      console.log(data)
      const Check = await handelchangeMSg(data.id, Het);
      if (Check) setMessages((prev) => [...prev, data]);

      setMembers(prev => {
        console.log(prev)
        const existing = prev.find(m => m.user._id === data.id);
        if (existing) {
          console.log(existing,"laalala" )
          const updated = prev.map(m => m.user._id === data.id ? {
            ...m,
            lastMSG: { msg: data.msg, date: data.date, sender: data.sender }
          } : m);
          return sortMembersByDate(updated);
        }
        return sortMembersByDate([...prev, {
          user: data.senderME,
          lastMSG: { msg: data.msg, date: data.date, sender: data.sender }
        }]);
      });
    });

    return () => {
      socket.off("recive-admin-msg");
    };
  }, [Het]);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
  
    // Generate date WITHOUT seconds
    const date = 
      new Date().toLocaleDateString('en-GB') + 
      ', ' + 
      new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
  
    const messageData = {
      sender: "admin",
      msg: newMessage,
      receiver: Het,
      date: date
    };
  
    socket.emit("send-admin-msg", messageData);
    setMessages(prev => [...prev, messageData]);
  
    setMembers(prev => {
      const existing = prev.find(m => m.user._id === Het);
      if (existing) {
        const updated = prev.map(m => 
          m.user._id === Het 
            ? { ...m, lastMSG: { msg: newMessage, date: date, sender: "admin" } }
            : m
        );
        return sortMembersByDate(updated);
      }
      
      const newUser = Cls.find((c: any) => c._id === Het);
      return newUser 
        ? sortMembersByDate([...prev, {
            user: newUser,
            lastMSG: { msg: newMessage, date: date, sender: "admin" }
          }]) 
        : prev;
    });
  
    setNewMessage("");
  };

  // Toggle dark/light mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const filteredMembers = Members.filter(member =>
    member.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClients = Cls.filter((client: any) =>
    client.name.toLowerCase().includes(popupSearch.toLowerCase())
  );
  

  return (
    <div className="w-full flex h-[85vh] min-h-full arkh">
   
      <div
        className={`flex flex-col w-[30%] shadow-md loli ${theme === 'dark' ? 'bg-gray-900' : 'bg-white' } ${Mobile ? "mbactive" : ""}`}
        style={{ borderRight: "1px solid #ccc" }}
      >
        <div className="w-full  flex justify-between flex-row p-4">
          <h1 className="dark:text-white">Members</h1>
        
        <button
          onClick={toggleTheme}
          className="bg-gray-800 text-white w-8 flex justify-center items-center text-center h-8 p-2 rounded-full"
        >
          {theme === "light" ? "🌙 " : "🌞 "}
        </button>
     
        </div>
        <div className="w-full members flex flex-col max-h-[60vh] overflow-auto ">
<div className="w-full flex">
<input type="text" className="w-full p-2 dark:bg-gray-600  " placeholder="search"  />
<i className="ri-chat-new-line p-2 bg-blue-500 text-white cursor-pointer"    onClick={() => setShowPopup(true)}></i>
</div>

          {filteredMembers.map((client, index) => (
            <div
              className="w-full flex p-2 dark:bg-gray-700  border-b-2 bg-gray-300 shadow-sm cursor-pointer"
           
              key={index}
              onClick={() => {
                setTarget(client.user);
                setHet(client.user._id);
                fetchMSG(client.user._id);
                setMobile(true);
              }}
            >
              <img
                src={client.user.pdf}
                className="w-10 h-10 rounded-full"
                alt={`index-${index}`}
              />
              <div className="w-full flex-col relative gap-2 ml-5">
                <span className="absolute top-0 right-0 dark:text-white text-xs">  {client.lastMSG.date}</span>
                <p className="dark:text-white">{client.user.name}</p>
                <span className="dark:text-white">{client.lastMSG.sender != 'admin' ? client.lastMSG.msg : 'you : ' + client.lastMSG.msg}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-4 rounded-lg w-1/2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Search by name .."
                className="w-full p-2 dark:bg-gray-700"
                value={popupSearch}
                onChange={(e) => setPopupSearch(e.target.value)}
              />
              <button className="p-2 bg-rose-500 text-white rounded" onClick={() => setShowPopup(false)}>
              ✕
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredClients.map((client: any) => (
                <div
                  key={client._id}
                  onClick={() => {
                    setTarget(client);
                    setHet(client._id);
                    fetchMSG(client._id);
                    setShowPopup(false);
                    setMobile(true);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {client.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
 
      <div className={`messages-con w-full flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        {Target === null ? (
          <div className="w-full flex justify-center items-center h-full text-center">
            <p>Select a chat to start a new conversation</p>
          </div>
        ) : (
          <>
    
            <header className="w-full p-4 shadow-md flex justify-between flex-row">
              <div className="w-full flex gap-3">
                <img
                  src={Target.pdf}
                  alt={Target.name}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <h1 className="dark:text-white"> {Target.name} </h1>
              </div>
        <div className="flex gap-3">
        <i
                className="ri-zoom-in-line p-2 cursor-pointer text-black dark:text-white"
                onClick={() => {
                  setZoom(!zoom);
                }}
              ></i>
            
        </div>
            </header>

       
            <div className="w-full h-[75vh] p-4 flex flex-col gap-3 overflow-auto relative max-h-[75vh]">
              {LoadingMSG ? (
                <p className="absolute inset-0 z-10 top-52 left-96">Loading...</p>
              ) : (
                messages.map((mes: any, index) => (
                  <p
                    key={index}
                    style={{ borderRadius: "0 1.125rem 0 1.125rem" }}
                    
                    className={`flex flex-col max-w-[75%] relative p-3 text-sm shadow-md ${
                      mes.sender === "admin"
                        ? "self-end bg-blue-600 text-white"
                        : "self-start bg-gray-800 text-white p-2"
                    }`}
                  >
                    {mes.msg}
                    
<i className="ri-delete-bin-line absolute hidden -top-4 right-0 cursor-pointer hover:text-red-500 transition"></i>
                  </p>
                  
                ))
              )}
              <div ref={messagesEndRef} /> 
            </div>

       
            <div className="w-full flex bg-white p-1 dark:bg-gray-900">
              <input
                type="text"
                placeholder="Write a message..."
                className="p-2 w-full outline-none dark:bg-gray-900"
                style={{
                  borderTop: "1px solid #ccc",
                }}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                className="p-2 bg-blue-600 text-white ml-2 rounded-sm"
                onClick={sendMessage}
              >
                SEND
              </button>
            </div>
          </>
        )}
      </div>

 
  
    </div>
  );
};

export default AdminMSG;
