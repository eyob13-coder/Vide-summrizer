import { useState } from "react";
import apiService from "../../services/api";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
    setMessage("");
    setProgress(0);
  };

  const handleUpload = async () => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("video", file);

      const response = await apiService.uploadVideo(formData, (evt) => {
        if (!evt.total) return;
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      });

      setMessage("Upload successful!");
      console.log("Uploaded:", response.data);
    } catch (error) {
      console.error(error);
      setMessage(error?.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-center">
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {preview && <video src={preview} controls className="mt-4 w-full rounded-lg" />}
      {progress > 0 && (
        <div className="mt-2 text-sm text-gray-600">{progress}%</div>
      )}
      {message && (
        <div className="mt-2 text-sm text-gray-700">{message}</div>
      )}
      <button onClick={handleUpload} className="btn-primary mt-4">Upload Video</button>
    </div>
  );
};

export default UploadVideo;
