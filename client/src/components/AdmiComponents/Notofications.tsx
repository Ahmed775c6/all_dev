import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const socket = io(`${baseUrl}`);

const Notifications = ({n} : any) => {
    const [Loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState<{ _id: string, message: string, type: string, date: string }[]>([]);

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
                setNotifications(L.reverse().slice(0,10));
                setLoading(false)
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Call the function to fetch initial notifications
        fetchNotifications();

        // Socket.io event listener for new notifications
        socket.on('connect', () => {
            console.log('Connected to server');
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

        // Cleanup to avoid memory leaks
        return () => {
            socket.off('ORDER');
            socket.off('recive-report');
            socket.off('recive-review')
            socket.off('new-user')
        };
    }, []);

    return (
        <div className="w-[340px] absolute  flex-col z-50 gap-3 max-h-[60vh] overflow-auto bg-white p-4 right-0 shadow-md top-[50px] dark:bg-gray-800 dark:text-white" style={{
            display : n ? "flex" : "none"
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
                                    
                                      notification.type === "new user" ?"ri-user-add-line bg-purple-100 text-green-500 dark:bg-green-200 dark:text-green-600"
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
            <button className="p-2 bg-black text-white rounded mt-3 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500" onClick={()=>{window.location.href = `/notifications`}}>Show All Notifications</button>
        </div>
    );
};

export default Notifications;
