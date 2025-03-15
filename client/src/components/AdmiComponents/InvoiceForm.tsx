import React, { useState } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
type InvoiceItem = {
  service: string;
  description: string;
  rate: number;
  qty: number;
};

type InvoiceData = {
  date: string;
  invoiceNo: any;
  invoicedTo: string[];
  payTo: string[];
  items: InvoiceItem[];
  subTotal: number;
  tax: number;
  total: number;
  status: string;
  type : string, }

const InvoiceForm = ({ count ,setCreate}: any) => {
const [Dis,setDis] = useState(true)
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    type : '',
    date: "",

    invoiceNo: Number(count + 1),
    invoicedTo: ["", ""],
    payTo: ["", ""],
    items: [{ service: "", description: "", rate: 0, qty: 0 }],
    subTotal: 0,
    tax: 0,
    total: 0,
    status: "Pending", // Default status
  });

  const handleInvoiceDataChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const value = e.target.value;
    setInvoiceData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleInvoicedToChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    setInvoiceData((prevData) => {
      const updatedInvoicedTo = [...prevData.invoicedTo];
      updatedInvoicedTo[index] = value;
      return { ...prevData, invoicedTo: updatedInvoicedTo };
    });
  };

  const handlePayToChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    setInvoiceData((prevData) => {
      const updatedPayTo = [...prevData.payTo];
      updatedPayTo[index] = value;
      return { ...prevData, payTo: updatedPayTo };
    });
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    const value = e.target.value;
    const updatedItems = [...invoiceData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setInvoiceData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleAddItem = () => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { service: "", description: "", rate: 0, qty: 0 }],
    }));
  };

  const calculateSubTotal = () => {
   
    return invoiceData.items.reduce((acc, item) => acc + Number(item.rate) * Number(item.qty), 0);

  };

  const calculateTotal = () => {
    const subTotal = calculateSubTotal();

    return Number(subTotal) + Number(invoiceData.tax);
  };
