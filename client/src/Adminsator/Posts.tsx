import Aside from "../components/AdmiComponents/Aside";
import Nav from "../components/AdmiComponents/Nav";
import "../Adminsator/Styles.css";
import { useEffect, useState } from "react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import Loader from "../components/Loader";
import Themes from "../components/AdmiComponents/Themes";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Posts = () => {

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [Loading, setLoading] = useState(false);
  const [Changing, setChanging] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState(""); // Date filter state
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  const Navigate = useNavigate();
  const [AsideT, setAside] = useState(false);
const [deln,setDels] = useState<any>(null)
const [showDel,setShowDel] = useState(false)
const[st,setSt] = useState<any>('');
const [lo,setLo] = useState(false);
const handelDeletePost = async () => {
  try {
    setLo(true);
    const res = await axios.post(`${baseUrl}/delPostk`, { id: deln });
    if (res) {
      setPosts(posts.filter((post: any) => post._id !== deln)); // Remove deleted post
      setShowDel(false);
      setDels(null);
    }
    setLo(false)
  } catch (err) {
    console.log(err);
    setLo(false)
    setSt("Error deleting post");
  }
};

  // Function to format date from "22/05/2025" to "22/Apr"
  const formatDate = (dateString: string) => {
    const [month , day] = dateString.split("/");
    const date = new Date(2025, Number(month) -1 , Number(day)); // Set year dynamically if needed
    return `${day}/${date.toLocaleString("en-US", { month: "short" })}`;
  };

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
    setLoading(false)
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/allblogs`);
        setPosts(res.data.message);
        // Extract unique tags for suggestion
        const tags = res.data.message.flatMap((item: any) => item.tags);
        setUniqueTags([...new Set(tags)] as string[]); // Remove duplicates
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
const Delpop = () => {
  return (
    <>

<div className="w-full fixed items-center p-6 bg-[rgba(0,0,0,0.7)]  dark:bg-[rgba(0,0,0,0.5)] min-h-screen z-20 h-full flex justify-center">
<div className=" w-full  flex flex-col gap-3  bg-white dark:text-white rounded-sm dark:bg-gray-800 shadow-md ">
     <h1 className="w-full p-4 dark:text-white text-lg font-semibold">Confirmation </h1>
      <p className="text-center  ">Are you sure you want to delete this post?</p>
  <div className="w-full p-4 flex gap-2 flex-row-reverse">
  <button className="w-full bg-blue-100 text-gray-800 rounded-sm" disabled = {lo} onClick={() => { setShowDel(false); setDels(null); }}>Cancel</button>
  <button className="w-full bg-blue-400 p-2 text-white rounded-sm " disabled = {lo} onClick={() => { handelDeletePost() }}>{lo? 'deleting ..' : 'Yes'}</button>
  </div>
     </div>
</div>
    </>
  );
}
  const filteredPosts = posts.filter((post: any) => {
    // Title filter
    const titleMatches = post.title.toLowerCase().includes(searchTitle.toLowerCase());
  

    const postDate = new Date(post.date).toISOString().split('T')[0]; // Extract YYYY-MM-DD
    const dateMatches = searchDate ? postDate === searchDate : true;
    
    console.log(postDate, searchDate);
    
    // Tag filter
    const tagsMatch = selectedTags.length === 0 || selectedTags.every((tag) => post.tags.includes(tag));
  
    return titleMatches && dateMatches && tagsMatch;
  });
  

  return (
    <>   {
      st ? <p>{st}</p> : null
    }   {showDel ? <Delpop/> : null}
      {Loading ? <Loader /> : ""}
      {Changing ? <Themes setCh={setChanging} /> : ""}
      <div className="w-full flex dark:bg-[#2d3748] ">
        <Aside AsideT={AsideT} setAsideT={setAside} />
        <div className="w-full min-h-[100vh] bg-[#edf4f6] dark:bg-[#2d3748] flex flex-col">
          <Nav AsideT={AsideT} setAside={setAside} />
          <div className="w-full flex flex-col gap-3 p-6">
            <h1 className="font-semibold text-xl dark:text-white">Dashboard / Posts</h1>
      
           
            <div className="flex gap-4">
              <input
                type="text"
                className="px-3 py-1 border rounded-md"
                placeholder="Search by title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <input
                type="date"
                className="px-3 py-1 border rounded-md"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>

            <div className="mt-4">
              {/* Tag Filter */}
              <h3 className="font-semibold text-lg">Filter by Tags</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {uniqueTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 border rounded-full ${selectedTags.includes(tag) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter((t) => t !== tag));
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              className="gallery"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {filteredPosts.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  className="gallery-item relative w-full max-w-sm rounded-md overflow-hidden shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.0 }} // Slight zoom effect on hover
                  whileTap={{ scale: 0.9 }} // Press effect
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }} // Staggered animation
                >
                  {/* Background Image */}
                  <div
                    className="relative"
        
                  >
                    
                    <i className="ri-edit-line absolute right-5 z-10 top-5 text-green-100 bg-green-500 dark:text-white p-1 w-10 h-10 flex justify-center text-center items-center rounded-sm cursor-pointer" onClick={()=>{Navigate(`/UpdatePosts?id=${item._id}`)}}></i>
                    <i onClick={()=>{setShowDel(true); setDels(item._id)}} className=" text-red-100 ri-delete-bin-line absolute right-5 z-10 top-20 bg-red-500 dark:text-white p-1 w-10 h-10 flex justify-center text-center items-center rounded-sm cursor-pointer"></i>
                    <img
                      src={item.image}
                      alt={`image-${index}`}
                      className="w-full object-cover"
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
                    <span className="text-md rounded-sm">{formatDate(item.date)}</span>
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
                      <div className="flex gap-2 flex-wrap px-3 py-1 rounded-full text-sm font-semibold uppercase">
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
                    <h2 className="mt-2 text-lg font-semibold leading-tight">{item.title}</h2>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <button
        className="fixed justify-center right-10 bottom-10 rounded-full w-11 h-11 text-center items-center outline-none border-none cursor-pointer flex p-2 bg-blue-400 text-white"
        onClick={() => {
          setChanging(true);
        }}
      >
        <i className="ri-settings-line"></i>
      </button>
    </>
  );
};

export default Posts;
