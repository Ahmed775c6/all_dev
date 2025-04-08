import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios"; 
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import Themes from "./Themes";
const EditableProduct = ({ product }: any) => { 
  const [Deleting, setDeleting] = useState<string | null>(null);
  const [Result, setResult] = useState<string>("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
   setTheme(theme);
  }, [theme]);
  const [showProductOverview, setShowProductOverview] = useState(false);



  const toggleProductOverview = () => {
    setShowProductOverview(!showProductOverview);
  };



  const DeletItem = async (id: string) => {


    try {

      const response = await axios.post(`${baseUrl}/Deleteproducts`, {id});
      setResult("Product deleted successfully!");
      console.log(response.data);
  setInterval(()=>{
window.location.reload();
  },1000)
      setDeleting(null); // Close modal after success
    } catch (err: any) {
      console.error(err);
      setResult(err.response?.data?.message || "Failed to delete product.");
      setDeleting(null);
    }
  };

  const [Changing,setChanging] = useState(false);

  const onDelete = () => {
    return (
      <div className="w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center">
        <div className="w-[80%] p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg">
          <p className="text-lg font-semibold">Are you sure you want to delete this product?</p>
          <div className="w-full gap-3 p-2 flex">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => DeletItem(Deleting!)} // ✅ Trigger API call
            >
              Yes
            </button>
            <button
              className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded"
              onClick={() => setDeleting(null)} // Cancel deletion
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  };
  const ProductOverviewModal = () => {
    if (!product) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold dark:text-white">{product.name}</h2>
            <button
              onClick={toggleProductOverview}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Images Section */}
            <div>
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-64 object-contain mb-4"
              />
              <div className="grid grid-cols-3 gap-2">
                {product.otherImages?.map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Product variant ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 dark:text-gray-300">
              <div>
                <h3 className="font-bold">Current Price:</h3>
                <p>{product.currentPrice} TND</p>
              </div>
              <div>
                <h3 className="font-bold">Original Price:</h3>
                <p>{product.oldPrice} TND</p>
              </div>
              <div>
                <h3 className="font-bold">initial Quantitiy:</h3>
                <p>{product.stock}</p>
              </div>
              <div>
                <h3 className="font-bold"> Sold:</h3>
                <p>{product.sold}</p>
              </div>
              <div>
                <h3 className="font-bold">Remaining :</h3>
                <p>{product.newstock}</p>
              </div>
              <div>
                <h3 className="font-bold">Category:</h3>
                <p>{product.Categorie} → {product.sous}</p>
              </div>
              <div>
                <h3 className="font-bold">Description:</h3>
                <p>{product.description}</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-6">
  <h3 className="text-xl font-bold mb-4 dark:text-white">Reviews ({product.reviews?.length || 0})</h3>
  
  {product.reviews?.length > 0 && (
    <>
      {/* Average Rating */}
      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h4 className="font-semibold dark:text-white">Average Rating</h4>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-yellow-400">
            {(
              product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / 
              product.reviews.length
            ).toFixed(1)}
          </span>
          <div className="text-yellow-500">
            {'★'.repeat(
              Math.round(
                product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / 
                product.reviews.length
              )
            )}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {product.reviews.map((review: any, index: number) => (
          <div key={index} className="border-t pt-4 dark:border-gray-700">
            <div className="flex justify-between">
              <span className="font-bold dark:text-gray-300">{review.username}</span>
              <span className="text-sm dark:text-gray-400">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="dark:text-gray-300">Rating:</span>
              <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
              <span className="text-sm text-gray-500">({review.rating}/5)</span>
            </div>
            <p className="mt-2 dark:text-gray-400">{review.comment}</p>
          </div>
        ))}
      </div>
    </>
  )}
  
  {product.reviews?.length === 0 && (
    <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
  )}
</div>
        </div>
      </div>
    );
  };
  return (
    <>
    {
  Changing ? <Themes setCh = {setChanging} /> : ''
}
   {showProductOverview && <ProductOverviewModal />}
      {Result && (
        <div className="w-full fixed top-0 left-0 flex justify-center items-center z-50 p-2">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg text-center">
            {Result}
          </div>
        </div>
      )}

      {Deleting !== null && onDelete()}

      <motion.div layout className="product2 dark:bg-gray-800" key={product._id}>
        <div className="product_img">
          <img className="bg-white" src={product.mainImage} alt={product.name} />
          <div className="actions">
            <i
              className="ri-edit-line cursor-pointer"
            onClick={()=>{
              window.location.href = `/setup_prorduct?id=${product._id}`;

            }}
            ></i>
            <i
              className="ri-delete-bin-line cursor-pointer"
              onClick={() => setDeleting(product._id)}
              id={`delete_${product._id}`}
            ></i>
                <i
            className="ri-eye-line cursor-pointer"
            onClick={toggleProductOverview}
            id={`click_${product._id}`}
          ></i>

          </div>
          {product.hotDeals ? <>
          <p className="p-2 flex justify-center items-center text-center bg-rose-400 text-white text-xs absolute left-2 top-10 rounded-full"> 🔥
          Hot  </p>
          </> : ''}
        </div>
        <div className="product_content">
          <div className="title_dis">
            <p >id : {product._id} </p>
            <p className="item_title">{product.name}</p>
            <p>Quantity : {product.newstock} </p>
            <span>{product.description.substring(0, 30)}..</span>
          </div>
          <div className="price_pource">
            <div className="price">
              <div className="current_price">{product.currentPrice} TND</div>
              <div className="old_price">{product.oldPrice} TND</div>
              
            </div>
            <span className="purcentage absolute top-5 z-20">{product.discount} %</span>
          </div>
        </div>
      </motion.div>
      <button className="fixed justify-center right-10 bottom-10 rounded-full w-11 h-11 text-center items-center outline-none border-none cursor-pointer flex p-2 bg-blue-400 text-white"
onClick={()=>{
  setChanging(true);
}}
>
  <i className="ri-settings-line"></i>
</button>
    </>
  );
};

export default EditableProduct;
