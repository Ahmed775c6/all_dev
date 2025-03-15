import { useLocation } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ChatSupport from "../../components/ChatSupport";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const Blog_Item = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [item, setItem] = useState<any>(null);
  const [sugg,setSugg] = useState<any>([]);
    const iframeRef = useRef<HTMLIFrameElement>(null);
const [content,setCon] = useState<any>('');
const formatDate = (dateString: string) => {
  console.log(dateString)
  const [day, month] = dateString.split("/");
  const date = new Date(2025, Number(month) - 1, Number(day)); // Set year dynamically if needed
  return `${day}/${date.toLocaleString("en-US", { month: "short" })}`;
};
  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}/getblog/${id}`).then((res) => {
        setItem(res.data.message);
        setCon(res.data.message.content);
        setSugg(res.data.sugg)
      });
    }
  }, [id]);

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const doc = iframeRef.current.contentDocument;
      doc.open();
      doc.write(`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px;  color: black; }
              h3 { text-align: center; color: #f1c40f; font-weight: bold; }
              blockquote { 
                border-left: 4px solid #4ade80; 
                padding:0.7rem; 
                margin: 10px 0; 
                font-style: italic; 
                background: rgba(0, 0, 0, 0.05);
              }
              ol { padding-left: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              table, th, td { border: 1px solid black; padding: 10px; text-align: left; }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `);
      doc.close();
    }
  }, [content]);
  if (!item) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col   ">
        
<div className="w-full flex flex-col text-center">
<div className="flex flex-wrap gap-2 p-4  items-center justify-center">
          {item.tags?.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-blue-200 text-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        

        <h1 className="text-3xl font-bold p-4 uppercase text-blue-900">{item.title}</h1>
        <span className="text-gray-500 p-4">Psoted on {item.date} By @Para</span>
</div>
        <div className="w-full h-full bg-white relative">
          <img
            src={item.image}
            className="w-full h-full max-h-[100vh] object-fill "
            alt="Blog Cover"
          />
        </div>
<p> {item.discription} </p>

        <div className="w-full h-screen ">
        <iframe
      ref={iframeRef}
      className="w-full h-screen min-h-screen overflow-hidden"
      title="Content Preview"
    ></iframe>
        </div>

        {
  sugg.length > 1? (
    <>
      <div className="w-full mt-11 flex flex-col gap-2 h-full">
        <h2 className="text-2xl font-semibold text-center">
          You Might Also Like
        </h2>
<div className="w-full flex gap-2">
{sugg.map((item: any, index: any) => (
     
     item._id != id ? <>
   <motion.div
             key={index}
             className="gallery-item relative w-full h-full max-w-sm rounded-md overflow-hidden shadow-lg cursor-pointer"
             whileHover={{ scale: 1.0 }} // Slight zoom effect on hover
             whileTap={{ scale: 0.9 }} // Press effect
             initial={{ opacity: 0, y: 0 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3, delay: index * 0.1 }} // Staggered animation
           >
             {/* Background Image */}
             <div
               className="relative"
               onClick={() => Navigate(`/blog_item?id=${item._id}`)}
             >
               <img
                 src={item.image}
                 alt={`image-${index}`}
                 className="w-full h-[300px] object-fill"
               />
               <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-black hover:bg-opacity-40 transition-all"></div>
             </div>

             {/* Date Badge */}
             <motion.div 
               className="absolute top-2 left-2 bg-white text-gray-800 text-center px-3 py-1 rounded-sm shadow-md"
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ duration: 0.4, delay: 0.3 }}
             >
               <span className="text-md rounded-sm  ">{formatDate(item.date)}</span>
             </motion.div>

             {/* Content */}
             <motion.div
               className="absolute bottom-0 left-0 right-0 p-4 text-white"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.4 }}
             >
               {/* Tags (Categories) */}
               {item.tags.length > 0 && (
                 <div className="flex gap-2 px-3 py-1 rounded-full text-sm font-semibold uppercase">
                   {item.tags.map((tag: any, index1: any) => (
                     <span
                       key={index1}
                       className="text-xs font-medium px-3 py-1 bg-blue-200 dark:bg-blue-500 text-blue-900 dark:text-white rounded-full"
                     >
                       {tag}
                     </span>
                   ))}
                 </div>
               )}

               {/* Title */}
               <h2 className="mt-2 text-lg font-semibold leading-tight">
                 {item.title}
               </h2>
             </motion.div>
           </motion.div>
     </>: null
    
       ))}
</div>
      </div>
    </>
  ) : null
}

      </div>

      <ChatSupport />
      <Footer />
    </>
  );
};

export default Blog_Item;
