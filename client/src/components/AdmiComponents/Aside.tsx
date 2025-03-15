
import { useAdminAuth } from "../../context/AdminAuthProvider";

const adminSidebarLinks = [
  {
    name: "Dashboard",
    icon: "ri-bar-chart-line",
    path: "/dashbord",
  },
  {
    name: " + Add Product",
    icon: "ri-folder-add-line",
    path: "/add_products",
  },
  {
    name: "Modify Product",
    icon: "ri-file-edit-line",
    path: "/Products_modif",
  },
  {
    name: "Sales",
    icon: "ri-shopping-cart-line",
    path: "/sales",
  },
  {
    name: "App Settings",
    icon: "ri-settings-3-line",
    path: "/app-settings",
  },
  {
    name: "Messages",
    icon: "ri-discuss-line",
    path: "/messages",
  },
  {
    name: "Analytics",
    icon: "ri-line-chart-line",
    path: "/analytics",
  },
  {
    name: "Receipts & Storage",
    icon: "ri-archive-line",
    path: "/receipts-storage",
  },
  {
    name: "Posts",
    icon: "ri-article-line",
    path: "/Posts",
  },
  {
    name: "Clients",
    icon: "ri-team-line",
    path: "/Costumers",
  },
  {
    name: "Account Settings",
    icon: "ri-tools-line",
    path: "/edit_admin_profile",
  },
  {
    name: "Reports",
    icon: "ri-file-chart-line",
    path: "/reports",
  },
];

const Aside = ({AsideT,setAsideT} : any) => {

  const auth = useAdminAuth();



  return (
    <>
      <aside className={`w-[25%] chAsl min-h-[100vh] h-full ze overflow-auto bg-white dark:bg-gray-900 dark:text-white ${AsideT ? 'active ': ''}`}>
        <header className="p-4 flex-row  font-semibold text-center flex justify-between border-b border-gray-300 dark:border-gray-700">
          <h1 className=" text-gray-950 dark:text-white">Command Panel</h1>
          <i className="ri-menu-line cursor-pointer " onClick={()=>{
            setAsideT(!AsideT);
          }}></i>
        </header>
        <div className="w-full p-4 flex flex-col gap-2">
          <ul className="menu-links space-y-2">
            {adminSidebarLinks.map((link, index) => (
              <li key={index} className="nav-link">
                <a
                  href={link.path}
                  className="flex items-center p-2 hover:bg-primary dark:hover:bg-gray-700 rounded-md"
                >
                  <i className={`icon ${link.icon} text-lg`}></i>
                  <span className="ml-3">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>

          <li
            onClick={() => {
              auth?.logout();
            }}
            className="nav-link rounded-md p-2 bg-black dark:bg-gray-800 w-full justify-center text-center text-white items-center cursor-pointer"
          >
            <a
              href="/"
              className="flex items-center p-2 hover:bg-primary dark:hover:bg-gray-700 rounded-md"
            >
              <i className="icon ri-logout-circle-r-line"></i>
              <span className="ml-3">Logout</span>
            </a>
          </li>
        </div>
      </aside>
    </>
  );
};

export default Aside;
