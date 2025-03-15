
const ProductOverView = ({ image, name, description, currentPrice, oldPrice, discountPercentage, imageInputs,brandLogo }: any) => {

  return (
    <>
      <div className="w-full h-full flex flex-col gap-3 bg-gray-300 dark:bg-gray-800 rounded-md shadow-lg p-3 max-w-[25%] loi">
        <h4 className="font-bold text-white dark:text-white">Product Overview</h4>
        <div className="product2 dark:bg-gray-500 ">
          <div className="product_img w-[260px] h-[350px] koi">
            <img src={image} alt={name} />
          </div>
          <div className="product_content">
            <div className="title_dis">
              <p className="item_title text-black dark:text-white">{name}</p>
              <span className="text-black dark:text-gray-300">{description}</span>
            </div>
            <div className="price_pource">
              <div className="price">
                <div className="current_price text-black dark:text-white">{currentPrice} TND</div>
             {
              discountPercentage > 0 ?    <div className="old_price text-gray-500 dark:text-white">{oldPrice} TND</div>: null
             }
              </div>
         {
          discountPercentage > 0 ?      <span className="purcentage absolute top-10 left-10 z-20 bg-rose-100 text-rose-500 px-2 rounded-full text-xs font-medium">
         ⚡ {discountPercentage}%
        </span> : null
         }
            </div>
          </div>
        </div>
        <div className="w-full rounded-sm h-full bg-gray-700 dark:bg-gray-600 p-4 flex flex-col gap-3">
          {imageInputs.map((item: any, index: any) => (
            <img key={index} src={item} alt={`item-${index}`} className="w-[250px] h-[250px] object-cover" />
          ))}
        </div>
        {
          <img src={brandLogo} alt="" />
        }
      </div>
    </>
  );
};

export default ProductOverView;
