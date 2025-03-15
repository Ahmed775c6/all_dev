
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";

const  handelRemove =async (id : string, uid : string)=>{
  try{
    console.log(id,uid)
const res = await axios.post(`${baseUrl}/removeFromFav`,{id:id,uid:uid});
if(res.data.message){
  window.location.reload();
}else{
  console.log(res.data);
}
  }catch(err){
console.log(err)
alert('something went wrong refresh and try again')
  }
}
const Wishlist = ({ products ,uid} : any) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold p-2">List de souhait</h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full w-full bg-white shadow-lg rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
              <th className="p-4">Image</th>
              <th className="p-4">Nom</th>
              <th className="p-4">Prix</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product : any) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition cursor-pointer"
                onClick={() => navigate(`/ViewProduct?id=${product._id}`)}
              >
                <td className="p-4">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="p-4 text-gray-900 font-medium">{product.name}</td>
                <td className="p-4 text-blue-600 text-lg font-semibold">{product.currentPrice} TND</td>
                <td className="p-4">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                    onClick={async(e) => {
                      e.stopPropagation();
                      await handelRemove(product._id,uid)
                
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;