const setupData = ()=>{
  setInvoiceData((prevData) => ({
    ...prevData,
    subTotal: calculateSubTotal(),

    total: calculateTotal(),

  }));
  setDis(false)
  
}
const [suck,setSuck] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
    
 const res =      await axios.post(`${baseUrl}/invoices`, invoiceData);
     if(res.data.message){
      setSuck(true)
     }
    } catch (error) {
      console.error("Error submitting invoice:", error);
      alert("There was an error submitting the invoice.");
    }
  };

  return (
    <>
 <div className="w-full bg-[rgba(0,0,0,0.5)] absolute h-fit flex top-0 left-0 z-20 justify-center items-center p-3 min-h-[100vh]">
 {suck ?
  <div className="fixed w-full h-full bg-[rgba(0,0,0,0.5)] top-0 left-0 flex justify-center items-center flex-col gap-2">
<div className="bg-white p-2 rounded-sm shadow-sm dark:bg-gray-900 flex flex-col gap-3">
<p >Invoice Submitted succesfully</p>
<button className="w-full bg-blue-500 text-white p-2 rounded-sm cursor-pointer" onClick={()=>window.location.reload()
}>Got it</button>
</div>
  </div> : null
 }
 <div className="invoice-form bg-white dark:bg-gray-800 p-6 flex gap-3 w-full h-full rounded-md shadow-lg ">
        <form onSubmit={handleSubmit} className="h-full">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Create Invoice</h2>


<label htmlFor="type" className="dark:text-gray-300 text-gray-700">Type :</label>
<input type="text" name="type" id="type" placeholder="Type of service" value={invoiceData.type} onChange={(e:any)=>{handleInvoiceDataChange(e,'type')}} list="types" className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white mt-2 mb-2 " />
         
         <datalist id="types">
          <option value="sale">Sale</option>
          <option value="product">Product</option>
          <option value="service">Service</option>
          <option value="other">Other</option>
         </datalist>
          <div className="w-full grid grid-cols-2 gap-2">
            <label className="block text-gray-700 dark:text-gray-300">Date:</label>
            <input
              type="date"
              value={invoiceData.date}
              onChange={(e) => handleInvoiceDataChange(e, "date")}
              className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            />

            <label className="block text-gray-700 dark:text-gray-300">Invoice No:</label>
            <input
              type="text"
              disabled
              value={invoiceData.invoiceNo}
              onChange={(e) => handleInvoiceDataChange(e, "invoiceNo")}
              className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            />

            <div className="w-full flex flex-col gap-3">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Invoiced To:</h3>
              {invoiceData.invoicedTo.map((line, index) => (
                <input
                  key={index}
                  type="text"
                  value={line}
                  onChange={(e) => handleInvoicedToChange(e, index)}
                  placeholder={`Line ${index + 1}`}
                  className="w-full p-3 mb-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
              ))}
            </div>

            <div className="w-full flex flex-col gap-3">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Pay To:</h3>
              {invoiceData.payTo.map((line, index) => (
                <input
                  key={index}
                  type="text"
                  value={line}
                  onChange={(e) => handlePayToChange(e, index)}
                  placeholder={`Line ${index + 1}`}
                  className="w-full p-3 mb-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
              ))}
            </div>

           
            <div className="w-full flex flex-col gap-3">
              <label className="block text-gray-700 dark:text-gray-300">Status:</label>
              <select
                value={invoiceData.status}
                onChange={(e :any) => handleInvoiceDataChange(e, "status")}
                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="w-full flex flex-col gap-3" >
            <label className="block text-gray-700 dark:text-gray-300">Tax:</label>
    <input type="number"   className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
     placeholder="tax" value={invoiceData.tax} onChange={(e)=>{handleInvoiceDataChange(e,'tax')}} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Items:</h3>
            {invoiceData.items.map((item, index) => (
              <div key={index} className="flex gap-4 items-center mb-4">
                <input
                  type="text"
                  value={item.service}
                  onChange={(e) => handleItemChange(e, index, "service")}
                  placeholder="Service"
                  className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(e, index, "description")}
                  placeholder="Description"
                  className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) => handleItemChange(e, index, "rate")}
                  placeholder="Rate"
                  className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleItemChange(e, index, "qty")}
                  placeholder="Quantity"
                  className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
            ))}
          </div>

          <div className="flex  items-center gap-3">
            <button
              type="button"
              onClick={handleAddItem}
              className="px-4 py-2 w-full bg-blue-500 text-white rounded-sm hover:bg-blue-600"
            >
              Add Item
            </button>
            <button
              type="button"
              className="px-6 py-2 w-full bg-emerald-600 text-white rounded-sm hover:bg-green-600"
              onClick={()=>{setupData()}}
            >
              Generate Invoice
            </button>
            <button type="submit" disabled= {Dis} className={`w-full  text-white p-2 rounded-sm ${Dis? 'cursor-not-allowed bg-gray-700' : "cursor-pointer bg-blue-500"}`}>Save</button>
          </div>
        </form>

        <div className="invoice-preview  p-4 bg-gray-100 w-[30%] dark:bg-gray-900 h-full rounded-md">
        <button className="w-full p-2 bg-gray-600 text-white rounded-sm mb-3 hover:bg-gray-800" onClick={()=>{setCreate('view')}}>Cancel</button> 
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Invoice Preview:</h3>
          <p className="text-gray-700 dark:text-gray-300">Date: {invoiceData.date}</p>
          <p className="text-gray-700 dark:text-gray-300">Invoice No: {invoiceData.invoiceNo}</p>
          <p className="text-gray-700 dark:text-gray-300">Invoiced To: {invoiceData.invoicedTo.join(", ")}</p>
          <p className="text-gray-700 dark:text-gray-300">Pay To: {invoiceData.payTo.join(", ")}</p>

          <h4 className="text-gray-700 dark:text-gray-300">Items:</h4>
          <ul>
            {invoiceData.items.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {item.service} - {item.description} - TND {item.rate} x {item.qty} = {item.rate * item.qty} TND
              </li>
            ))}
          </ul>

          <p className="text-gray-700 dark:text-gray-300">Sub Total: {invoiceData.subTotal} TND</p>
          <p className="text-gray-700 dark:text-gray-300">Tax: {invoiceData.tax} TND</p>
          <p className="text-gray-700 dark:text-gray-300">Total: {invoiceData.total} TND</p>
        </div>
   
      </div>
      
 </div>
    </>
  );
};

export default InvoiceForm;
