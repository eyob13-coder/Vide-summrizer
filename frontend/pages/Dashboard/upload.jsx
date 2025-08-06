import { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("video", file);

    await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        console.log(
          `Upload progress: ${Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          )}%`
        );
      },
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-center">
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {preview && <video src={preview} controls className="mt-4 w-full rounded-lg" />}
      <button onClick={handleUpload} className="btn-primary mt-4">Upload Video</button>
    </div>
  );
};

export default UploadVideo;
