export const SuccessLabel = ({ message, setClose }: { message: string; setClose: (value: boolean) => void }) => {
    return (
      <>
        <div className="fixed flex items-center h-full justify-center gap-5 text-center flex-row z-50 bg-[rgba(0,0,0,0.5)] p-2 left-0 w-full top-0">
     
       <div className="flex w-fit bg-white p-2 flex-col gap-3">
       <p className="text-lg">{message}</p>
          <i className=" p-2   w-fit rounded-sm bg-blue-500 text-white cursor-pointer" onClick={()=>{
            setClose(false);
           }}> Got it</i>
       </div>
        </div>
      </>
    );
  };
  export const WarningLabel = ({ message, setClose }: { message: string; setClose: (value: boolean) => void }) => {
    return (
      <>
        <div className="absolute flex justify-between flex-row bg-yellow-200 z-50 text-yellow-500 p-2 left-0 w-full top-0">
          <i className="ri-close-line cursor-pointer" onClick={() => setClose(true)}></i>
          <p className="text-lg">{message}</p>
        </div>
      </>
    );
  };
  export const ErrorLabel = ({ message, setClose }: { message: string; setClose: (value: boolean) => void }) => {
    return (
      <>
        <div className="absolute flex justify-between flex-row z-50 bg-red-200 text-red-500 p-2 left-0 w-full top-0">
          <i className="ri-close-line cursor-pointer" onClick={() => setClose(true)}></i>
          <p className="text-lg">{message}</p>
        </div>
      </>
    );
  };
  