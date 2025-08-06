import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({image, setImage, file}) => {

  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  const handleImageChange = (e) =>{
    if(file){
        setImage(file);

        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview)
    }
  };

  const handleRemoveChange = () =>{

    setImage(null);
    setPreviewUrl(null)

  };

  const onChooseFile = () =>{
    inputRef.current.click()
  }
  return (
    <div className="flex justify-center mb-6">
        <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
        />

        {!image ? (
            <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                <LuUser className="text-4xl text-primary"/>
                <button
                 type="button"
                 onClick={onChooseFile}
                 className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1">

                    <LuUpload className=""/>

                </button>
            </div>
        ) : (
            <div className="relative">
                <img
                src={previewUrl}
                alt="profile photo"
                className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
                />

                <button
                type="button"
                onClick={handleRemoveChange}
                className=""
                >
                    <LuTrash/>
                    
                </button>

            </div>
        )}

    </div>
  )
}

export default ProfilePhotoSelector