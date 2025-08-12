export const canUpload = () => {
    const count = parseInt(localStorage.getItem("guestUploads") || "0");
    return count < 1; 
  };
  
  export const incrementUploadCount = () => {
    const count = parseInt(localStorage.getItem("guestUploads") || "0");
    localStorage.setItem("guestUploads", count + 1);
  };
  