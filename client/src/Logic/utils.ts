

export const addToCart = (product: any) => {
  const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = storedCart.find((item: any) => item.id === product._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    storedCart.push({
      id: product._id, 
      name: product.name,
      product_image_0: product.mainImage, 
      quantity: 1,
      current_price: product.currentPrice, 
    });
 

  }

  localStorage.setItem('cart', JSON.stringify(storedCart));
};
export const addToCart2 = (product: any, q:any) => {
  const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = storedCart.find((item: any) => item.id === product._id);

  if (existingItem) {
    existingItem.quantity = q || existingItem.quantity + 1;
  } else {
    storedCart.push({
      id: product._id, // ✅ Ensure it uses `_id` from the product
      name: product.name,
      product_image_0: product.mainImage, // ✅ Use `mainImage`
      quantity: q || 1,
      current_price: product.currentPrice, // ✅ Match field name
    });
  }

  localStorage.setItem('cart', JSON.stringify(storedCart));
};
