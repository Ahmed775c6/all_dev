import { useState } from 'react';

interface ProductSummary {
  totalRevenue: number;
  totalSold: number;
  name: string;
  id: string;
}

export const RankTb = ({ data }: { data: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 15;

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
    .sort((a: any, b: any) => b.totalRevenue - a.totalRevenue);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = bestProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bestProducts.length / itemsPerPage);

  return (
    <div className="product-tables bg-white dark:bg-gray-900 w-full relative p-4 rounded-md h-[80vh] overflow-auto">
      {/* Products Table */}
      <h2 className="w-full bg-gray-200 text-black dark:text-white dark:bg-gray-600 p-2 rounded-t-md">Products</h2>
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
              currentProducts.map((product: any, index) => (
                <tr key={product.id} className="hover:bg-gray-100 dark:hover:bg-gray-800" style={{ borderBottom: "1px solid #ccc" }}>
                  <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1} - {product.name}</td>
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

      {/* Pagination Controls */}
      {bestProducts.length > 0 && (
        <div className="flex w-full left-0  p-2 justify-center absolute bottom-0 items-center gap-4 mt-4">
          <button 
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-600 dark:text-white">
            Row {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RankTb;