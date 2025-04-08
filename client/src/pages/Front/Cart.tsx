import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ShoppingCartTable from "../../components/CartTabl";
import ByingPopup from "../../components/ByingPopup";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Define a type for cart items
interface CartItem {
  _id: string;
  name: string;
  current_price: number;
  quantity: number;
  product_image_0: string;
  id :string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Typed cart items
  const [Bying, setBying] = useState<boolean>(false);
  const [lv,setLV] = useState<any>(0);
  const [merci,setMerci] = useState<any>({})
  const [Gratuit,setGratuit] = useState<any>(0);
const [MPLayut,setMBLayout] = useState(false)
  useEffect(()=>{
    const F = async()=>{
      const res = await axios.get(`${baseUrl}/lvs`);
    
      if(res){
        setLV(res.data.message.lv);
        setMerci({
          lv : res.data.message.lv,
         mrc : res.data.message.merci,
       
        })
        setGratuit(res.data.message.Gratuit)
     
        
      }
    
    } 
     F();
      },[])

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []); // Run once on mount

  // Update item quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {

    setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      );

      // Update localStorage with the new cart items
      localStorage.setItem('cart', JSON.stringify(updatedItems));

      return updatedItems; // Return the updated items
    });
  };

  // Remove an item from the cart
  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId); // Consistent ID usage
  
      // Update localStorage with the new cart items
      localStorage.setItem('cart', JSON.stringify(updatedItems));

      return updatedItems; // Return the updated items
    });
  };

  // Calculate total price of items in the cart
  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.current_price * item.quantity, 0);
  };



  return (
    <>
    {MPLayut ? <div className="bg-[rgba(0,0,0,0.5)]  w-screen justify-center items-center top-0 left-0 z-50  flex fixed h-screen min-h-screen ">
      <div className={`box-dachat  relative `} >
          <div className="request-form">
            <h3>Votre Panier</h3>
            <span className="ri-close-line absolute right-7 text-xl cursor-pointer " onClick={()=>{setMBLayout(false)}}></span>
            <div className="panne">
              <span id="total_items">{cartItems.length} Article(s)</span>
              <span id="total_prix">{calculateTotal()} TND</span>
            </div>
            <div className="w-full flex flex-col gap-3">
              {cartItems.map((item) => (
                <div className="panne" key={item._id}>
                  <span>{item.quantity} {item.name}</span>
                  <span>{item.current_price} TND</span>
                </div>
              ))}
            </div>

            <div className="panne">
              <span>Laivraison</span>
              <span id="laivraison">{Gratuit < calculateTotal() ? 0 : lv} TND</span>
            </div>
            <div className="panne bold">
              <span className="total">Total TTC </span>
              <span id="show_total">{calculateTotal() > 0 && calculateTotal() < Gratuit? calculateTotal() + Number(lv) : calculateTotal()>0 && calculateTotal() > Gratuit ? calculateTotal() : 0} TND</span>
            </div>
            <button className="btn" onClick={() => { setBying(true); }}>Commander</button>
          </div>
        </div>
    </div> : ""}
      {Bying ? <ByingPopup setBying={setBying} amount = {calculateTotal()} ob = {merci} /> : ''}
      <Navbar />

      <div className="w-full flex gap-3 p-4">
        <div className="w-full ">
          <ShoppingCartTable
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            setCommand = {setMBLayout}
          /> 
        </div>
       
        <div className={`box-dachat posw `} >
          <div className="request-form">
            <h3>Votre Panier</h3>
    
            <div className="panne">
              <span id="total_items">{cartItems.length} Article(s)</span>
              <span id="total_prix">{calculateTotal()} TND</span>
            </div>
            <div className="w-full flex flex-col gap-3">
              {cartItems.map((item) => (
                <div className="panne" key={item._id}>
                  <span>{item.quantity} {item.name}</span>
                  <span>{item.current_price} TND</span>
                </div>
              ))}
            </div>

            <div className="panne">
              <span>Laivraison</span>
              <span id="laivraison">{Gratuit < calculateTotal() ? 0 : lv} TND</span>
            </div>
            <div className="panne bold">
              <span className="total">Total TTC </span>
              <span id="show_total">{calculateTotal() > 0 && calculateTotal() < Gratuit? calculateTotal() + Number(lv) : calculateTotal()>0 && calculateTotal() > Gratuit ? calculateTotal() : 0} TND</span>
            </div>
            <button className="btn" onClick={() => { setBying(true); }}>Commander</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
