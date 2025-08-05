import React, { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";


const UploadDemo = () => {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setSummary("");
      
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSummary(res.data.summary || "AI summary generated successfully!");
    } catch (err) {
      console.error(err);
      setSummary("Error: Could not process the video.");
    } finally {
      setLoading(false);
    }
  };

  return (
   
  
    <section className="section bg-white text-center">
      <h2 className="section-title text-gradient">Try It Yourself</h2>
      <p className="section-subtitle">
        Upload a short video and see how our AI generates instant highlights.
      </p>

      {/* Upload box */}
      <div className="border-2 border-dashed border-gray-300 p-10 rounded-xl mt-10 max-w-xl mx-auto hover:border-indigo-500 transition cursor-pointer">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="fileUpload"
        />
        <label htmlFor="fileUpload" className="flex flex-col items-center">
          <FaCloudUploadAlt className="text-5xl text-indigo-600 mb-4" />
          {file ? (
            <p className="font-medium text-gray-700">{file.name}</p>
          ) : (
            <p className="text-gray-500">Drag & drop or click to upload video</p>
          )}
        </label>
      </div>

      {/* Upload button */}
      <button
        className="btn-primary mt-6"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload & Summarize"}
      </button>

      {/* Summary output */}
      {summary && (
        <div className="mt-6 max-w-xl mx-auto bg-gray-50 border border-gray-200 p-6 rounded-xl text-left shadow">
          <h3 className="font-semibold text-lg mb-2">AI Summary:</h3>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </section>
  )
}

export default UploadDemo