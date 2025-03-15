
import { io } from 'socket.io-client';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const socket = io(`${baseUrl}`);


const useSocket = () => {



  

    socket.on('connect', () => {
   
    });

  const saveMsg = async(msg : any) =>{

if(msg.id === undefined){
   socket.emit("send-messageQuest",{
    msg: msg.msg,
    id: socket.id
  })  
}else{

    socket.emit('send-message', msg);
}
  }
  const saveorder = async(data :any)=>{
socket.emit('Newoder',data.n);
socket.emit('tbl', data.t);

  }
  const SendRepport = async (data:any)=>{
    socket.emit('send-report', data);
  }
  const SendReview = async(data:any) =>{
    socket.emit('send-review', data);
  }
  
  const Verfied = async(data:any)=>{
    try{
socket.emit('verified-new',data)
    }catch(err){
      console.log(err);
    }
  }




  


return {saveMsg , saveorder ,SendRepport,SendReview,Verfied, socket  }

};

export default useSocket;
