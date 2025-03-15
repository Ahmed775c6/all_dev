export const handelchangeMSg = async(data : any,test : any)=>{
try{

return data === test
}catch(err){
    console.log(err);
}
}