import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Front/Home";
import Shop from "./pages/Front/Shop";
import Produit from "./pages/Front/Produit";
import Auth from "./Adminsator/Auth";
import Admin from "./Adminsator/Admin";
import Cart from "./pages/Front/Cart";
import AppEdit from "./Adminsator/AppEdit";
import AddProduct from "./Adminsator/AddProduct";
import Edit from "./Adminsator/Edit";
import ProductsPage from "./Adminsator/Products";
import Clients from "./Adminsator/Clients";
import Stat from "./Adminsator/Stat";
import BlogEditor from "./Adminsator/Blogger";
import VerifyAccount from "./pages/VerifyAccount";
import Profile from "./pages/Profile";
import InvoicesPage from "./Adminsator/invoicesPage";
import CustomerDetails from "./Adminsator/CustomerPopup";
import ModifierPR from "./components/AdmiComponents/ModifierPR";
import MenuEdit from "./Adminsator/MenuEdit";
import { AdminAuthProvider } from "./context/AdminAuthProvider"; // Import AdminAuthProvider
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"; // Import ProtectedAdminRoute
import Analytics from "./Adminsator/Stat";
import Messanger from "./components/AdmiComponents/Messanger";
import Sales from "./components/AdmiComponents/Sales";
import Storage from "./Adminsator/Storage";
import Blog from "./pages/Front/blog";
import Blog_item from "./pages/Front/Blog_item";
import Repports from "./Adminsator/Repports";
import Reviews from "./components/AdmiComponents/Reviews";
import Orders101 from "./Adminsator/Orders";
import Posts from "./Adminsator/Posts";
import UpdatePosts from "./Adminsator/UpdatePost";
import Passob from "./components/Passob";
import Er from "./components/er";
import ChangeP1012 from "./components/ChangepassCor";
import Botifica from "./components/AdmiComponents/Botifica";
function App() {

  return (
    <AdminAuthProvider> 
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/ViewProduct" element={<Produit />} />
          <Route path="/Verify" element={<VerifyAccount />} />
          <Route path="/forget_password" element={<Passob />} />
          <Route path="/er" element={<Er/>} />
          <Route path="/changex" element={<ChangeP1012 />} />
          
          <Route path="/profile" element={
          
<Profile/>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog_item" element={<Blog_item />} />
     
          <Route
            path="/dashbord"
            element={
              <ProtectedAdminRoute >
                <Admin />
              </ProtectedAdminRoute>
            }
          />
             <Route
            path="/receipts-storage"
            element={
              <ProtectedAdminRoute>
                <Storage />
              </ProtectedAdminRoute>
            }
          />
      <Route
            path="/notifications"
            element={
              <ProtectedAdminRoute>
                <Botifica />
              </ProtectedAdminRoute>
            }
          />

             <Route
            path="/Orders"
            element={
              <ProtectedAdminRoute>
                <Orders101 />
              </ProtectedAdminRoute>
            }
          />
               <Route
            path="/Posts"
            element={
              <ProtectedAdminRoute>
                <Posts />
              </ProtectedAdminRoute>
            }
          />
                    <Route
            path="/UpdatePosts"
            element={
              <ProtectedAdminRoute>
                <UpdatePosts />
              </ProtectedAdminRoute>
            }
          />
                  <Route
            path="/ProductReviews"
            element={
              <ProtectedAdminRoute>
                <Reviews />
              </ProtectedAdminRoute>
            }
          />
       
              <Route
            path="/reports"
            element={
              <ProtectedAdminRoute>
                <Repports />
              </ProtectedAdminRoute>
            }
          />
          
           <Route
            path="/messages"
            element={
              <ProtectedAdminRoute>
                <Messanger />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/app-settings"
            element={
              <ProtectedAdminRoute>
                <AppEdit />
              </ProtectedAdminRoute>
            }
          />

<Route
            path="/setup_prorduct"
            element={
              <ProtectedAdminRoute>
                <ModifierPR />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/add_products"
            element={
              <ProtectedAdminRoute>
                <AddProduct />
              </ProtectedAdminRoute>
            }
          />
 
               <Route
            path="/analytics"
            element={
              <ProtectedAdminRoute>
                <Analytics />
              </ProtectedAdminRoute>
            }
          />
           <Route path="/customer/:id" element={
            <ProtectedAdminRoute>
              <CustomerDetails />
            </ProtectedAdminRoute>
           } />
          <Route
            path="/edit_admin_profile"
            element={
              <ProtectedAdminRoute>
                <Edit />
              </ProtectedAdminRoute>
            }
          />
           <Route
            path="/menuEdit"
            element={
              <ProtectedAdminRoute>
                <MenuEdit />
              </ProtectedAdminRoute>
            }
          />
               <Route
            path="/sales"
            element={
              <ProtectedAdminRoute>
                <Sales />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/Products_modif"
            element={
              <ProtectedAdminRoute>
                <ProductsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/Costumers"
            element={
              <ProtectedAdminRoute>
                <Clients />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedAdminRoute>
                <Stat />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/blogEditor"
            element={
              <ProtectedAdminRoute>
                <BlogEditor />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/receipts"
            element={
              <ProtectedAdminRoute>
                <InvoicesPage />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
   
    </AdminAuthProvider>
  );
}

export default App;
