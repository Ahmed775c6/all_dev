import  { useState } from 'react';
import "./ProductForm.css"
const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    gender: '',
    subCategory: '',
    cost: '',
    oldPrice: '',
    currentPrice: '',
    discount: 0,
    description: '',
    available: true,
    hot: false,
    brand: '',
    loyaltyPoints: '',
    storage: '',
    images: Array(5).fill(null), // For handling images
  });

  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e : any) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleFileChange = (index:any, e :any) => {
    const file = e.target.files[0];
    const newImages = [...formData.images];
    newImages[index] = file;
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="main_adding_container">
      <div className="first-adding-row">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="the_main_form">
          <div className="form" id="first_form">
            <div className="section_input">
              <label htmlFor="product_name">Product Name:</label>
              <input
                type="text"
                className="add_input"
                name="productName"
                id="product_name"
                placeholder="Product Name"
                value={formData.productName}
                onChange={handleInputChange}
              />
            </div>

            <div className="two-rows">
              <div className="section_input">
                <label htmlFor="categorie">Category:</label>
                <div className="drop_down">
                  <div className="select">
                    <input
                      type="text"
                      className="selected"
                      placeholder="Select a Category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                    <div className="caret"></div>
                    <ul className="menu">
                      <input type="text" placeholder="search" name="search_cat_selector" />
                      <li>Visage</li>
                      <li>Cheveux</li>
                      <li>Corps</li>
                      <li>Compléments alimentaires</li>
                      <li>Hygiene</li>
                      <li>Solaires</li>
                      <li>Bio Et Nature</li>
                      <li>Matériel médical</li>
                      <input type="text" placeholder="+ Add a Category" id="plus_cat" />
                    </ul>
                  </div>
                </div>
              </div>

              <div className="section_input">
                <label htmlFor="pr_gendre">Gendre:</label>
                <div className="drop_down Gendre">
                  <div className="select_sexe">
                    <input
                      type="text"
                      className="selected_sexe"
                      id="pr_gendre"
                      name="gender"
                      placeholder="Select a Gendre"
                      value={formData.gender}
                      onChange={handleInputChange}
                    />
                    <div className="caret_sexe"></div>
                    <ul className="menu_sexe">
                      <li>All</li>
                      <li>MALE</li>
                      <li>FEMALE</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="section_input sous_cat">
              <div className="section_input">
                <label htmlFor="sous">Sous-Categorie:</label>
                <div className="drop_down">
                  <div className="select">
                    <input
                      type="text"
                      className="selected"
                      placeholder="Select a Sous Category"
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleInputChange}
                      style={{ cursor: 'pointer' }}
                    />
                    <div className="caret"></div>
                    <ul className="sous_menu" id="sous_menu"></ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="foor_rows">
              <div className="section_input">
                <label htmlFor="cost">Cost:</label>
                <input
                  type="number"
                  step="any"
                  name="cost"
                  placeholder="Cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                />
              </div>
              <div className="section_input">
                <label htmlFor="old_price">Old Price:</label>
                <input
                  type="number"
                  step="any"
                  name="oldPrice"
                  placeholder="Old Price"
                  id="old_price"
                  required
                  value={formData.oldPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div className="section_input">
                <label htmlFor="current">Dealer Price:</label>
                <input
                  type="number"
                  step="any"
                  name="currentPrice"
                  placeholder="New Price"
                  id="new_price"
                  required
                  value={formData.currentPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div className="section_input">
                <label htmlFor="discount">Discount:</label>
                <input
                  type="number"
                  step="any"
                  name="discount"
                  placeholder="Discount %"
                  id="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="section_input">
              <label htmlFor="discription">Description:</label>
              <textarea
                name="description"
                id="discription"
                cols={30}
                rows={0}
                placeholder="Description..."
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button type="button" className="next" id="first_info_btn">
              Next
            </button>
          </div>

          <div className="form" style={{ display: 'none' }} id="dez_form">
            <div className="checkbox" style={{ display: 'flex', gap: '20px' }}>
              <label htmlFor="available">Availability:</label>
              <input
                type="checkbox"
                className="checkbox"
                value={1}
                name="available"
                id="available"
                checked={formData.available}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="hot">Hot:</label>
              <input
                type="checkbox"
                className="checkbox"
                value={0}
                name="hot"
                id="hot"
                checked={formData.hot}
                onChange={handleCheckboxChange}
              />
            </div>

            <div className="z" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <div className="section_input">
                <label htmlFor="brand">Brand:</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  id="brand"
                  required
                  value={formData.brand}
                  onChange={handleInputChange}
                />
              </div>
              <div className="section_input">
                <label htmlFor="pts">Points de fidélité:</label>
                <input
                  type="text"
                  name="loyaltyPoints"
                  placeholder="Points de fidélité"
                  id="pts"
                  required
                  value={formData.loyaltyPoints}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="section_input">
              <label htmlFor="stockage">Stockage:</label>
              <input
                type="number"
                name="storage"
                placeholder="Stockage"
                id="stockage"
                required
                value={formData.storage}
                onChange={handleInputChange}
              />
            </div>

            <div className="container2">
              <input
                type="file"
                id="file0"
                className="file0"
                accept="image/*"
                name="file0"
                hidden
                onChange={(e) => handleFileChange(0, e)}
              />
              <div className="img-area" id="img-area-0" data-img="">
                <i className='bx bxs-cloud-upload icon'></i>
                <h3>Upload Image</h3>
              </div>
              <button className="select-image" id="0" type="button">
                Select Image
              </button>
            </div>

            <div className="next_section">
              <button type="submit" id="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
