import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Loader  from '../Loader';
import Aside from './Aside';
import Nav from './Nav';
import Themes from './Themes';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Botifica = () => {
  
    const [notifications, setNotifications] = useState<{ _id: string, message: string, type: string, date: string }[]>([]);
    const socket = io(`${baseUrl}`);

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    useEffect(() => {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);
      localStorage.setItem("theme", theme);
      setTheme(theme)
      setLoading(false)
    }, [theme]);
  
  const [AsideT, setAside] = useState(false)
  
  
  
  const [Loading,setLoading] = useState(true);
  const [Changing,setChanging] = useState(false);
    // Request notification permission when the component mounts
    useEffect(() => {
        const requestNotificationPermission = async () => {
            if (Notification.permission !== 'granted') {
                await Notification.requestPermission();
            }
        };

        requestNotificationPermission();

        // Fetch notifications from the server on component mount
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Getnotifications`);
                const L = response.data
                setNotifications(L.reverse());
                setLoading(false)
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Call the function to fetch initial notifications
        fetchNotifications();

        // Socket.io event listener for new notifications
        socket.on('connect', () => {
           
            console.log('Socket ID:', socket.id);
        });

        socket.on('ORDER', (data) => {
  
            setNotifications(prevNotifications => [
                { ...data },
                ...prevNotifications,
            ]);

            // Show browser notification for the new order
            if (Notification.permission === 'granted') {
                new Notification('New Order', {
                    body: data.message,
                });
            }
        });
        socket.on('recive-report',(data)=>{
            setNotifications(prevNotifications => [
                { ...data },
                ...prevNotifications,
            ]);

            // Show browser notification for the new order
            if (Notification.permission === 'granted') {
                new Notification('New Message', {
                    body: data.message,
                });
            }
        })
        socket.on('recive-review',(data)=>{
            setNotifications(prevNotifications => [
                { ...data },
                ...prevNotifications,
            ]);

            // Show browser notification for the new order
            if (Notification.permission === 'granted') {
                new Notification('New Product Review ', {
                    body: data.message,
                });
            }
        })
        socket.on('new-user', (data)=>{
            setNotifications(prevNotifications => [
                { ...data },
                ...prevNotifications,
            ]);

            // Show browser notification for the new order
            if (Notification.permission === 'granted') {
                new Notification('New Client', {
                    body: data.message,
                });
            }
        })
        // Cleanup to avoid memory leaks
        return () => {
            socket.off('ORDER');
            socket.off('recive-report');
            socket.off('recive-review')
            socket.off('new-user');
        };
    }, []);

    return (

        <>
        {
          Loading ? <Loader/> : ''
        }
        {
          Changing ? <Themes setCh = {setChanging} /> : ''
        }
        <div className="w-full flex dark:bg-[#2d3748] ">
        <Aside AsideT = {AsideT} setAsideT= {setAside}  />
        <div className="w-full min-h-[100vh] h-full bg-[#edf4f6] dark:bg-[#2d3748] flex flex-col">
                <Nav AsideT = {AsideT} setAside = {setAside} />
                <div className="w-full Relative flex flex-col  gap-3 h-full overflow-auto  bg-white p-4 right-0 shadow-md top-[50px] dark:bg-gray-800 dark:text-white" style={{
        
    }}>
        <header className="w-full flex flex-row p-2 gap-2 border-b border-gray-300  dark:border-gray-600">
            <i className="ri-notification-line"></i>
            <h1 className="font-semibold dark:text-white ">Notifications :</h1>
        </header>
        {
            Loading ? <p>Loading ....</p> : <>
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <div key={notification._id} className="notification gap-2 flex p-2 dark:bg-gray-700 dark:border-gray-600 border-b border-gray-300">
                        <i className={`flex justify-center items-center rounded-sm text-center p-2 h-full ${notification.type === "order" ? "ri-shopping-cart-line bg-orange-100 text-orange-500 dark:bg-orange-200 dark:text-orange-600" :
                            notification.type === "Repport" ?"ri-chat-1-line bg-purple-100 text-purple-500 dark:bg-purple-200 dark:text-purple-600"  :
                            notification.type === "review" ?"ri-chat-quote-line bg-purple-100 text-yellow-500 dark:bg-yellow-200 dark:text-yellow-600":
                            
                              notification.type === "new user" ?"ri-chat-quote-line bg-purple-100 text-green-500 dark:bg-green-200 dark:text-green-600"
                            :
                            
                            '' }`}
                            

                            
                            ></i>
                            
                        <div className="w-full flex flex-col gap-3 p-1">
                            <p><strong></strong> {notification.message}</p>
                            <p className="text-[11px] ml-auto"><strong>Date:</strong> {notification.date}</p>
                        </div>
                    </div>
                    ))
                ) : (
                    <p>No notifications yet.</p>
                )}
            </>
        }
        
    </div>
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
    );
};

export default Botifica;
