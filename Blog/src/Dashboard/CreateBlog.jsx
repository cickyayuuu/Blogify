import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogTopic, setBlogTopic] = useState(""); // New state for topic
  const [loading, setLoading] = useState(false); // Loading state for AI response
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(
        "http://localhost:5505/api/blogs/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message || "Blog posted successfully!");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogTopic("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Please fill in all required fields.");
    }
  };

  return (
    <div>
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-8">Create Blog</h3>
          <form onSubmit={handleCreateBlog} className="space-y-6">
            
            {/* Blog Topic Input */}
           

            {/* Generate Blog Button */}
            {/* <button
              type="button"
              onClick={generateBlogContent}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Blog Content"}
            </button> */}

            <div className="space-y-2">
              <label className="block text-lg">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Blog Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={blogImagePreview ? blogImagePreview : "/imgPL.webp"}
                  alt="Blog"
                  className="w-full max-w-sm h-auto rounded-md object-cover"
                />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">About</label>
              <textarea
                rows="5"
                placeholder="Write something about your blog"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              Post Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
