import { useEffect, useState } from "react";
import { Blogs } from "../../Logic/getApp";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import { Loader } from "lucide-react";

const Blog = () => {
  const Navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Blogs(currentPage, postsPerPage);
        setProducts(response.data);
        setTotalProducts(response.totalProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage, postsPerPage]);

  // Function to format date from "22/05/2025" to "22/Apr"
  const formatDate = (dateString: string) => {
    console.log(dateString)
    const [month , day] = dateString.split("/");
    const date = new Date(2025, Number(month) - 1, Number(day)); // Set year dynamically if needed
    return `${day}/${date.toLocaleString("en-US", { month: "short" })}`;
  };

  return (
    <>
  {
    loading ?<>
    <div className="w-full flex fixed top-0 left-0 justify-center flex-col items-center">
    <Loader/> 
    loading ...
    </div>
    
    </> : <>
        <Navbar />
      <div className="w-full flex flex-col gap-3 p-6 bg-gray-100 dark:bg-gray-900">

        <motion.div 
          className="gallery"
          initial={{ opacity: 0, y: 0 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {products?.map((item: any, index: number) => (
            <motion.div
              key={index}
              className="gallery-item relative w-full max-w-sm rounded-md overflow-hidden shadow-lg cursor-pointer"
              whileHover={{ scale: 1.0 }} 
              whileTap={{ scale: 0.9 }} 
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }} 
            >
         
              <div
                className="relative"
                onClick={() => Navigate(`/blog_item?id=${item._id}`)}
              >
                <img
                  src={item.image}
                  alt={`image-${index}`}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-black hover:bg-opacity-40 transition-all"></div>
              </div>

          
              <motion.div 
                className="absolute top-2 left-2 bg-white text-gray-800 text-center px-3 py-1 rounded-sm shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <span className="text-md rounded-sm  ">{formatDate(item.date)}</span>
              </motion.div>

           
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
             
                {item.tags.length > 0 && (
                  <div className="flex gap-2 px-3 flex-wrap py-1 rounded-full text-sm font-semibold uppercase">
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

             
                <h2 className="mt-2 text-lg font-semibold leading-tight">
                  {item.title}
                </h2>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <Pagination
          totalPosts={totalProducts}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Footer />
    
    </>
  }
    </>
  );
};

export default Blog;
