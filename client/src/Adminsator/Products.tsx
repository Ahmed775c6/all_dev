import { useState, useEffect } from "react";
import Aside from "../components/AdmiComponents/Aside";
import Nav from "../components/AdmiComponents/Nav";
import EditableProduct from "../components/AdmiComponents/EditableProduct";
import Loader from "../components/Loader";
import { GetP } from "../Logic/getApp"; // Import GetP function
import Themes from "../components/AdmiComponents/Themes";
const ProductsPage = () => {
  const [products, setProducts] = useState([]); // State to store the fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for category filter
  const [selectedSubCategory, setSelectedSubCategory] = useState(""); // State for subcategory filter

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const [Changing,setChanging] = useState(false);
const [AsideT, setAside] = useState(false)
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
    setLoading(false)
  }, [theme]);





  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetP(); // Fetch products
        setProducts(response);
        setFilteredProducts(response); // Initially set filteredProducts to all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Search and filter function
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products.filter((item: any) =>
      (item.name && item.name.toLowerCase().includes(lowercasedQuery)) ||
      (item._id && item._id.toString().includes(lowercasedQuery)) ||
      (item.Categorie && item.Categorie.toLowerCase().includes(lowercasedQuery))
    ).filter((item: any) =>
      (selectedCategory ? item.Categorie === selectedCategory : true) &&
      (selectedSubCategory ? item.sous === selectedSubCategory : true)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, selectedSubCategory, products]);

  return (
    <>
    {loading ? <Loader/> : null}
    {
  Changing ? <Themes setCh = {setChanging} /> : ''
}
  
      <div className="w-full flex">
      <Aside AsideT = {AsideT} setAsideT= {setAside}  />
        <div className="w-full min-h-[100vh] bg-[#edf4f6] dark:bg-gray-900 flex flex-col text-black dark:text-white">
        <Nav AsideT = {AsideT} setAside = {setAside} />
 
          <section className="p-6 w-full flex flex-col gap-3 dark:bg-[#2d3748]">
            <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb this_div">
              <div>
                <p className="fw-semibold fs-18 mb-0">Dashboard / Products</p>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full flex search shadow-sm gap-2 flex-wrap">
                <input
                  type="text"
                  className="w-full bg-white dark:bg-gray-700 p-2 outline-none rounded-none text-black dark:text-white"
                  placeholder="SEARCH by Name, ID, or Category"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                  className="bg-white dark:bg-gray-700 p-2 outline-none rounded text-black dark:text-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {[...new Set(products.map((p: any) => p.Categorie))].map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  className="bg-white dark:bg-gray-700 p-2 outline-none rounded text-black dark:text-white"
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                >
                  <option value="">All Subcategories</option>
                  {[...new Set(products.map((p: any) => p.sous))].map((subCategory) => (
                    <option key={subCategory} value={subCategory}>{subCategory}</option>
                  ))}
                </select>
              </div>
              <div className="shop w-full grid grid-cols-3 bg-transparent p-4 mblidn">
                {filteredProducts.map((item, index) => (
                  <div className="w-full" key={index}>
                    <EditableProduct product={item} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
