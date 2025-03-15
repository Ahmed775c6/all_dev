import Aside from "../components/AdmiComponents/Aside";
import Nav from "../components/AdmiComponents/Nav";

import "../Adminsator/Styles.css";
import { useEffect, useState } from "react";

import Loader from "../components/Loader";
import Themes from "../components/AdmiComponents/Themes";
import { handelUpload } from "../Logic/UploadFile";
import { FetchProductsByCategorie } from "./Utils/getData";
import TaskLoader from "../components/AdmiComponents/TaskLoader";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const MenuEdit = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSlug, setSelectedSlug] = useState('');

  // File & image
  const [file, setFile] = useState<any>(null);
  const [photo, setPhoto] = useState<any>(null);

  // Menu link fields
  const [categorie, setCategorie] = useState("");
  const [categorie1, setCategorie1] = useState("");
  const [linkName, setLinkName] = useState("");
  const [slug, setSlug] = useState("");

  // Chosen products
  const [chosenP, setChosenP] = useState<any>([]);
  const [products, setProducts] = useState<any>(null);
  const [view, setView] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
const [sucess101,setSuccess101] = useState('');
  // Loading states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [changing, setChanging] = useState(false);
  const [l,setL] =useState(false)
  // Manage existing menu links
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
const [s1,setS1] = useState(false);
  // Aside toggler
  const [asideT, setAside] = useState(false);
  const filteredMenuItems = menuItems.filter(item => {
    const categoryMatch = selectedCategory ? item.content.categorie === selectedCategory : true;
    const slugMatch = selectedSlug ? item.content.slug.includes(selectedSlug) : true;
    return categoryMatch && slugMatch;
  });
  //==========================
  //  THEME + INITIAL LOAD
  //==========================
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  }, [theme]);

  useEffect(() => {
    
    fetchMenuItems();

    setLoading(false);
  }, []);


  const fetchMenuItems = async () => {
    try {
      const res = await axios.get(`${baseUrl}/getLinks`);
      
      setMenuItems(res.data.requiredData); // Adjust based on your backend response
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  //==========================
  //  CHOOSE PRODUCTS
  //==========================
  const chooseProducts = () => {
    return (
      <div className="w-full flex flex-col h-full fixed z-50 bg-[rgba(0,0,0,0.5)] top-0 left-0">
        <div className="w-[80%] flex flex-col rounded-md p-4 m-auto bg-white dark:bg-gray-900 ">
          <header className="p-2 w-[80%] flex flex-wrap gap-3 justify-between flex-row ">
            <h1 className="dark:text-white">Choose Products</h1>
            <div>
              <div className="w-full flex gap-3">
                <p>Chosen items : {chosenP.length}</p>
                <button
                  onClick={() => {
                    if (products.length === chosenP.length) {
                      setChosenP([]);
                    } else {
                      setChosenP(products);
                    }
                  }}
                >
                  {products && products.length === chosenP.length
                    ? "Unselect All"
                    : "Select All"}
                </button>
              </div>
            </div>
          </header>

          {loadingData ? (
            <div className="w-full flex flex-col items-center justify-center text-center p-4">
              <p>Loading ...</p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-5 p-2 max-h-[60vh] overflow-auto setnd gap-3">
              {products &&
                products.map((item: any, index: any) => (
                  <div
                    className="w-full relative cursor-pointer"
                    key={index}
                    onClick={() => {
                      if (!chosenP.some((p: any) => p.id === item.id)) {
                        setChosenP([...chosenP, item]);
                      } else {
                        setChosenP(chosenP.filter((p: any) => p.id !== item.id));
                      }
                    }}
                  >
                    <img src={item.mainImage} alt="main" className="object-cover" />
                    {chosenP.some((p: any) => p.id === item.id) && (
                      <div className="w-5 absolute top-2 right-2 h-5 border bg-blue-400 text-white rounded-sm flex justify-center items-center">
                        ✔
                      </div>
                    )}
                    <div className="w-full flex p-2 flex-col gap-3 bg-gray-200">
                      <p>{item.name}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
          <div className="w-full flex gap-3 p-2">
            <button
              className="p-2 bg-gray-600 rounded-sm cursor-pointer w-full text-white"
              onClick={() => setView(false)}
            >
              Cancel
            </button>
            <button
              className="p-2 rounded-sm bg-blue-400 cursor-pointer w-full text-white"
              onClick={() => setView(false)}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  //==========================
  //  HANDLERS
  //==========================
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setPhoto(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return; // Prevent multiple clicks
    setSubmitting(true);

    try {

      const productIds: string[] = chosenP.map((p: any) => p._id);

      // Prepare data
      const data = {
        linkName,
        slug,
        categorie,
        products: productIds,
      
      };

      if (editingId) {
        // UPDATE existing link
        await axios.post(`${baseUrl}/postlinks1/${editingId}`, data);
      } else {
        // CREATE new link
        await axios.post(`${baseUrl}/postlinks`, data);
      }

      // Reset form & states
      setCategorie("");
      setLinkName("");
      setSlug("");
      setFile(null);
      setPhoto(null);
      setChosenP([]);
      setEditingId(null);
      setS1(true)

      // Refresh the menu items list
      fetchMenuItems();
    } catch (err) {
      console.error("Error submitting the form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChooseProductsClick = async () => {
    setView(true);
    setLoadingData(true);
    try {
      const data = await FetchProductsByCategorie(categorie);
      if (data.message) {
        setProducts(data.message);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.log(err);
    }
    setLoadingData(false);
  };

  const [EDit,setEdit] = useState(false)

  //==========================
  //  EDIT & DELETE
  //==========================
  const handleEdit = (item: any) => {
   
    // Populate form fields with existing data
    setEditingId(item._id);
    setCategorie(item.content.categorie);
    setLinkName(item.content.linkName);
    setSlug(item.content.slug);
    setChosenP(item.content.Products || []);
    setS1(false);

  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.post(`${baseUrl}/deleteLinkf/${id}`);
      // Refresh list
      fetchMenuItems();
    } catch (err) {
      console.error("Error deleting the link:", err);
    }
  };
  const setCATImg = async(e:any)=>{
e.preventDefault();
try{
  setL(true)
  setSuccess101('')
  const check = await handelUpload(photo);
  if(check){
const data = {
  categorie : categorie1,
  link : check.link,
}
const res = await axios.post(`${baseUrl}/linksCTI`,data);

if(res){
  setSuccess101(res.data.message);
}
  }else{
    alert("Error uploading image");
  }
  setL(false)
}catch(err){
  console.log(err)
  setL(false)
  alert('something went wrong refresh & try again');

}
  }

  return (
    <>
      {loading && <Loader />}
      {changing && <Themes setCh={setChanging} />}
      {view && chooseProducts()}
      {submitting && <TaskLoader />}

      <div className="w-full flex dark:bg-[#2d3748] ">
        <Aside AsideT={asideT} setAsideT={setAside} />
        <div className="w-full min-h-[100vh] bg-[#edf4f6] dark:bg-[#2d3748] flex flex-col">
          <Nav AsideT={asideT} setAside={setAside} />
          <div className="w-full flex  flex-col gap-3 p-6 ">
            <h1 className="text-xl font-semibold dark:text-white">
              Dashbord /AppSettings /Menu Edit
            </h1>
<button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-sm cursor-pointer text-white uppercase"onClick={()=>{
  setEdit(!EDit)
}}>{!EDit ? 'EDIT EXisting links' : 'Cancel'} </button>
            {
  EDit ? (
    <>
      <div className="bg-white dark:bg-gray-900 p-4 rounded-md mb-4">
        <h2 className="text-lg mb-2 dark:text-white">Existing Menu Items</h2>
        {menuItems.length === 0 ? (
          <p className="dark:text-white">No menu items found.</p>
        ) : (
          <>
            {/* Filter Controls */}
            <div className="flex gap-4 mb-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded dark:bg-gray-800 outline-none dark:text-white"
              >
                <option value="">All Categories</option>
                {[...new Set(menuItems.map(item => item.content.categorie))].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Filter by slug"
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="p-2 border rounded dark:bg-gray-800 outline-none dark:text-white"
              />
            </div>

            {/* Filtered Items Table */}
            {filteredMenuItems.length === 0 ? (
              <p className="dark:text-white">No menu items match the filters.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 dark:text-white">Name</th>
                    <th className="p-2 dark:text-white">Slug</th>
                    <th className="p-2 dark:text-white">Category</th>
                    <th className="p-2 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMenuItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="p-2 dark:text-white">{item.content.linkName}</td>
                      <td className="p-2 dark:text-white">{item.content.slug}</td>
                      <td className="p-2 dark:text-white">{item.content.categorie}</td>
                      <td className="p-2 dark:text-white">
                        <button
                          onClick={() => handleEdit(item)}
                          className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </>
  ) : null
}

            {/* FORM FOR CREATE/EDIT */}
            <div className="w-full flex gap-3 sx">
              <div className="w-full flex flex-col gap-3 ">
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex-col flex bg-white gap-3 p-4 dark:bg-gray-900 rounded-md"
                >
                  <p className="dark:text-white font-semibold">
                    {editingId ? "Edit Link" : "Create a Link"}:
                  </p>
                  {s1 ? <p className="text-green-400">{'Update done successfully'}</p> : null}
                  <input
                    type="text"
                    name="categorie"
                    className="p-2 dark:bg-gray-800 outline-none border-none"
                    placeholder="Category"
                    list="dist"
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                  />
                  <datalist id="dist">
                    <option value="visage">Visage</option>
                    <option value="cheveau">Chéveau</option>
                    <option value="corps">Corps</option>
                    <option value="bebe-maman">Bébé et Maman</option>
                    <option value="complements-alimentaires">
                      Compléments Alimentaires
                    </option>
                    <option value="hygiene">Hygiène</option>
                    <option value="solaire">Solaire</option>
                    <option value="bio-nature">Bio et Nature</option>
                    <option value="materiels-medical">Matériels Médical</option>
                    <option value="homme">Homme</option>
                  </datalist>

                  <input
                    type="text"
                    placeholder="Slug"
                    className="p-2 dark:bg-gray-800 outline-none border-none"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Link name"
                    className="p-2 dark:bg-gray-800 outline-none border-none"
                    value={linkName}
                    onChange={(e) => setLinkName(e.target.value)}
                  />

        

                  <button
                    type="button"
                    onClick={handleChooseProductsClick}
                    className="p-2 bg-blue-400 text-white outline-none border-none"
                  >
                    Choose Products
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-sm cursor-pointer"
                  >
                    {editingId ? "Update" : "Create"}
                  </button>
                </form>
              </div>
              <div className="w-full flex flex-col gap-3">
        <form onSubmit={setCATImg} className="w-full flex-col flex bg-white gap-3 p-4 dark:bg-gray-900 rounded-md">
        <p className="dark:text-white font-semibold">
                   Categories images
                  </p>
                  {sucess101 ? <p className="text-green-400">{'Update done successfully'}</p> : null}
                  <input
                    type="text"
                    name="categorie"
                    className="p-2 dark:bg-gray-800 outline-none border-none"
                    placeholder="Category"
                    list="dist"
                    value={categorie1}
                    onChange={(e) => setCategorie1(e.target.value)}
                  />
                  <datalist id="dist">
                    <option value="visage">Visage</option>
                    <option value="cheveau">Chéveau</option>
                    <option value="corps">Corps</option>
                    <option value="bebe-maman">Bébé et Maman</option>
                    <option value="complements-alimentaires">
                      Compléments Alimentaires
                    </option>
                    <option value="hygiene">Hygiène</option>
                    <option value="solaire">Solaire</option>
                    <option value="bio-nature">Bio et Nature</option>
                    <option value="materiels-medical">Matériels Médical</option>
                    <option value="homme">Homme</option>
                  </datalist>

                  <input
                    type="file"
                    accept="image/*"
                    name="file"
                    onChange={handleFileChange}
                  />
                  {file && (
                    <img
                      src={file}
                      alt="preview"
                      className="w-28 h-28 object-cover"
                    />
                  )}


                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-sm cursor-pointer"
                    disabled = {l}

                  >
                    {!l ? "Update" : "loading.."}
                  </button>

        </form>
              </div>
            </div>
          </div>
        </div>

        {/* THEME BUTTON */}
        <button
          className="fixed justify-center right-10 bottom-10 rounded-full w-11 h-11 text-center items-center outline-none border-none cursor-pointer flex p-2 bg-blue-400 text-white"
          onClick={() => setChanging(true)}
        >
          <i className="ri-settings-line"></i>
        </button>
      </div>
    </>
  );
};

export default MenuEdit;
