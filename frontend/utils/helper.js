export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  

  export const canUpload = () => {
    const count = parseInt(localStorage.getItem("guestUploads") || "0");
    return count < 1; 
  };
  
  export const incrementUploadCount = () => {
    const count = parseInt(localStorage.getItem("guestUploads") || "0");
    localStorage.setItem("guestUploads", count + 1);
  };
  