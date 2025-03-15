import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Aside from "./Aside";
import Themes from "./Themes";
import { SuccessLabel, ErrorLabel } from "../labels";
import TaskLoader from "./TaskLoader";
import ProductOverView from "./ProductOverView";
import { handleUploadMulti, handelUpload } from "../../Logic/UploadFile";
import { Trash2 } from "lucide-react";
import MyEditor from "../TextEditor";
const baseUrl = import.meta.env.VITE_API_BASE_URL;



const Brands: any[] = [];

const ModifierPR = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
const  [init,setContent] = useState<any>('')
  const [Changing, setChanging] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [AsideT, setAside] = useState(false);

  // Update the document body with the current theme
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  }, [theme]);

  // Product loading and error states
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form step and loader
  const [step, setStep] = useState("1");
  const [taskLoader, setTask] = useState(false);

  // Form fields – initial values will be updated when product data is loaded.
  const [Categorie, setCategories] = useState("");

  const [sous, setSous] = useState("");
  const [name, setName] = useState("");
  const [smsg, setsmg] = useState(false);
  const [emsg, setemsg] = useState(false);
  const [image, setImage] = useState<any>("/src/assets/empty.jpg");
  const [imageSend, setImageSend] = useState<File | null>(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [cost, setCost] = useState(0);
  const [newID, setnewID] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState(
    "Sample product description goes here."
  );
  const [marques, setMarques] = useState("");
  const [point, setPoint] = useState(0);
  const [imageInputs, setImageInputs] = useState<any[]>([]);
  const [imageInputsend, setImageInputsend] = useState<(File | null)[]>([]);

  // When product is fetched, update the form fields
  useEffect(() => {
    if (product) {
      setCategories(product.Categorie || "");
      setSous(product.sous || "");
      setName(product.name || "");
      setImage(product.mainImage || "/src/assets/empty.jpg");
 
      setCurrentPrice(product.currentPrice || 0);
      setOldPrice(product.oldPrice || 0);
      setCost(product.cost || 0);
      setStock(product.stock || 0);
      setDescription(product.description || "Sample product description goes here.");
      setMarques(product.marques || "");
      setPoint(product.point || 0);
      setImageInputs(product.otherImages || []);
      setContent(product.fullDisctiption || "")

    }
  }, [product]);


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
    setImageInputsend([...imageInputsend, null]);
  };

  const removeImageInput = (index: number) => {
    setImageInputs(imageInputs.filter((_, i) => i !== index));
    setImageInputsend(imageInputsend.filter((_, i) => i !== index));
  };

  const handelAddPr = async (e: React.FormEvent) => {
    e.preventDefault();
    setTask(true);

    // Filter out any falsy values from additional images
    const otherImageFiles = imageInputsend.filter((file) => file);

  

    try {
      // Upload the main image
  let mainImgResult;
  if (imageSend) {
    mainImgResult = await handelUpload(imageSend);
  }


      // Upload additional images
      const validOtherImageFiles = otherImageFiles.filter((file): file is File => file !== null);
      const otherImgResults = await handleUploadMulti(validOtherImageFiles);
      if (
        !otherImgResults ||
        otherImgResults.some((result: any) => !result.status)
      ) {
       
      }

      const formData = {
        id : id,
        name,
        currentPrice,
        oldPrice,
        cost,
        stock,
        description,
        Categorie,
        sous,
        marques,
        point,
        discount: discountPercentage,
        mainImage: mainImgResult?.link,
        otherImages: otherImgResults?.map((result: any) => result.link),
        fullDisctiption : init
      };

   

      // Note: If this component is meant to modify a product,
      // you may need to call a different endpoint (e.g. update_product).
      const response = await axios.post(
       `${baseUrl}/modify_products`,
        formData
      );
  

      if (response.data.message) {
        setnewID(response.data.productId);
        setsmg(true);
      window.location.reload();
      } else {
        setemsg(true);
        resetForm();
      }
      setTask(false);
    } catch (error: any) {
      console.error("Error submitting the form:", error.message || error);
      setTask(false);
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


  useEffect(() => {
    if (id) {
      axios
        .get(`${baseUrl}/Getproduct/${id}`)
        .then((response) => {
         
          setProduct(response.data.message);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Error fetching product");
          setLoading(false);
        });
    } else {
      setError("No product ID provided");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {Changing && <Themes setCh={setChanging} />}
      {taskLoader && <TaskLoader />}
      {emsg && (
        <ErrorLabel
          message="Something went wrong, try again"
          setClose={setemsg}
        />
      )}
      {smsg && (
        <SuccessLabel
          message={`Product added successfully with ID : ${newID}`}
          setClose={setsmg}
        />
      )}

      <Aside AsideT={AsideT} setAsideT={setAside} />
      <div className="w-full min-h-[100vh] bg-[#edf4f6] dark:bg-[#2d3748] flex flex-col">
        <Nav AsideT={AsideT} setAside={setAside} />
        <div className="w-full flex relative">
          <div
            className={`w-full min-h-[100vh] ${
              theme === "dark" ? "bg-gray-900" : "bg-[#edf4f6]"
            } flex flex-col`}
          >
            <section className="p-6 w-full flex flex-col gap-3 dark:bg-[#2d3748]">
              <div
                className={`d-md-flex d-block align-items-center font-semibold justify-content-between my-4 page-header-breadcrumb ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                id="page_root_title"
              >
                <div>
                  <p className="fw-semibold fs-18 mb-0">
                    Modify a Product / General Information
                  </p>
                  <span className="fs-semibold text-muted">
                    <h1
                      className={`flex w-full gap-2 qg ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Note :{" "}
                      <p className={theme === "dark" ? "text-white" : "text-black"}>
                        The saving of the product can take a bit of time due to the
                        image uploads...
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
                                theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-300"
                              } rounded-sm p-2 outline-none`}
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                        
                            />
                          </div>

                      
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
                              className={`w-full ${
                                theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-300"
                              } rounded-sm p-2 outline-none`}
                              placeholder="Current Price"
                              value={currentPrice}
                              onChange={(e) =>
                                setCurrentPrice(Number(e.target.value))
                              }
                      
                            />
                          </div>

                  
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
                                theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-300"
                              } rounded-sm p-2 outline-none`}
                              placeholder="Old Price"
                              value={oldPrice}
                              min={0}
                              onChange={(e : any) =>
                                setOldPrice(e.target.value)
                              }
                         
                            />
                          </div>

                   
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
                                theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-300"
                              } rounded-sm p-2 outline-none`}
                              placeholder="Cost"
                              value={cost}
                              onChange={(e : any) => setCost(e.target.value)}
                          
                            />
                          </div>

                   
                          <div className="w-full flex flex-col gap-2">
                            <label
                              htmlFor="stock"
                              className={theme === "dark" ? "text-white" : "text-black"}
                            >
                              Stockage:
                            </label>
                            <input
                              type="number"
                              name="stock"
                              className={`w-full ${
                                theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-300"
                              } rounded-sm p-2 outline-none`}
                              placeholder="Stockage"
                              value={stock}
                              onChange={(e : any) => setStock(e.target.value)}
                       
                            />
                          </div>

                          <div className="w-full flex flex-col gap-2">
                            <label
                              htmlFor="mainImage"
                              className={theme === "dark" ? "text-white" : "text-black"}
                            >
                              Main Image:
                            </label>
                            <input
                              type="file"
                              name="mainImage"
                              className={`w-full ${
                                theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-300"
                              } rounded-sm p-2 outline-none`}
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setImage(URL.createObjectURL(file));
                                  setImageSend(file);
                                }
                              }}
                          
                            />
                          </div>
                        </div>

                  
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
                              theme === "dark"
                                ? "bg-gray-700 text-white"
                                : "bg-gray-300"
                            } rounded-sm p-2 outline-none`}
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        
                          />
                        </div>

              
                        <button
                          type="button"
                          className={`p-2 cursor-pointer ${
                            theme === "dark" ? "bg-gray-700" : "bg-black"
                          } text-white rounded-md`}
                          onClick={() => setStep("2")}
                        >
                          Next
                        </button>
                      </div>
                    </>
                  ) : step === "2" ? (
                    <>
                      <div className="w-full h-full flex flex-col gap-3 ">
                        <div className="grid grid-cols-2 gap-3 x4s5">
                          <div className="w-full flex flex-col relative gap-2">
                            <label
                              htmlFor="Categorie"
                              className={theme === "dark" ? "text-white" : "text-black"}
                            >
                              Categorie:
                            </label>
                            <input
                              type="text"
                              placeholder="Categorie"
                              className={`w-full ${
                                theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-300"
                              } rounded-sm p-2 outline-none`}
                              name="Categorie"
                              value={Categorie}
                              list="Catego"
                              onChange={(e) => setCategories(e.target.value)}
                      
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
                              Sous Categorie:
                            </label>
                            <input
                              name="sous"
                              type="text"
                              className={`w-full ${
                                theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-300"
                              } rounded-sm p-2 outline-none`}
                              value={sous}
                              onChange={(e) => setSous(e.target.value)}
                
                            />
                          </div>
                          <div className="w-full flex flex-col relative gap-2">
                            <label
                              htmlFor="MARQUES"
                              className={theme === "dark" ? "text-white" : "text-black"}
                            >
                              Brand:
                            </label>
                            <input
                              type="text"
                              placeholder="Product Brand"
                              className={`w-full ${
                                theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-300"
                              } rounded-sm p-2 outline-none`}
                              name="MARQUES"
                              value={marques}
                              list="brands"
                              onChange={(e) => setMarques(e.target.value)}
                     
                            />
                            <datalist id="brands">
                              {Brands.length > 0
                                ? Brands.map((item, index) => (
                                    <option value={item.name} key={index}>
                                      {item.name}
                                    </option>
                                  ))
                                : null}
                            </datalist>
                          </div>
                          <div className="w-full flex flex-col gap-2">
                            <label
                              htmlFor="point"
                              className={theme === "dark" ? "text-white" : "text-black"}
                            >
                              Point de fidilité:
                            </label>
                            <input
                              name="point"
                              type="number"
                              className={`w-full ${
                                theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-300"
                              } rounded-sm p-2 outline-none`}
                              value={point}
                              onChange={(e) => setPoint(Number(e.target.value))}
                      
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
                                  theme === "dark"
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-300"
                                } rounded-sm p-2 outline-none`}
                                onChange={(e) => {
                                  if (e.target.files) {
                                    const newImages = [...imageInputs];
                                    newImages[index] = URL.createObjectURL(
                                      e.target.files[0]
                                    );
                                    setImageInputs(newImages);
                                    const newSends = [...imageInputsend];
                                    newSends[index] = e.target.files[0];
                                    setImageInputsend(newSends);
                                  }
                                }}
                                required
                              />
                              <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700"
                                onClick={() => removeImageInput(index)}
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            className={`p-2 cursor-pointer ${
                              theme === "dark" ? "bg-gray-700" : "bg-black"
                            } text-white rounded-md flex-1`}
                            onClick={() => setStep("1")}
                          >
                            Prev
                          </button>
                          <button
                            type="button"
                            className={`p-2 cursor-pointer ${
                              theme === "dark" ? "bg-gray-700" : "bg-black"
                            } text-white rounded-md flex-1`}
                            onClick={() => setStep("3")}
                          >
                            Next
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
         
                      <MyEditor initialContent={init} setContent={setContent}  />
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
                              theme === "dark" ? "bg-gray-700" : "bg-black"
                            } text-white rounded-md`}
                          >
                            Publish
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}
                </form>

         
                <ProductOverView
                  image={image}
                  name={name}
                  oldPrice={oldPrice}
                  description={description}
                  discountPercentage={discountPercentage}
                  imageInputs={imageInputs}
                  currentPrice={currentPrice}
                  theme={theme}
                />
              </div>
            </section>
          </div>

          <button
            className="fixed right-10 bottom-10 rounded-full w-11 h-11 flex items-center justify-center outline-none border-none cursor-pointer p-2 bg-blue-400 text-white"
            onClick={() => setChanging(true)}
          >
            <i className="ri-settings-line"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ModifierPR;
