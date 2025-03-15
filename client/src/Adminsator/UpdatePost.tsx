import Nav from '../components/AdmiComponents/Nav';
import { handelUpload } from '../Logic/UploadFile';
import { useEffect, useState } from 'react';
import Themes from '../components/AdmiComponents/Themes';
import Aside from '../components/AdmiComponents/Aside';
import MyEditor101 from '../components/AdmiComponents/BlogTXT';
import axios from 'axios';
import MyComponent from '../components/Frame';
import { useLocation } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
interface BlogPost {
  _id: string;
  title: string;
  content: string;
  image: string;
  description: string;
  tags: string[];
}

const UpdatePosts: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [item, setItem] = useState<BlogPost>({
    _id: '',
    title: '',
    content: '',
    image: '',
    description: '',
    tags: []
  });
  const [docu, setDocu] = useState('');
  const [AsideT, setAside] = useState(false);
  const [Changing, setChanging] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(theme)
  }, [theme]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${baseUrl}/getPostWithid/${id}`);
        if (res.data.message) {
          const post = res.data.message;
          setItem(post);
          setTitle(post.title);
          setDescription(post.description);
          setImagePreview(post.image);
          setDocu(post.content);
          setTags(post.tags || []);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        alert('Error loading post data');
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        e.currentTarget.value = "";
      }
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);

    try {
      let imageUrl = item.image;
      
      // Upload new image if selected
      if (imageFile) {
        const uploadResult = await handelUpload(imageFile);
        if (uploadResult?.status) {
          imageUrl = uploadResult.link;
        }
      }

      const updatedPost = {
        title,
        description,
        content: docu,
        image: imageUrl,
        tags
      };

      const response = await axios.post(
        `${baseUrl}/updatePost1024/${id}`,
        updatedPost
      );

      if (response.data.success) {
        alert('Post updated successfully!');
        // Optionally redirect or update local state
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating post');
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      {Changing && <Themes setCh={setChanging} />}
      <div className="w-full flex">
        <div className="w-full min-h-[100vh] bg-[#edf4f6] flex flex-col dark:bg-gray-800">
          <Nav AsideT={AsideT} setAside={setAside} />
          <Aside AsideT={AsideT} setAsideT={setAside} />
          
          <section className="p-6 w-full h-full dark:bg-gray-700">
            <div className="page_title" id="with_menu">
              <p className='font-semibold dark:text-white'>Dashboard / Update Post</p>
              <h1 className="text-2xl text-left font-bold mb-4 dark:text-white">Update Blog Post</h1>
            </div>

            <div className="w-full flex gap-3 flex-col lg:flex-row">
              {/* Edit Form */}
              <form onSubmit={handleSubmit} className='w-full lg:w-2/3 bg-white shadow-xl rounded-sm p-4 dark:bg-gray-900'>
                <div className="flex flex-col gap-4">
                  {/* Title Input */}
                  <div className="flex flex-col gap-1">
                    <label className="dark:text-gray-300">Title:</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                      required
                    />
                  </div>

                  {/* Tags Input */}
                  <div className="flex flex-col gap-1">
                    <label className="dark:text-gray-300">Tags:</label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded dark:bg-gray-800">
                      {tags.map((tag, index) => (
                        <div key={index} className="flex items-center bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                          <span className="dark:text-white">{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-2 text-sm text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        className="flex-1 p-1 bg-transparent outline-none dark:text-white"
                        placeholder="Add tag (press Enter)"
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="flex flex-col gap-1">
                    <label className="dark:text-gray-300">Featured Image:</label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full p-2 border rounded dark:bg-gray-800"
                      accept="image/*"
                    />
                  </div>

                  {/* Description Textarea */}
                  <div className="flex flex-col gap-1">
                    <label className="dark:text-gray-300">Description:</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border rounded h-32 dark:bg-gray-800 dark:text-white"
                      required
                    />
                  </div>

                  {/* Content Editor */}
                  <div className="flex flex-col gap-1">
                    <label className="dark:text-gray-300">Content:</label>
                    <MyEditor101 setContent={setDocu}  />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={load}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded self-end"
                  >
                    {load ? 'Updating...' : 'Update Post'}
                  </button>
                </div>
              </form>

              {/* Preview Section */}
              <div className="w-full lg:w-1/3 bg-white shadow-xl rounded-sm p-4 dark:bg-gray-900">
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">Preview</h2>
                <div className="space-y-4">
                  <img 
                    src={imagePreview || item.image} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
                  <p className="dark:text-gray-300">{description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded text-sm dark:text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <MyComponent full={docu} />
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              className="fixed right-10 bottom-10 rounded-full w-11 h-11 flex items-center justify-center bg-blue-500 text-white shadow-lg hover:bg-blue-600"
              onClick={() => setChanging(true)}
            >
              <i className="ri-settings-line"></i>
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default UpdatePosts;