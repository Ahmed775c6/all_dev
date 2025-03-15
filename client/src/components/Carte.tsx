import { useState, useEffect } from "react";

interface Item {
  id: string;
  name: string;
  product_image_0: string;
  quantity: number;
  current_price?: number;
}

const Carte = ({ setCaret }: { setCaret: (value: boolean) => void }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedItems = storedCart ? JSON.parse(storedCart) : [];
    setItems(parsedItems);
  }, []);

  // Update total price when items change
  useEffect(() => {
    const newTotal = items.reduce(
      (sum, item) => sum + (item.current_price ?? 0) * item.quantity,
      0
    );
    setTotalPrice(newTotal);
  }, [items]);

  // Function to update item quantity
  const updateQuantity = (id: string, delta: number) => {
    const updatedItems = items.map((item) => {

      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <div className="bg-[rgba(0,0,0,0.5)] w-screen top-0 left-0 z-50  flex fixed h-screen min-h-screen ">
      <div className="absolute flex flex-col  min-w-[30%] lsnxj right-0 max-w-[450px] top-0 bg-white h-full">
        <header className="flex flex-row shadow-sm w-full justify-between bg-[#144273] text-white p-4">
          <div className="w-full flex gap-4">
            <i className="ri-shopping-cart-line"></i>
            <h1 className="text-white">Votre panier</h1>
          </div>
          <i
            className="ri-close-line cursor-pointer mr-4"
            onClick={() => setCaret(false)}
          ></i>
        </header>

        <div className="w-full flex flex-col gap-2 p-2 max-h-[90%] h-[90%] overflow-y-scroll">
          {items.length > 0 ? (
            items.map((item: Item, index: number) => (
              <div
                className="w-full flex p-2 cursor-pointer gap-3 shadow-sm rounded-sm hover:bg-gray-100"
                key={index}
                onClick={()=>{
                  window.location.href = `ViewProduct?id=${item.id}`
                }}
              >
                <img
                  src={item.product_image_0}
                  className="w-20 h-20 rounded-md bg-[var(--bg)] p-1 "
                  alt={item.name}
                />
                <div className="w-full p-2 flex flex-col gap-2">
                  <h2 className="font-semibold text-[var(--ghame9)] uppercase">
                    {item.name}
                  </h2>
                  <p>
                    PRIX: {item.current_price} TND
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-gray-200 px-2 rounded-sm"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="bg-gray-200 px-2 rounded-sm"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center p-4">Your cart is empty.</p>
          )}
        </div>

        <div className="w-full flex flex-col items-center gap-2 p-4">
          <h3 className="text-lg font-semibold p-2 bg-[var(--bg)] w-full">
            Total: {totalPrice.toFixed(3)} TND
          </h3>
          <div className="w-full flex gap-3">
            <a
              href="/cart"
              className="bg-[#144273] w-full flex justify-center text-center p-2 rounded-sm text-white font-semibold cursor-pointer"
            >
              Voir Cart
            </a>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carte;
