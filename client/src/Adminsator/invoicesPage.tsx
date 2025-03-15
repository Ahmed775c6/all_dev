import { useLocation } from "react-router-dom"; 
import Invoice from "./Recits";
const InvoicePage = () => {
  const location = useLocation();
  const { receipt } = location.state || {}; 
  if (!receipt) {
    return <div>No receipt data available.</div>;
  }

  return (
    <div>
   <Invoice data={receipt} />
    </div>
  );
};

export default InvoicePage;
