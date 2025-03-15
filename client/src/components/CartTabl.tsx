
import { useDispatch } from "react-redux";
import { increment } from "../redux/counter";


const ShoppingCartTable = ({ cartItems, onUpdateQuantity, onRemoveItem } : any) => {
  

  const calculateTotal = () => {
    return cartItems.reduce((total :any, item : any) => total + item.current_price * item.quantity, 0).toFixed(2);
  };
const Dipatch = useDispatch();
  return (
    <div className="shopping-cart-table bg-white">
      <table>
        <thead>
          <tr className="rounded-none bg-[var(--bg)]">
            <th className="font-bold text-[var(--ghame9)]">Product</th>
            <th className="font-bold text-[var(--ghame9)]">Quantity</th>
            <th className="font-bold text-[var(--ghame9)]">Price (TND)</th>
            <th className="font-bold text-[var(--ghame9)]">Subtotal (TND)</th>
            <th className="font-bold text-[var(--ghame9)]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item : any) => (
            <tr key={item.id}>
              <td className="product-details">
                <img src={item.product_image_0} alt={item.name} className="product-image" />
                <div>{item.name}</div>
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                />
              </td>
              <td>{item.current_price}</td>
              <td>{(item.current_price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() =>

                  {
                

                  onRemoveItem(item.id)
                  Dipatch(increment())
                  
                  }} className="p-2 rounded-sm w-10 h-10 text-red-100 bg-red-400 flex justify-center"><i className="ri-delete-bin-line"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total p-2">
        <h3 className="text-[1rem] p-2 font-bold">Total: {calculateTotal()} TND</h3>
      </div>
    </div>
  );
};

export default ShoppingCartTable;
