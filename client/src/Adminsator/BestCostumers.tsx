interface CustomerSummary {
  totalSpent: number;
  totalProducts: number;
  name: string;
  email: string;
  Dis : any,
}

export const CustomerTables = ({ data }: { data: any[] }) => {
  // Process data for best customers

  const bestCustomersMap = data?.reduce((acc, sale) => {
    // Fixed typo in status check
    if (sale.status !== "Dilivired") return acc;

    // Parse items with safety checks
    const items = sale?.data?.items ? JSON.parse(sale.data.items) : [];
    const total = items.reduce((sum: number, item: any) => 
      sum + (item.quantity * item.current_price), 0);
    const totalProducts = items.reduce((sum: number, item: any) => 
      sum + item.quantity, 0);

    // Use correct email path from data
    const customerEmail = sale.data?.req_email;
    if (!customerEmail) return acc;

    // Initialize customer entry if not exists
    if (!acc[customerEmail]) {
      acc[customerEmail] = {
        name: sale.data?.name_req || 'Unknown',
        email: customerEmail,
        totalSpent: 0,
        totalProducts: 0
      };
    }
let dic = 0;
dic += sale.data.utiliste * sale.data.merci;
let l = 0;
l+= sale.data.utiliste;

const total1 = total - dic

    // Accumulate values
    acc[customerEmail].totalSpent += total1;
acc[customerEmail].dic =l;
    acc[customerEmail].totalProducts += totalProducts;
    return acc;
  }, {} as Record<string, CustomerSummary>);

  const bestCustomers = Object.values(bestCustomersMap || {})
    .sort((a : any, b : any) => b.totalSpent - a.totalSpent)
    .slice(0, 10);



  return (
    <div className="customer-tables  bg-white dark:bg-gray-900 w-full p-4 rounded-md h-[80vh] overflow-auto">
      {/* Best Customers Table */}
      <h2 className="w-full jsh bg-gray-200 text-black dark:text-white dark:bg-gray-600">Top 10 Customers</h2>
      <div className="best-customers w-full p-2">
      
        <table className="w-full p-4">
          <thead>
            <tr className="w-full p-3">
         
              <th>Name</th>
              <th>Email</th>
              <th>Total Spent</th>
              <th> Point Used</th>
              <th>Total Products</th>
            </tr>
          </thead>
          <tbody className="w-full ">
        {
          bestCustomers.length > 0 ? <>
              {bestCustomers.map((customer : any, index :any) => (
              <tr key={`${customer.email}-${index}`} className="w-full   " style={{borderBottom : "1px solid #ccc"}}>
             
                <td className="p-3 ">   {    customer.name}</td>
                <td className="p-3 ">{customer.email}</td>
                <td className="p-3 text-center">{customer.totalSpent.toFixed(3)} TND </td>
                <td className="p-3 text-center">{customer.dic}</td>
                <td className="p-3 flex justify-center">{customer.totalProducts}</td>
              </tr>
            ))}
          </> :<>
          No sales made yet
          </>
        }
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default CustomerTables;