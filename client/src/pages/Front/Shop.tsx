import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import BrandsLinks from "../../components/BrandsLinks";
import Footer from "../../components/Footer";
import Product from "../../components/Product";
import Filter from "./ShopFilter";
import { GetP1 ,GetP22} from "../../Logic/getApp";
import Pagination from "../../components/Pagination";
import ProductOverviewPopup from "../../components/Popup";


const Shop = () => {

  const searchParams = new URLSearchParams(window.location.search);
  const direction = searchParams.get("direction");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedsous, setSousCat] = useState<string | null>(null);
  const [selectedBRand, setBr] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showItem,setShowItem] = useState<any>(null) 
  const [Fst,setFST] = useState("-700px")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      

        if(!direction){
          const response = await GetP1(currentPage, postsPerPage); // Pass currentPage and postsPerPage to the API
          const productsData = response.data.map((product : any) => ({
            ...product,
            currentPrice: Number(product.currentPrice), // Convert price to number
          }));
  
          setProducts(productsData);
          setTotalProducts(response.totalProducts);
          setLoading(false);
        }else{
          const response = await GetP22(direction); 
      
          const productsData = response.data.map((product : any) => ({
            ...product,
            currentPrice: Number(product.currentPrice), // Convert price to number
          }));
  
          setProducts(productsData);
          setTotalProducts(response.totalProducts);
          setLoading(false);
        }

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage, postsPerPage]); // Re-fetch when currentPage or postsPerPage changes

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product) => product.currentPrice);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products]); 

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.currentPrice >= priceRange[0] &&
        product.currentPrice <= priceRange[1] &&
        (selectedCategory == null || product.Categorie === selectedCategory) &&
        (selectedsous == null || product.sous === selectedsous) && // Filtering by sub-category
        (selectedBRand == null || product.marques === selectedBRand) // Filtering by brand
    );
    setFilteredProducts(filtered);
  }, [products, priceRange, selectedCategory, selectedsous, selectedBRand]); // Updated dependency array
  
  return (
    <>
    {
  showItem ? <ProductOverviewPopup  product = {showItem} onClose = {()=>{setShowItem(null)}} /> : ''
}

      <Navbar />
      <div className="w-full bg-[var(--bg)] h-full min-h-[100vh] flex gap-3 p-4 llsx">
       {
        direction ? null :  <div className="flex flex-col h-full w-[25%] xlsksks bg-white p-4  rounded-sm shadow-sm">
          
        <h1 className="w-full flex justify-between">
    <h1 className="text-lg font-semibold mb-4 flex gap-2" onClick={()=>{setFST('0')}}> <i className="ri-equalizer-line"></i> Filter</h1>
  <p>{totalProducts}</p>
        </h1>
        <Filter
          setSelectedCategory={setSelectedCategory}
          setSousCat = {setSousCat}
          setBr = {setBr}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
          products={products}
          Fst={Fst}
          setFst={ setFST}
        />
      </div>
       }

        <div className="w-full">
          <div className="grid grid-cols-3 gap-3 dkhdyh">
            {loading ? (
              <>loading ...</>
            ) : (
              filteredProducts.map((product: any, index: any) => (
                <div className="w-full" key={index}>
                  <Product product={product} seti = {setShowItem} />
                </div>
              ))
            )}
          </div>
          <Pagination
            totalPosts={filteredProducts.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <BrandsLinks />
      <Footer />
    </>
  );
};

export default Shop;
