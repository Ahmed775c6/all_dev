

const Placed = ({setC} : any) => {
  return (
<>
<div className="fixed flex flex-col gap-3 p-4 right-0 top-5 z-10 bg-green-400 text-white">
<i className="ri-close-line cursor-pointer absolute right-1 p-1 top-0" onClick={()=>{
    setC(false);
  }}></i>
  <div className="w-full flex flex-col relative  gap-3 justify-between">

  <p>le produit est ajouter sur votre panier ...</p>

  </div>
    <a href="/cart"  className="w-full justify-center text-center">Voir Panier</a>

</div>
</>
  )
}

export default Placed