

  


type InvoiceItem = {
  service: string;
  description: string;
  rate: number;
  qty: number;
};

type InvoiceData = {
  date: string;
  invoiceNo: string;
  invoicedTo: string[];
  payTo: string[];
  items: InvoiceItem[];
  subTotal: number;
  tax: number;
  total: number;
  Discount : any;
  Gratuit : any,
};

const Invoice = ({ data }: { data: InvoiceData }) => {
  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="invoice-wrapper" id="print-area">
      <div className="invoice">
        <div className="invoice-container">
          <div className="invoice-head">
            <div className="invoice-head-top">
              <div className="invoice-head-top-left text-start">
                <img src="/logo.png" alt="Company Logo" />
              </div>
              <div className="invoice-head-top-right text-end">
                <h3>Invoice</h3>
              </div>
            </div>
            <div className="hr"></div>
            <div className="invoice-head-middle">
              <div className="invoice-head-middle-left text-start">
                <p><span className="text-bold">Date:</span> {data.date}</p>
              </div>
              <div className="invoice-head-middle-right text-end">
                <p><span className="text-bold">Invoice No:</span> {data.invoiceNo}</p>
              </div>
            </div>
            <div className="hr"></div>
            <div className="invoice-head-bottom">
              <div className="invoice-head-bottom-left">
                <ul>
                  <li className="text-bold">Invoiced To:</li>
                  {data.invoicedTo.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="invoice-head-bottom-right">
                <ul className="text-end">
                  <li className="text-bold">Pay To:</li>
                  {data.payTo.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="overflow-view">
            <div className="invoice-body">
              <table>
                <thead>
                  <tr>
                    <td className="text-bold">Service</td>
                    <td className="text-bold">Description</td>
                    <td className="text-bold">Rate</td>
                    <td className="text-bold">QTY</td>
                    <td className="text-bold">Amount</td>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.service}</td>
                      <td>{item.description}</td>
                      <td>{item.rate} TND </td>
                      <td>{item.qty}</td>
                      <td className="text-end">{item.rate} TND</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="invoice-body-bottom">
                <div className="invoice-body-info-item border-bottom">
                  <div className="info-item-td text-end text-bold">Sub Total:</div>
                  <div className="info-item-td text-end">{data.subTotal.toFixed(3)} TND</div>
                </div>
                <div className="invoice-body-info-item border-bottom">
                  <div className="info-item-td text-end text-bold">Tax / laivraison:</div>
                  <div className="info-item-td text-end">{data.subTotal > data.Gratuit && data.Gratuit>0 ? 0 : Number(data.tax).toFixed(3) } TND</div>
                </div>
                {
                  data.Discount > 0 ?  <div className="invoice-body-info-item border-bottom">
                  <div className="info-item-td text-end text-bold">Discount:</div>
                  <div className="info-item-td text-end">{data.Discount.toFixed(3)} TND</div>
                </div>: <>
                  </>
                }
                <div className="invoice-body-info-item">
                  <div className="info-item-td text-end text-bold">Total:</div>
               {data.Discount > 0 ?    <div className="info-item-td text-end">{((data.total > data.Gratuit && data.Gratuit >0 ? data.total - data.tax : data.total) - data.Discount).toFixed(3) } TND</div> : 
                  <div className="info-item-td text-end">{data.total > data.Gratuit && data.Gratuit > 0 ? (data.total- Number( data.tax)).toFixed(3) : data.total.toFixed(3)} TND</div>}
                </div>
              </div>
            </div>
          </div>
          <div className="invoice-foot text-center">
            <p>
              <span className="text-bold text-center">NOTE:&nbsp;</span>
              This is a computer-generated receipt and does not require a physical signature.
            </p>
            <div className="invoice-btns">
              <button type="button" className="invoice-btn" onClick={printInvoice}>
                <span>
                  <i className="fa-solid fa-print"></i>
                </span>
                <span>Print</span>
              </button>
              <button type="button" className="invoice-btn">
                <span>
                  <i className="fa-solid fa-download"></i>
                </span>
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
