import Nav from '../components/AdmiComponents/Nav';

import { handelUpload } from '../Logic/UploadFile';
import { useEffect,  useState } from 'react';
import Themes from '../components/AdmiComponents/Themes';
import Aside from '../components/AdmiComponents/Aside';
import MyEditor from '../components/TextEditor';
import axios from 'axios';
import MyComponent from '../components/Frame';
import { Loader } from 'lucide-react';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const BlogEditor: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const [Loading,setLoading] = useState(true);
const [docu,setDocu] = useState('');
const [AsideT, setAside] = useState(false)

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
    setLoading(false);
  }, [theme]);


const [Changing,setChanging] = useState(false);


  const [title, setTitle] = useState<string>('Title');

  const [Dicrtiption, setDescription] = useState<string>('Discription goes here ...');
  const [image, setImage] = useState<any> ("/assets/empty.jpg");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
const [load,setLoad] = useState(false)


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(imageUrl);
    }
  };
  const [tags, setTags] = useState<string[]>([]);

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    const value = e.currentTarget.value.trim();

    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
      e.currentTarget.value = ""; // Clear input after adding tag
    }
  }
};

const removeTag = (index: number) => {
  setTags(tags.filter((_, i) => i !== index));
};

  

  const hadnelPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true)
const upl = await handelUpload(image)
let link = ''
if(upl?.status){
link = upl.link
}
    const Data = {
      title: title,
      image: link,
      description: Dicrtiption,
      content :docu,
      tags : tags,
    }
await axios.post(`${baseUrl}/saveBlog`, {Data}).then((res)=>{
if(res.data){
  setLoad(false);
}

})
  
  };

  return (
<>
{
  Loading ? <Loader/> : null
}
{
  Changing ? <Themes setCh = {setChanging} /> : ''
}
<div className="w-full flex">

<div className="w-full min-h-[100vh] bg-[#edf4f6] flex flex-col dark:bg-gray-800">
<Nav AsideT = {AsideT} setAside = {setAside} />
<Aside AsideT = {AsideT} setAsideT= {setAside}  />
<section className="p-6 w-full h-full dark:bg-gray-700">

<div className="page_title" id="with_menu" >
  <p className='font-semibold dark:text-white'>Dashboard / Blog Editor</p>
  <h1 className="text-2xl text-left font-bold mb-4 dark:text-white">Create a New Blog Post</h1>
</div>
<div className="w-full flex gap-3">


 <div className="w-full flex gap-3">
<form onSubmit={hadnelPost} className='w-full bg-white shadow-xl rounded-sm p-4 dark:bg-gray-900'>
<div className="w-full flex flex-col gap-2">
  <label htmlFor="title">Title :</label>
  <input type="text" className='w-full p-2 outline-none dark:bg-gray-600 rounded-sm dark:text-white dark:placeholder:text-white' placeholder='Blog Title : ' onChange={(e)=>{
    setTitle(e.target.value)
  }} />
</div>
<div className="w-full flex flex-col gap-2">
  <label htmlFor="Categorie">Blog Categories & Tags:</label>
  <div className="w-full p-2 outline-none flex flex-wrap gap-2  dark:bg-gray-600 rounded-sm dark:text-white dark:placeholder:text-white">
    {tags.map((tag, index) => (
      <div key={index} className="bg-blue-400 text-white px-2 py-1 rounded flex items-center">
        {tag}
        <button 
          type="button" 
          className="ml-2 text-sm text-white bg-gray-300  rounded-full w-4 h-4 flex items-center justify-center"
          onClick={() => removeTag(index)}
        >
          ×
        </button>
      </div>
    ))}
    <input 
      type="text" 
      className="w-full p-2 outline-none dark:bg-gray-600 rounded-sm dark:text-white dark:placeholder:text-white" 
      placeholder="Type and press Enter..." 
      onKeyDown={handleKeyDown} 
    />
  </div>
</div>

<div className="w-full flex flex-col gap-2">
  <label htmlFor="file">Blog image :</label>
  <input 
  type="file" 
  className='w-full p-2 outline-none dark:bg-gray-600' 
  accept="image/*" 
  onChange={handleFileChange} 
/>

</div>

<div className="w-full flex flex-col gap-2">
  <label htmlFor="disc"> Discription  :</label>
  <textarea name="disc" id="disc" placeholder='Dicrtiption ...' value={Dicrtiption} onChange={(e)=>{
    setDescription(e.target.value);
  }} className='w-full p-2 outline-none dark:bg-gray-600 rounded-sm dark:text-white dark:placeholder:text-white'></textarea>
</div>

<div className="w-full flex flex-col gap-2 mt-2">
  <label htmlFor="content">Content :</label>
    <MyEditor initialContent={""} setContent = {setDocu} />
 

</div>
<button type='submit' className='bg-blue-400 p-2 text-white rounded-sm cursor-pointer float-right' disabled = {load} >{
  load ? 'loading ..' : <>
  Submit
  </>
  }</button>
</form>

 </div>
 

    <div className="w-full flex bg-white shadow-xl rounded-sm  flex-col gap-3 p-4 dark:bg-gray-900">
  <h1 className='font-semibold dark:text-gray-300'>Blog OverView</h1>

  <div className="w-full p-2 flex flex-col gap-2">
  <img src={imagePreview || image} alt="file" className='w-full h-[50vh] rounded-sm' />

  <div className="w-full flex flex-col gap-2 p-2">
  <h1 className='font-semibold uppercase text-blue-400 '>{title}</h1>
  <p>{Dicrtiption}</p>
  <hr className='w-full h-1 bg-gray-400' />
  <p>Tags :</p>
<div className="w-full flex flex-wrap gap-2">
  
{
    tags.map((item,index)=>(
      <span key={index} className='bg-blue-400 text-white p-1 rounded-sm
      '>{item}</span>
    ))
  }
</div>
  <button className='p-2 text-white outline-none border-none bg-blue-400 rounded-md'>READ MORE</button>

  <hr className='w-full h-1 bg-gray-400' />
  // Content

<MyComponent full= {docu} />


  </div>
  </div>
</div>
</div>

<button className="fixed justify-center right-10 bottom-10 rounded-full w-11 h-11 text-center items-center outline-none border-none cursor-pointer flex p-2 bg-blue-400 text-white"
onClick={()=>{
  setChanging(true);
}}
>
  <i className="ri-settings-line"></i>
</button>
</section>
</div>
</div>

</>
  );
};

export default BlogEditor;