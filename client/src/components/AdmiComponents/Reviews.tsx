import Nav from "./Nav";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Themes from "./Themes";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const Reviews = () => {
  const socket = io(`${baseUrl}`);
  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [product, setProduct] = useState<any | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReviews, setFilteredReviews] = useState<any[]>([]);

  // Fetch all reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getRev`);
        const DT = response.data.Re;
        const F = DT.reverse()
        setReviews(F);
        setFilteredReviews(F); // Initialize filtered reviews
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Filter reviews based on search term
  useEffect(() => {
    const filterReviews = () => {
      const filtered = reviews.filter((review) =>
        review.data.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.data.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.date.includes(searchTerm) ||
        (review.status || "pending").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReviews(filtered);
    };
    filterReviews();
  }, [searchTerm, reviews]);
useEffect(()=>{
    socket.on('newReview', (data) => {
        setReviews([...reviews, data].reverse());
        setFilteredReviews([...reviews, data].reverse());
        });
})
  // Fetch product details by ID
  const fetchProductById = async (productId: string) => {
    try {
      const response = await axios.get(`${baseUrl}/getproduct101/${productId}`);
      setProduct(response.data); // Assuming the API returns product data
    } catch (err) {
      console.error("Error fetching product:", err);
      setProduct(null);
    }
  };

  // Handle view/edit button click
  const handleViewEditClick = async (review: any) => {
    setSelectedReview(review);
    if (review.data.id) {
      await fetchProductById(review.data.id); // Fetch product details if productId exists
    }
    setPopupOpen(true);
  };

  // Handle status update
  const handleStatusUpdate = async (status: string) => {
    try {
      await axios.post(`${baseUrl}/updateReviewStatus/${selectedReview._id}`, { status });
      alert("Status updated successfully!");
      setSelectedReview({ ...selectedReview, status });
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };
  const handleStatusDelete = async () => {
    try {
      await axios.post(`${baseUrl}/updateReviewDel/${selectedReview._id}`, { d : 'del' });
      alert("review deleted successfully!");
      setSelectedReview({ ...selectedReview });
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };
  // Close popup
  const handleClosePopup = () => {
    setSelectedReview(null);
    setProduct(null);
    setPopupOpen(false);
  };

  const [AsideT, setAside] = useState(false);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  }, [theme]);

  const [Changing, setChanging] = useState(false);

  useEffect(() => {
    const handleWindowLoad = () => {
      setLoading(false);
    };
    window.addEventListener("load", handleWindowLoad);
    return () => {
      window.removeEventListener("load", handleWindowLoad);
    };
  }, []);

  return (
    <>
      {Changing ? <Themes setCh={setChanging} /> : ""}
      <div className="w-full flex dark:bg-[#2d3748]">
        <Aside AsideT={AsideT} setAsideT={setAside} />
        <div className="w-full min-h-[100vh] bg-[#edf4f6] dark:bg-[#2d3748] flex flex-col">
          <Nav AsideT={AsideT} setAside={setAside} />
          <div className="w-full flex flex-col gap-3 p-6 h-full dark:bg-gray-700">
            <h1 className="text-xl font-bold dark:text-white">Dashboard / Products Reviews</h1>

            {/* Search Input */}
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search by username, email, date, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-4 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div className="w-full h-full p-4 shadow-sm rounded-sm bg-white dark:bg-gray-900">
              {/* Loading state */}
              {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
              ) : (
                <>
                  {/* Table to display reviews */}
                  <div className="overflow-x-auto bg-white dark:bg-gray-700 dark:text-white">
                    <p className="p-1">Total : {filteredReviews.length}</p>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                          <th className="py-2 px-4 border-b dark:border-gray-700 hidden md:table-cell">Username</th>
                          <th className="py-2 px-4 border-b dark:border-gray-700 hidden md:table-cell">Email</th>
                          <th className="py-2 px-4 border-b dark:border-gray-700">Rating</th>
                          <th className="py-2 px-4 border-b dark:border-gray-700">Date</th>
                          <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReviews.map((review) => (
                          <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="py-2 px-4 border-b dark:border-gray-700 text-center hidden md:table-cell">
                              {review.data.username}
                            </td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 text-center hidden md:table-cell">
                              {review.data.email}
                            </td>
                            <td className={`py-2 px-4  dark:border-gray-700 text-center text-white `}>{review.status  ?<p className={`p-2 rounded-3xl ${review.status ? 'bg-green-400 ' : 'bg-yellow-300'}`}>{ review.status}</p> : <p  className={`p-2 rounded-3xl ${review.status ? 'bg-green-400 ' : 'bg-yellow-300'}`}>pending</p> } </td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 text-center">{review.date}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 flex gap-2 justify-center">
                              <button
                                onClick={() => handleViewEditClick(review)}
                                className="p-2 w-full bg-blue-500 text-white rounded-md"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {popupOpen && selectedReview && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-[600px]">
                        <div className="w-full flex alox">
                          <div className="w-full flex flex-col gap-2">
                            <h3 className="text-lg font-bold mb-4 dark:text-white">Review Details</h3>
                            <p className="mb-2 dark:text-gray-300">
                              <strong>Username:</strong> {selectedReview.data.username}
                            </p>
                            <p className="mb-2 dark:text-gray-300">
                              <strong>Email:</strong> {selectedReview.data.email}
                            </p>
                            <p className="mb-2 dark:text-gray-300">
                              <strong>Rating:</strong> {selectedReview.data.rating} STARS
                            </p>
                            <p className="mb-2 dark:text-gray-300">
                              <strong>Date:</strong> {selectedReview.date}
                            </p>
                            <p className="mb-2 dark:text-gray-300">
                              <strong>Status:</strong> {selectedReview.status || "Pending"}
                            </p>
                            <div className="flex gap-2 mt-4">
                              <button
                                onClick={() => handleStatusUpdate("confirmed")}
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleStatusDelete()}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                              >
                                DELETE
                              </button>
                            </div>
                          </div>

                          {product && (
                            <div className="mt-4 w-full">
                              <h4 className="text-lg font-bold mb-2 dark:text-white">Product Details</h4>
                              <div className="flex gap-2 w-full">
                                <img src={product.mainImage} alt="main" className="w-11 h-11" />
                                <p className="mb-2 dark:text-gray-300 flex flex-col ">
                                  <p>
                                    <strong>Name:</strong> {product.name}
                                  </p>
                                  <p>
                                    <strong>Reviews:</strong> {product.reviews.length}
                                  </p>
                                </p>
                              </div>
                              <p className="mb-2 dark:text-gray-300">
                                <strong>Description:</strong> {product.description}
                              </p>
                              <p className="mb-2 dark:text-gray-300">
                                <strong>Comment:</strong> {selectedReview.data.comment}
                              </p>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={handleClosePopup}
                          className="block mt-4 px-4 py-2 bg-gray-500 text-white rounded-md w-full"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

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

export default Reviews;