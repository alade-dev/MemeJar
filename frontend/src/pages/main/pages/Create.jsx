import { useState } from "react";
import { NFTStorage, File } from "nft.storage";
import { MemeJarService } from "./../../../hooks/memeJarCall";
import { v4 as uuidv4 } from 'uuid'; // Import uuid


const Create = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    image: null,
  });
  const [memeId, setMemeId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
    document.getElementById("banner").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let meta_url;
    try {
      const client = new NFTStorage({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdjMTVkRTM4NUU0Mzc1M0RBODNGZUE0NjgzZkZhMzc4RTFjZTUyZjEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODk3NjUxMTc3NCwibmFtZSI6IkRvY1QifQ.t7bF1OuxuS6S9QMP_rfl72fYMneOa1jzs-mZhdjEhog",
      });
      const imageFile = new File([formData.image], formData.description);
      const metadata = await client.store({
        name: formData.description,
        image: imageFile,
        description: formData.description,
      });
      meta_url = metadata.url;
    } catch (err) {
      console.error("Error uploading metadata to IPFS:", err);
      return;
    }

    try {
      const memeJarService = new MemeJarService();
      const memeData = {
        name: formData.description,
        url: meta_url,
        id: uuidv4(), // Generate a unique ID if necessary
        likes: 0,
      };
      const result = await memeJarService.post_meme(memeData);
      console.log("Meme posted successfully:", result);
      setMemeId(result.id); // Assuming `result.id` contains the ID of the posted meme
    } catch (err) {
      console.error("Error posting meme:", err);
    }

    setFormData({
      description: "",
      image: null,
    });
    setImagePreview(null);
    e.target.reset();
  };

  return (
    <div>
      <h1 className="text-white font-semibold text-3xl text-center my-10">
        Post a Meme
      </h1>

      <form
        onSubmit={handleSubmit}
        className="text-center bg-slate-50 w-3/4 p-7 rounded-xl mx-auto"
      >
        <div className="text-xl text-black">
          <input
            accept="image/png, image/svg+xml, image/jpeg, image/gif"
            type="file"
            required
            onChange={handleFileChange}
            name="upload"
            id="banner"
            alt=""
          />
          <p className="text-gray-500 text-sm mt-1">
            PNG, SVG, JPG, or GIF file, file size 800*400px
          </p>
        </div>

        <div className="text-xl flex-1 mx-auto my-3 -ml-2 text-black">
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            cols="40"
            rows="5"
            placeholder="Description"
            className="bg-[#a8b8e4] w-[380px] placeholder:text-white p-3 text-white-200 outline-none border-none rounded-xl"
          ></textarea>
        </div>

        {imagePreview && (
          <div className="mb-4 relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-1/2 h-auto rounded-md"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 lg:left-[300px] left-[150px] text-red-600"
              aria-label="Delete image"
            >
              X
            </button>
          </div>
        )}

        <div className="bg-[#667bf0fd] text-white rounded-full p-3 text-center font-bold mt-12 hover:bg-[#a3b0f7fd] cursor-pointer">
          <button className="text-xl">Create Post</button>
        </div>
      </form>

      {memeId && (
        <div className="text-white text-center mt-4">
          <p>Meme ID: {memeId}</p>
        </div>
      )}
    </div>
  );
};

export default Create;
