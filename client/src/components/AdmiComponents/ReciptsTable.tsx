import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
type Receipt = {
    invoiceNo: string;
  date: string;
  invoicedTo: any;
  total: number;
  Discount : any,
  status: string;
  Gratuit : any,
  tax : any,
};

const ReceiptsTable = ({ data }: any) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [receipts, setReceipts] = useState<Receipt[]>(data);

  const handleDelete = async (receiptNo: string) => {
    try {
      await axios.post(`${baseUrl}/delete-receipt`, { invoiceNo: receiptNo });
  
      // Remove deleted receipt from state
      const updatedReceipts = receipts.filter((receipt) => receipt.invoiceNo !== receiptNo);
      setReceipts(updatedReceipts);
    } catch (error) {
      console.error("Error deleting receipt:", error);
    }
  };


  const handleChangeStatus = async (receiptNo: string) => {
    try {
      const updatedReceipts = receipts.map((receipt) =>
        receipt.invoiceNo === receiptNo
          ? { ...receipt, status: receipt.status === "Paid" ? "Pending" : "Paid" }
          : receipt
      );
  
      // Find the updated receipt to send to the server
      const updatedReceipt = updatedReceipts.find(
        (receipt) => receipt.invoiceNo === receiptNo
      );
  
      if (!updatedReceipt) return;
  
      // Send the new status to the backend
      await axios.post(`${baseUrl}/updateInvokestatus`, {
        invoiceNo: receiptNo,
        status: updatedReceipt.status,
      });
  
      // Update state after a successful request
      setReceipts(updatedReceipts);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleView = (receiptNo: string) => {
    // Find the specific receipt data by receiptNo
    const selectedReceipt = receipts.find((receipt) => receipt.invoiceNo === receiptNo);
    if (selectedReceipt) {
      // Navigate to the /invoice page and pass the selected receipt data in the state
      navigate("/receipts", { state: { receipt: selectedReceipt } });
    }
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-none bg-white dark:bg-gray-800">
      <table className="w-full table-auto text-left">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Receipt No</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Invoiced To</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{receipt.invoiceNo}</td>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{receipt.date}</td>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{receipt.invoicedTo.map((item :any)=>(item + ' '))}</td>
       {receipt.Discount > 0 ?        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{(( receipt.total > receipt.Gratuit && receipt.Gratuit >0 ?receipt.total -receipt.tax : receipt.total  ) - receipt.Discount).toFixed(3)} TND </td> :        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{receipt.total > receipt.Gratuit && receipt.Gratuit > 0? (receipt.total - receipt.tax).toFixed(3) : receipt.total.toFixed(3)} TND </td>}
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    receipt.status === "Paid" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                  }`}
                >
                  {receipt.status}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                <button
                  className="text-blue-500 mr-3"
                  onClick={() => handleView(receipt.invoiceNo)} // Handle view click
                >
                  View
                </button>
                <button
                  className="text-red-500 mr-3"
                  onClick={() => handleDelete(receipt.invoiceNo)}
                >
                  Delete
                </button>
                <button
                  className="text-yellow-500"
                  onClick={() => handleChangeStatus(receipt.invoiceNo)}
                >
                  Change Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptsTable;
