import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const CustomerPopupEdit = ({
  id,
  setClose,
  Banned,
  setLabel,
}: {
  id: string;
  setClose: (value: boolean) => void;
  Banned: boolean;
  setLabel: (value: boolean) => void;
}) => {
  const banUser = async (id: string) => {
    try {
      const response = await axios.post(`${baseUrl}/banUser`, { id });
      console.log(response.data);
      setLabel(response.data.message); // Success message
      setClose(false);
    } catch (error) {
      console.error("Error banning user:", error);
      setLabel(false); // Error message
    }
  };

  const unbanUser = async (id: string) => {
    try {
      const response = await axios.post(`${baseUrl}/unbanUser`, { id });
  
      setLabel(response.data.message);// Success message
      setClose(false);
    } catch (error) {
      console.error("Error unbanning user:", error);
      setLabel(false);  // Error message
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await axios.post(`${baseUrl}/deleteUser`, { id });
  
      setLabel(response.data.message); // Success message
      setClose(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      setLabel(false);  // Error message
    }
  };

  return (
    <>
      <div className="w-full flex z-50 fixed h-full flex-col justify-center items-center text-center bg-[rgba(0,0,0,0.5)] ">
        <div className="w-[500px] relative p-3 bg-white rounded-md shadow-xl flex flex-col gap-3 dark:bg-gray-900">
          <header className="w-full bg-gray-200 rounded-sm p-2 flex flex-row justify-between dark:bg-gray-700">
            <h1 className="dark:text-white">Edit user</h1>
            <i className="ri-close-line cursor-pointer dark:text-white " onClick={() => setClose(false)}></i>
          </header>

          <div className="w-full flex gap-3">
            {!Banned ? (
              <button
                className="w-full p-2 bg-gray-600 rounded-sm outline-none cursor-pointer text-white"
                onClick={async () => await banUser(id)}
              >
                Ban user
              </button>
            ) : (
              <button
                className="w-full p-2 bg-gray-600 rounded-sm outline-none cursor-pointer text-white"
                onClick={async () => await unbanUser(id)}
              >
                Unban user
              </button>
            )}

            <button
              className="w-full p-2 bg-black text-white rounded-sm outline-none cursor-pointer"
              onClick={async () => await deleteUser(id)}
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerPopupEdit;
