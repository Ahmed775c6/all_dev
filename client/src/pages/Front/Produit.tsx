import Navbar from "../../components/Navbar"; 
import BrandsLinks from "../../components/BrandsLinks";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import Placed from "../../components/Placed";
import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri'; 
import MyComponent from "../../components/Frame";
import useSocket from "../../Logic/socket.io";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
interface Product {
  mainImage: string;
  otherImages: string[];
  name: string;
  description: string;
  currentPrice: number;
  oldPrice: number;
  stock: number;
  point: number;
  reviews: { username: string; email: string; comment: string; rating: number, status: string, date: string ,data :any}[];
  fullDisctiption : string;
  discount : any;
  _id : string;
  brandLogo : any;

  
  marques : any;
}
import { addToCart2 } from "../../Logic/utils";


const Produit = () => {
  const {SendReview} = useSocket();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [m, setM] = useState('');
  const [activePromoTab, setActivePromoTab] = useState('Description');
  const [item, setItem] = useState<Product | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1); 
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');  const [C, setC] = useState(false);
const [q,setQ] = useState(1);
const [ls,setLs] = useState(false)
const [Reviews,setReviews] = useState<any>([]);
const [merci,setMerci] = useState<any>(0)
useEffect(()=>{
  const F = async()=>{
    const res = await axios.get(`${baseUrl}/lvs`);
  
    if(res){
  
      setMerci(res.data.message.merci)
      
    }
  
  } 
   F();
    },[])


  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'reviewText') {
      setReviewText(e.target.value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handelreviews = async (e: any) => {
    e.preventDefault();
    setLs(true);
    if (reviewText.trim() && email.trim() && name.trim()) {
      const newReview = {
        username: name,  
        email: email, 
        comment: reviewText,
        rating: rating,
        id :''
      };
      try {
        const response = await axios.post(`${baseUrl}/addReview/${id}`, newReview);
        setItem((prevItem: any) => {
          if (prevItem) {
            return { ...prevItem, reviews: [...prevItem.reviews, newReview] };
          }
          return prevItem;
        });
        const sqlm = newReview
     if(item){
      sqlm.id = item._id;

     }
     console.log(response)
        SendReview(sqlm);
        setReviewText('');
        setRating(1);
        setEmail('');
        setName('');
        setLs(false);
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

  useEffect(() => {
    axios.get(`${baseUrl}/getproduct101/${id}`)
      .then(response => {
        console.log(response.data)
        setItem(response.data);
        setM(response.data.mainImage);
      })
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);
  useEffect(() => {
    axios.get(`${baseUrl}/getproductRv101/${id}`)
      .then(response => {
       
setReviews(response.data)
      })
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);

  if (!item) return <Loader />;

  const handleImageClick = (image: string) => {
    setM(image);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<RiStarFill key={i} className="text-yellow-500 cursor-pointer" onClick={() => handleStarClick(i)} />);
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(<RiStarHalfFill key={i} className="text-yellow-500 cursor-pointer" onClick={() => handleStarClick(i)} />);
      } else {
        stars.push(<RiStarLine key={i} className="text-yellow-500 cursor-pointer" onClick={() => handleStarClick(i)} />);
      }
    }
    return stars;
  };
console.log(item)
  return (
    <>
      <Navbar />
      {item ? (
        <>
         {C ? <Placed setC={setC} /> : ""}
          <section className="product_view">
            <div className="product_over ">
              <div className="big_image bg-white">
                <img
                  src={m}
                  className="w-full h-full object-cover"
                  id="big_show"
                  alt="product"
                />
                <div className="little_imgs">
                  <img
                    src={item.mainImage}
                    alt="main"
                    onClick={() => handleImageClick(item.mainImage)}
                  />
                  {item.otherImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`small-img-${index}`}
                      onClick={() => handleImageClick(img)}
                    />
                  ))}
                </div>
              </div>

              <div className="all_details">
            <div className="w-full flex justify-between">
            <h3 className="text-[#144273] uppercase">{item.name}</h3>
            <img src={item.brandLogo} alt="" className="w-20 h-20 cursor-pointer object-cover" onClick={()=>{window.location.href = `/shop?diection=${item.marques}`}} title={item.marques} />
            </div>
                <span className="disc">{item.description}</span>
                <div className="price_and_ava">
                  <div className="price">
                    <div className="current_price">{item.currentPrice} TND</div>
                   {
                    item.discount > 0 ?  <div className="old_price">{item.oldPrice} TND</div> : null
                   }
                  </div>
                  <div className="av" id="avail">
                    {item.stock > 0 ? "En Stock" : "Rupture de stock"}
                  </div>
                </div>
                <div className="panier_fav_qaun">
                  <div className="quan">
                    <p>Quantité :</p>
                    <div className="input_quan">
                      <i className="fas fa-minus" onClick={()=>{setQ(q-1)}}></i>
                      <input type="number" min="1" defaultValue="1" id="quanti" value={q} onChange={(e:any)=>{setQ(e.target.value)}} />
                      <i className="fas fa-plus" onClick={()=>setQ(q+1)}></i>
                    </div>
                  </div>
                  <div className="panier_fav_btns">
                    <button className="p_btns" id="p_btns" onClick={()=>{
                      addToCart2(item,q)
                      setC(true)
                    }}>
                      <i className="ri-shopping-cart-line"></i>Ajouter Au panier
                    </button>
                    <button>
                      <i className="ri-heart-line"></i>Ajouter Au Favorite
                    </button>
                  </div>
                  {item.point > 0 ? (
                    <div className="note">
                      En achetant ce produit, vous pouvez gagner jusqu'à {item.point} points de fidélité. Le total de votre panier sera {item.point} points qui peut être converti en un bon de {(item.point * Number(merci)).toFixed(3)} TND.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <div className="w-full p-5 flex flex-col">
            <div className="w-full bg-white shadow-sm h-full flex flex-col">
              <div className="switch-buttons">
                <ul className="hhhhxx flex bg-white">
                  {['Description', 'Avis'].map(tab => (
                    <li
                      key={tab}
                      className={`sw-btn new_btn justify-center text-center ${tab.toLowerCase().replace(/ /g, '_')}_btn ${activePromoTab === tab ? 'active' : ''}`}
                      onClick={() => setActivePromoTab(tab)}
                    >
                      <span>{tab} {tab == "Avis" ? <i>({Reviews.length})</i> : null } </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full flex flex-col">
              {activePromoTab === 'Description' ? (
          <MyComponent full = {item.fullDisctiption} />
              ) : activePromoTab === "Avis" ? (
                <div className="w-full flex flex-col gap-2 p-4 bg-white">
                  {Reviews ? (
                    <div className="w-full flex flex-col gap-2">
                      {Reviews.map((review :any, index :any) => (
                 (
                          <div key={index} className="review-item w-full bg-gray-200 p-3 rounded-md">
                       <div className="w-full flex gap-2">
                        <img src={"/src/assets/user.png"} alt={`prf-${index}`}  className="w-10 h-10 rounded-full  " />
                      <div className="w-full flex flex-col"> <h4>{review.data.username}</h4>
                      <p> at {review.date}</p></div>
                       </div>
                          
                           
                            <div className="flex">
                              {renderStars(review.data.rating)}
                            </div>
                            <p>{review.data.comment}</p>
                          </div>
                        ) 
                      ))}
                    </div>
                  ) : (
                    <p>No reviews yet for this Product</p>
                  )}
                </div>
              ) : null}
            </div>
            <form onSubmit={handelreviews} className="w-full flex-col flex p-5 gap-3 bg-white">
              <label htmlFor="name">Votre Nom :</label>
              <input
                type="text"
                name="name"
                value={name}
                className="w-full p-2 bg-gray-100 rounded-sm outline-none border-none"
                onChange={handleNameChange}
                placeholder="John Doe"
                required
              />

              <div className="flex flex-col gap-3">
                <label>Notation:</label>
                <div className="flex gap-3">
                  {renderStars(rating)}
                </div>
              </div>

              <div className="flex gap-2 flex-col">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  className="w-full p-2 bg-gray-100 rounded-sm outline-none border-none"
                  onChange={handleEmailChange}
                  placeholder="Votre email adresse"
                  required
                />
              </div>

              <textarea
                name="reviewText"
                className="w-full bg-gray-100 rounded-sm p-2 outline-none border-none"
                value={reviewText}
                onChange={handleReviewChange}
                placeholder="Ajouter un commentaire ..."
                rows={10}
              />
              
              <button type="submit" disabled = {ls} className="bg-[#144273] p-2 text-white outline-none border-none rounded-md cursor-pointer">{ls ?'loading ..' : 'Submit' }</button>
            </form>
          </div>
        </>
      ) : null}

      <BrandsLinks />
      <Footer />
    </>
  );
};

export default Produit;
