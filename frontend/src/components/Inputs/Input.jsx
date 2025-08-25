import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({ value, onChange, placeholder, label, type, className = '' }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <label className='text-sm font-medium text-gray-700 mb-2 block'>{label}</label>
      <div className="relative">
        <input 
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${className}`}
          onChange={onChange}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <FaRegEye size={18} className="text-gray-500" />
            ) : (
              <FaRegEyeSlash size={18} className="text-gray-500" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input