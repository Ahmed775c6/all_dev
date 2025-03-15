


interface Product {
  id: number;
  name: string;
  description: string;
  product_image_0: string;
  current_price: number;
  old_price: number;
  discount: number;
  Categorie: string;
  sous: string;
  status: boolean;
  stock: number;
  marques : string;
}

interface FilterProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setSousCat: React.Dispatch<React.SetStateAction<string | null>>;
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  setBr : React.Dispatch<React.SetStateAction<string | null>>
  priceRange: [number, number];
  products: Product[];
  Fst : any;
  setFst : any;
}

const Filter: React.FC<FilterProps> = ({ setSelectedCategory,setSousCat,setBr, setPriceRange, priceRange, products , Fst,setFst } ) => {
  const categories = Array.from(new Set(products.map((product) => product.Categorie)));
  const Sous = Array.from(new Set(products.map((product) => product.sous)));
  const Brands = Array.from(new Set(products.map((product) => product.marques)));
  const minPrice = Math.min(...products.map((product) => product.current_price));
  const maxPrice = Math.max(...products.map((product) => product.current_price));

  const handlePriceChange = (index: number, value: number) => {
    setPriceRange((prev) => {
      const newRange: [number, number] = [...prev];
      newRange[index] = value;
      if (newRange[0] > newRange[1]) newRange[index] = prev[index]; // Prevent overlap
      return newRange;
    });
  };
  return (
    <div className="flex transition flex-col h-full w-full bg-white p-4 rounded-sm shadow-sm lxsksj" style={{left : Fst}}>
      
    <i className="absolute top-2 right-2 font-semibold ri-close-line text-lg " onClick={()=>{setFst('-400px')}}>  </i>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Categories</h2>
        <select
          className="w-full p-2 border rounded-sm"
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Sous Categorie</h2>
        <select
          className="w-full p-2 border rounded-sm"
          onChange={(e) => setSousCat(e.target.value || null)}
        >
          <option value="">All </option>
          {Sous.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Brands</h2>
        <select
          className="w-full p-2 border rounded-sm"
          onChange={(e) => setBr(e.target.value || null)}
        >
          <option value="">All </option>
          {Brands.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {/* Price Range Filter */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Price Range</h2>

        <div className="flex flex-col gap-2">
          {/* Min Price Input */}
          <label className="text-sm font-medium text-gray-700">
            Minimum Price: {priceRange[0]} TND
          </label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={1}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            className="w-full"
          />

          {/* Max Price Input */}
          <label className="text-sm font-medium text-gray-700">
            Maximum Price: {priceRange[1]} TND
          </label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={1}
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
