import { useState } from "react";
import { NFTStorage, File } from "nft.storage";
import { MemeJarService } from "./../../../hooks/memeJarCall";
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import {AuthService} from "../../../hooks/zkLogin";

const Create = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    image: null,
  });
  const [memeId, setMemeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error messages


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
    setIsLoading(true); // Set loading state

    const imageFile = formData.image;
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      console.error('The uploaded file is not an image');
      return;
    }

    let meta_url;
    try {
      const client = new NFTStorage({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxRTQ2RTMwNjc5YTIxMjYwMmYwRkI5ZTJGODQ5YWMzMzQxNTBjQzEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcxNzA3NjEwNTUxNCwibmFtZSI6Im1lbWVqYXIifQ.HEs4oln_DaG11g-8RhIsiB-kSSf0txJ9SMOSsiW4ZFI",
      });
      // Create metadata object according to ERC721 Metadata JSON Schema
    const metadata = {
      name: formData.description, // or another field for name
      description: formData.description,
      image: new File([imageFile], imageFile.name, { type: imageFile.type }),
      // Add other properties if needed
      properties: {
        fileType: imageFile.type, // Example additional property
      },
    };

    const storedMetadata = await client.store(metadata);
    const meta_url = storedMetadata.url;
    console.log('Metadata URL:', meta_url);

    } catch (err) {
      console.error("Error uploading metadata to IPFS:", err);
      setError("Error uploading meme data."); // Set error message
      setIsLoading(false);
      return;
    }
    const sender = AuthService.walletAddress();

    try {
      const memeJarService = new MemeJarService();
      const memeData = {
        name: formData.description,
        url: "Hello Sui World",
        // id: uuidv4(), // Generate a unique ID
        // likes: 1,
        // poster: sender,
      };
      const result = await memeJarService.post_meme(memeData);
      console.log("Meme posted successfully:", result);
      setMemeId(result.id); // Assuming `result.id` contains the ID of the posted meme
      setError(null); // Clear any previous error
    } catch (err) {
      console.error("Error posting meme:", err);
      setError("Error creating meme post."); // Set error message
    } finally {
      setIsLoading(false); // Clear loading state
      setFormData({ description: "", image: null }); // Reset form data
      setImagePreview(null);
      e.target.reset();
    }
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
            className="mb-4 w-full border-2 border-gray-300 bg-white/5  rounded-md file:border-none file:text-ms file:font-medium file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 p-2"
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
              className="w-1/3 h-auto rounded-md"
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

        {isLoading && (
          <p className="text-center text-blue-700">Posting meme...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        <div className="bg-[#667bf0fd] justify-center mx-auto text-white rounded-full p-3 w-80 text-center font-bold mt-12 hover:bg-[#a3b0f7fd] cursor-pointer">
          <button className="text-xl" disabled={isLoading}>
            {isLoading ? "Posting..." : "Create Post"}
          </button>
        </div>
      </form>

      {memeId && (
        <div className="text-white text-center mt-4">
          <p>Meme ID: {memeId}</p>
          <p>Your meme has been successfully posted!</p>
        </div>
      )}
    </div>
  );
};

export default Create;
