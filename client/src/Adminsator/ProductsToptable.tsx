interface ProductSummary {
    totalRevenue: number;
    totalSold: number;
    name: string;
    id: string;
  }
  
  export const ProductTables = ({ data }: { data: any[] }) => {
    // Process data for best products
    const bestProductsMap = data?.reduce((acc, sale) => {
      if (sale.status !== "Dilivired") return acc;

      const items = sale?.data?.items ? JSON.parse(sale.data.items) : [];
      items.forEach((item: any) => {
        const productId = item.id;
        const productName = item.name;
        const quantity = item.quantity;
        const price = item.current_price;
        const revenue = quantity * price;
  
        if (!productId) return;
  
        if (!acc[productId]) {
          acc[productId] = {
            name: productName || 'Unknown Product',
            id: productId,
            totalRevenue: 0,
            totalSold: 0
          };
        }
  
        acc[productId].totalRevenue += revenue;
        acc[productId].totalSold += quantity;
      });
  
      return acc;
    }, {} as Record<string, ProductSummary>);
  
    const bestProducts = Object.values(bestProductsMap || {})
      .sort((a : any, b : any) => b.totalRevenue - a.totalRevenue)
      .slice(0, 10);
  
    return (
      <div className="product-tables bg-white dark:bg-gray-900 w-full p-4 rounded-md h-[80vh] overflow-auto">
        {/* Best Products Table */}
        <h2 className="w-full jsh bg-gray-200 text-black dark:text-white dark:bg-gray-600">Top 10 Products</h2>
        <div className="best-products w-full p-2">
          <table className="w-full">
            <thead>
                <tr>
                <th>Product Name</th>
                <th>Product ID</th>
                <th>Total Revenue</th>
                <th>Total Sold</th>
              </tr>
            </thead>
            <tbody>
              {bestProducts.length > 0 ? (
                bestProducts.map((product : any, index) => (
                  <tr key={product.id} className="hover:bg-gray-100 dark:hover:bg-gray-800" style={{ borderBottom: "1px solid #ccc" }}>
                    <td className="p-3">{index + 1} - {product.name}</td>
                    <td className="p-3 text-center">{product.id}</td>
                    <td className="p-3 text-center">{product.totalRevenue.toFixed(2)} TND</td>
                    <td className="p-3 text-center">{product.totalSold}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-3 text-center">
                    No products sold yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default ProductTables;