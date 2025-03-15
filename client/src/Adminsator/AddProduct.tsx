import { useState, useEffect } from "react";
import Nav from "../components/AdmiComponents/Nav";
import { Trash2 } from "lucide-react";

import ProductOverView from "../components/AdmiComponents/ProductOverView";
import { handelUpload, handleUploadMulti } from "../Logic/UploadFile";
import TaskLoader from "../components/AdmiComponents/TaskLoader";
import { SuccessLabel, ErrorLabel } from "../components/labels";
import axios from "axios";
import Themes from "../components/AdmiComponents/Themes";
import Aside from "../components/AdmiComponents/Aside";
import MyEditor from "../components/TextEditor";

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const AddProduct = () => {
  const [Changing,setChanging] = useState(false);
  const [AsideT, setAside] = useState(false);

  const [theme,setTheme] = useState<string | any>(localStorage.getItem('theme'));

  const [brandsList, setBrandsList] = useState<any[]>([]);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  }, [theme]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${baseUrl}/brands`);
        setBrandsList(response.data.message);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);
  // Get theme and themeColor from localStorage or default to "light" and a default color
 // Add this line

  const [step, setStep] = useState("1");
  const [taskLoader, setTask] = useState(false);
  const [Categorie, setCategories] = useState("");
  const [sous, setSous] = useState("");
  const [name, setName] = useState("");
  const [smsg, setsmg] = useState(false);
  const [emsg, setemsg] = useState(false);
  const [image, setImage] = useState<any>("/src/assets/empty.jpg");
  const [imageSend, setImageSend] = useState<File | any>(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [cost, setCost] = useState(0);
  const [newID, setnewID] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState(
    "Sample product description goes here."
  );
  const [Docu,setDocu] = useState('');
  const [marques, setMarques] = useState("");
  const [point, setPoint] = useState(0);
  const [imageInputs, setImageInputs] = useState<any[]>([]);
  const [imageInputsend, setImageInputsend] = useState<File | any>([]);
  const [brandImage, setBrandImage] = useState<any>("/src/assets/empty.jpg");
  const [brandImageSend, setBrandImageSend] = useState<File | any>(null);

  const resetForm = () => {
    setStep("1");
    setCategories("");
    setSous("");
    setName("");
    setImage("/src/assets/empty.jpg");
    setImageSend(null);
    setCurrentPrice(0);
    setOldPrice(0);
    setDiscountPercentage(10);
    setCost(0);
    setStock(0);
    setDescription("Sample product description goes here.");
    setMarques("");
    setPoint(0);
    setImageInputs([]);
    setImageInputsend([]);
  };

  const addImageInput = () => {
    setImageInputs([...imageInputs, ""]);
    setImageInputsend([...imageInputsend, ""]);
  };

  const removeImageInput = (index: number) => {
    setImageInputs(imageInputs.filter((_, i) => i !== index));
    setImageInputsend(imageInputsend.filter((_: any, i: any) => i !== index));
  };

  const handelAddPr = async (e: React.FormEvent) => {
    e.preventDefault();
    setTask(true);
    const isExistingBrand = brandsList.some(brand => brand.name === marques);
    let brandLogoUrl = '';

    if (!isExistingBrand) {
      if (!brandImageSend) {
        console.error("Please upload a logo for the new brand");
        setTask(false);
        return;
      }
      
      const brandLogoResult = await handelUpload(brandImageSend);
      if (!brandLogoResult?.status) {
        console.error("Brand logo upload failed");
        setTask(false);
        return;
      }
      
      
      brandLogoUrl = brandLogoResult.link;
      
      // Create new brand in database
      await axios.post(`${baseUrl}/add_brand`, {
        name: marques,
        logo: brandLogoUrl
      });
    }
    const mainImageFile = imageSend ? imageSend : null;
    const otherImageFiles = imageInputsend.filter((file: File) =>
      file ? File : null
    );

    if (!mainImageFile || otherImageFiles.length === 0) {
      console.error("Please upload at least one main image and additional images.");
      return;
    }

    try {
      const mainImgResult = await handelUpload(mainImageFile);
      if (!mainImgResult?.status) {
        console.error("Main image upload failed.");
        return;
      }

      const otherImgResults = await handleUploadMulti(otherImageFiles);
      if (!otherImgResults || otherImgResults.some((result) => !result.status)) {
        console.error("Some additional images failed to upload.");
        return;
      }

      const formData = {
        name,
        currentPrice,
        oldPrice,
        cost,
        stock,
        description,
        Categorie,
        sous,
        marques,
      brandLogo: isExistingBrand 
        ? brandsList.find(b => b.name === marques)?.logo
        : brandLogoUrl,
        point,
        Remaining : stock,
        sold : 0,
        discount: discountPercentage,
        mainImage: mainImgResult.link,
        otherImages: otherImgResults.map((result) => result.link),
        fullDisctiption : Docu,
      };


      const response = await axios.post(`${baseUrl}/add_products`, formData);
      console.log("Product created successfully:", response.data);

      if (response.data.message) {
        setTask(false);
        setnewID(response.data.productId);
        setsmg(true);
        resetForm();
      } else {
        setTask(false);
        setemsg(true);
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  useEffect(() => {
    if (oldPrice > currentPrice) {
      const discount = ((oldPrice - currentPrice) / oldPrice) * 100;
      setDiscountPercentage(Math.round(discount));
    } else {
      setDiscountPercentage(0);
    }
  }, [currentPrice, oldPrice]);

  return (
    <>
     {
      Changing ?  <Themes setCh={setChanging} /> : ''
     }
      {taskLoader ? <TaskLoader /> : ""}
      {emsg ? (
        <ErrorLabel message="Something went wrong try again" setClose={setemsg} />
      ) : (
        ""
      )}
      {smsg ? (
        <SuccessLabel
          message={`product added successfully with ID : ${newID}`}
          setClose={setsmg}
        />
      ) : (
        ""
      )}
      <div className="w-full flex relative ">
        <div
          className={`w-full min-h-[100vh] ${
            theme === "dark" ? "bg-gray-900" : "bg-[#edf4f6]"
          } flex flex-col`}
        >
         <Aside AsideT = {AsideT} setAsideT= {setAside}  />
          <Nav AsideT = {AsideT} setAside = {setAside} />
          <section className="p-6 w-full flex flex-col gap-3 dark:bg-[#2d3748]">
            <div
              className={`d-md-flex d-block align-items-center font-semibold justify-content-between my-4 page-header-breadcrumb ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              id="page_root_title"
            >
              <div>
                <p className="fw-semibold fs-18 mb-0">
                  Add a Product / General Information
                </p>
                <span className="fs-semibold text-muted">
                  <h1 className={`flex w-full gap-2 qg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Note :{" "}
                    <p className={theme === "dark" ? "text-white" : "text-black"}>
                      The Saving of the Product can take a bit of time during by the upload of the images ...
                    </p>
                  </h1>
                </span>
              </div>
            </div>

            <div className="w-full h-full gap-2 flex chng">
              <form
                className={`w-full h-full ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } rounded-md shadow-black p-4`}
                onSubmit={handelAddPr}
              >
                {step === "1" ? (
                  <>
                    <div className="w-full h-full flex flex-col gap-3 ">
                      <div className="grid grid-cols-2 gap-3 x4s5">
                        {/* Product Name */}
                        <div className="w-full flex flex-col gap-2">
                          <label
                            htmlFor="name"
                            className={theme === "dark" ? "text-white" : "text-black"}
                          >
                            Product Name:
                          </label>
                          <input
                            type="text"
                            name="name"
                            className={`w-full ${
                              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                            } rounded-sm p-2 outline-none`}
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>

                        {/* Current Price */}
                        <div className="w-full flex flex-col gap-2">
                          <label
                            htmlFor="price"
                            className={theme === "dark" ? "text-white" : "text-black"}
                          >
                            Current Price:
                          </label>
                          <input
                            type="number"
                            name="price"
                            typeof="number"
                            className={`w-full ${
                              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                            } rounded-sm p-2 outline-none`}
                            placeholder="Current Price"
                            value={currentPrice}
                            onChange={(e : any) => setCurrentPrice(e.target.value)}
                            required
                          />
                        </div>

                        {/* Old Price */}
                        <div className="w-full flex flex-col gap-2">
                          <label
                            htmlFor="priceold"
                            className={theme === "dark" ? "text-white" : "text-black"}
                          >
                            Old Price:
                          </label>
                          <input
                            type="number"
                            name="priceold"
                            className={`w-full ${
                              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                            } rounded-sm p-2 outline-none`}
                            placeholder="Old Price"
                            value={oldPrice}
                            min={0}
                            
                            onChange={(e : any) => setOldPrice(e.target.value)}
                            required
                          />
                        </div>

                        {/* Cost */}
                        <div className="w-full flex flex-col gap-2">
                          <label
                            htmlFor="cost"
                            className={theme === "dark" ? "text-white" : "text-black"}
                          >
                            Cost:
                          </label>
                          <input
                            type="number"
                            name="cost"
                            className={`w-full ${
                              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                            } rounded-sm p-2 outline-none`}
                            placeholder="Cost"
                            value={cost}
                            onChange={(e: any) => setCost(e.target.value)}
                            required
                          />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <label
                            htmlFor="stock"
                            className={theme === "dark" ? "text-white" : "text-black"}
                          >
                            Stockage :
                          </label>
                          <input
                            type="number"
                            name="stocke"
                            className={`w-full ${
                              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                            } rounded-sm p-2 outline-none`}
                            placeholder="Stockage"
                            value={stock}
                            onChange={(e : any) => setStock(e.target.value)}
                            required
                          />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <label
                            htmlFor="cost"
                            className={theme === "dark" ? "text-white" : "text-black"}
                          >
                            Main Image :
                          </label>
                          <input
                            type="file"
                            name="file"
                            className={`w-full ${
                              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                            } rounded-sm p-2 outline-none`}
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setImage(URL.createObjectURL(file));
                                setImageSend(file);
                              }
                            }}
                            required
                          />
                        </div>
                      </div>

                      {/* Product Description */}
                      <div className="w-full flex flex-col gap-2">
                        <label
                          htmlFor="description"
                          className={theme === "dark" ? "text-white" : "text-black"}
                        >
                          Product Description:
                        </label>
                        <textarea
                          name="description"
                          className={`w-full ${
                            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                          } rounded-sm p-2 outline-none`}
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>

                      {/* Next Button */}
                      <button
                        type="button"
                        className={`p-2 cursor-pointer ${
                          theme === "dark" ? "bg-blue-400" : "bg-blue-400"
                        } text-white rounded-md`}
                        onClick={() => setStep("2")}
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : step == "2" ? (
                  <>
                    <div className="w-full h-full flex flex-col gap-3 ">
                      <div className="grid grid-cols-2 gap-3 x4s5">
                        <div className="w-full flex flex-col relative gap-2">
                          <label
                            htmlFor="Categorie"
                            className={theme === "dark" ? "text-white" : "text-black"}
                          >
                            Categorie :{" "}
                          </label>
                          <input
                            type="text"
                            placeholder="Categorie"
                            className={`w-full ${
                              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                            } rounded-sm p-2 outline-none`}
                            name="Categorie"
                            value={Categorie}
                            list="Catego"
                            onChange={(e: any) => {
                              setCategories(e.target.value);
                            }}
                            required
                          />
                          <datalist id="Catego">
                            <option value="visage">Visage</option>
                            <option value="cheveau">Chéveau</option>
                            <option value="corps">Corps</option>
                            <option value="bebe-maman">Bébé et Maman</option>
                            <option value="complements-alimentaires">
                              Compléments Alimentaires
                            </option>
                            <option value="hygiene">Hygiène</option>
                            <option value="solaire">Solaire</option>
                            <option value="bio-nature">Bio et Nature</option>
                            <option value="materiels-medical">Matériels Médical</option>
                            <option value="homme">Homme</option>
                            <option value="nutrition Sprotive">nutrition Sprotive</option>
                            <option value="animals">Animalerie</option>
                          </datalist>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <label
                            htmlFor="sous"
                            className={theme === "dark" ? "text-white" : "text-black"}
                          >
                            Sous Categorie:{" "}
                          </label>
                          <input
                            name="sous"
                            type="text"
                            list="list-sous"
                            className={`w-full ${
                              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                            } rounded-sm p-2 outline-none`}
                            value={sous}
                            onChange={(e) => setSous(e.target.value)}
                            required
                          />
                          <datalist id="list-sous">
{
  Categorie == "visage" ?
 <>
   <option value="solaire">solaire</option>
   <option value="Peaux grasses">Peaux grasses</option>
   <option value="Soins Anti-taches">Soins Anti-taches</option>
   <option value="Soins anti-âge">Soins anti-âge</option>
   

 </> 

  : Categorie == "cheveau" ? <>
   <option value="ANTI CHUTE">ANTI CHUTE
   </option>
   <option value="Compléments cheveux et ongles">Compléments cheveux et ongles</option>
   <option value="SHAMPOOING">SHAMPOOING</option>
   <option value="Kératine">Kératine</option>
  
  </> : null
}


                          </datalist>
                        </div>
                        <div className="w-full flex flex-col relative gap-2">
                          <label
                            htmlFor="MARQUES"
                            className={theme === "dark" ? "text-white" : "text-black"}
                          >
                            Brand :{" "}
                          </label>
                          <input
                            type="MARQUES"
                            placeholder="Product Brand"
                            className={`w-full ${
                              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                            } rounded-sm p-2 outline-none`}
                            name="MARQUES"
                            value={marques}
                            list="brands"
                            onChange={(e: any) => {
                              setMarques(e.target.value);
                            }}
                            required
                          />
                      <datalist id="brands">
  {brandsList.map((brand, index) => (
    <option value={brand.name} key={index}>
      {brand.name}
    </option>
  ))}
</datalist>{/* After the brand input field */}
{!brandsList.some(brand => brand.name === marques) && (
  <div className="w-full flex flex-col gap-2">
    <label
      htmlFor="brandLogo"
      className={theme === "dark" ? "text-white" : "text-black"}
    >
      Brand Logo (Required for new brand):
    </label>
    <input
      type="file"
      name="brandLogo"
      className={`w-full ${
        theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
      } rounded-sm p-2 outline-none`}
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          setBrandImage(URL.createObjectURL(file));
          setBrandImageSend(file);
        }
      }}
      required={!brandsList.some(brand => brand.name === marques)}
    />
  </div>
)}
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <label
                            htmlFor="point"
                            className={theme === "dark" ? "text-white" : "text-black"}
                          >
                            Point de fidilité :{" "}
                          </label>
                          <input
                            name="point"
                            type="number"
                            className={`w-full ${
                              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                            } rounded-sm p-2 outline-none`}
                            value={point}
                            onChange={(e : any) => setPoint(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`w-full ${
                          theme === "dark" ? "bg-gray-700" : "bg-black"
                        } p-2 text-white rounded-sm`}
                        onClick={addImageInput}
                      >
                        Add a Product Image
                      </button>
                      <div className="w-full grid grid-cols-2 gap-3">
                        {imageInputs.map((_, index) => (
                          <div key={index} className="w-full relative">
                            <input
                              type="file"
                              className={`w-full ${
                                theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300"
                              } rounded-sm p-2 outline-none`}
                              onChange={(e) => {
                                if (e.target.files) {
                                  const newImages = [...imageInputs];
                                  newImages[index] = URL.createObjectURL(e.target.files[0]);
                                  setImageInputs(newImages);
                                  const newSends = [...imageInputsend];
                                  newSends[index] = e.target.files[0];
                                  console.log("??? :", newSends);
                                  setImageInputsend(newSends);
                                }
                              }}
                              required
                            />
                            <button
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700"
                              onClick={() => removeImageInput(index)}
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
              <div className="w-full flex flex-row-reverse gap-3">
              <button
                        type="button"
                        className={`p-2 cursor-pointer ${
                          theme === "dark" ? "bg-blue-400" : "bg-blue-400"
                        } text-white rounded-md`}
                        onClick={() => setStep("3")}
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        className={`p-2 cursor-pointer ${
                          theme === "dark" ? "bg-gray-700" : "bg-black"
                        } text-white rounded-md`}
                        onClick={() => {
                          console.log("back :", imageInputsend);
                          setStep("1");
                        }}
                      >
                        Prev
                      </button>
              </div>
                    </div>
                  </>
                ) : step === "3" ? (
                  <>
                    <div className="w-full h-full flex flex-col gap-3 ">
                      <div className="w-full flex flex-col gap-3 x4s5">
                        <label
                          htmlFor="FullDiscription"
                          className={`font-semibold ${
                            theme === "dark" ? "text-white" : "text-black"
                          }`}
                        >
                        
                        </label>
                        <MyEditor initialContent={""} setContent = {setDocu} /> 
                      </div>
                      <div className="w-full flex gap-3 ">
                        <button
                          type="button"
                          className={`p-2 w-full cursor-pointer ${
                            theme === "dark" ? "bg-gray-700" : "bg-black"
                          } text-white rounded-md`}
                          onClick={() => setStep("2")}
                        >
                          Prev
                        </button>
                        <button
                          type="submit"
                          className={`p-2 w-full cursor-pointer ${
                            theme === "dark" ? "bg-blue-400" : "bg-blue-400"
                          } text-white rounded-md`}
                        >
                          Publish
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </form>

              {/* Product Overview */}
              <ProductOverView
                image={image}
                name={name}
                oldPrice={oldPrice}
                description={description}
                discountPercentage={discountPercentage}
                imageInputs={imageInputs}
                currentPrice={currentPrice}
                theme={theme}
                brandLogo={brandsList.find(b => b.name === marques)?.logo || brandImage}
              />
            </div>
          </section>
        </div>
        <button className="fixed justify-center right-10 bottom-10 rounded-full w-11 h-11 text-center items-center outline-none border-none cursor-pointer flex p-2 bg-blue-400 text-white"
onClick={()=>{
  setChanging(true);
}}
>
  <i className="ri-settings-line"></i>
</button>
      </div>
    </>
  );
};

export default AddProduct;