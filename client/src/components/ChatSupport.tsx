import { motion } from "framer-motion";
import { useState, useEffect , useRef } from "react";
import axios from "axios"; // Import Axios
import useSocket from "../Logic/socket.io";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { useSelector ,useDispatch} from "react-redux";
import { increment101, dicriment } from "../redux/msgCounter";

const suggestions = [
  "Is this right for my skin?",
  "Can I take this with my meds?",
  "What are the benefits?",
  "How do I use this?",
  "Any side effects?",
  "Is it safe during pregnancy?",
  "What's the dosage?",
  "Do you have other sizes?",
];

const ChatSupport = ({ id, senderME }: any) => {
  const dipatch = useDispatch();
  const { saveMsg } = useSocket();
  const {value} =useSelector((state : any) => state.msgcounter); 
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any>([
  
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Create a ref for the message container


  useEffect(() => {
    if (id) {
      axios
        .get(`${baseUrl}/messages/${id}`)
        .then((response) => {
          setMessages(response.data);
     
          
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [id]); 


  useEffect(() => {
    const handleAdminMessage = (data: { sender: string; msg: string ,receiver : string}) => {

      if(data.receiver === id ){
        setMessages((prev :any) => [...prev, data]);
    
        dipatch(increment101())
     
      }

   
    };

    const { socket } = useSocket(); // Access socket from useSocket
    socket.on("receive-from-admin-msg", (data)=>{
      handleAdminMessage(data)

    });

    return () => {
      socket.off("receive-from-admin-msg", handleAdminMessage);
    };
  }, [id]);

  const sendMessage = (Data: { id: string; message: { sender: string; msg: string }[] }) => {
    if (!Data.message[0].msg.trim()) return;
    setMessages((prev: any) => [...prev, ...Data.message]);
  };

  const handleSend = () => {
  if(inputMessage != ''){
    const Data = {
      id,
      message: [
        {
          sender: "user",
          msg: inputMessage,
        },
      ],
    };
    sendMessage(Data);
    saveMsg({ msg: inputMessage, id, senderME });

    setInputMessage("");
  }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); 

  return (
    <>
   {
    !isOpen ? <>

<button
        className="fixed top-[90vh] left-[90vw] bg-blue-500 z-40 outline-none border-none text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        onClick={() => {setIsOpen(!isOpen); messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); dipatch(dicriment())}}
      >
        💬
    <span className="absolute -top-1 z-10 -left-1 bg-rose-500 w-5  flex justify-center items-center text-center h-5 rounded-full">{value}</span>
      </button>
    </>: null
   }

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed w-[350px] h-[500px] bg-white bottom-20 right-10 rounded-md z-10 flex flex-col shadow-lg component"
        >
          <header className="w-full flex items-center bg-blue-500 text-white p-2 flex-row rounded-t-md">
            <div className="w-full flex gap-2 text-center">
              <img src="/src/assets/support.png" alt="support" className="w-10 rounded-full object-cover h-10" />
              Chat With Our Doc
            </div>
            <button onClick={() => setIsOpen(false)} className="ml-auto text-white text-xl">
              <i className="ri-close-line"></i>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-100">
            {messages.map((msg: any, index :any) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  borderRadius: "1.125rem 1.125rem 0 1.125rem",
                }}
                className={`relative flex flex-col max-w-[75%] p-3 text-sm shadow-md ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-white text-gray-900"
                }`}
              >
                <span className="text-xs font-semibold">{msg.sender === "user" ? "You" : "Support"}</span>
                {msg.msg}
              </motion.div>
            ))}
 <div ref={messagesEndRef}></div>
            <div className="mt-3 p-2">
              <span className="text-gray-400 text-[0.7rem] block mb-1">Suggested Questions:</span>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      sendMessage({
                        id,
                        message: [{ sender: "user", msg: question }],
                      })
                    }
                    className="bg-blue-100 outline-none border-none text-blue-700 text-xs px-3 py-1 rounded-full hover:bg-blue-200 transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center border-t border-gray-300 p-2">
            <input
              type="text"
              className="flex-1 p-2 text-sm outline-none"
              placeholder="Type your message..."
              value={inputMessage}
              required
              onClick={()=>{dipatch(dicriment())}}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="text-blue-500 text-lg px-2 hover:text-blue-700 transition">
              <i className="ri-send-plane-line"></i>
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ChatSupport;
