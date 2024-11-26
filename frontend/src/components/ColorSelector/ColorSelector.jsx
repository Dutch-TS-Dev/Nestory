/* eslint-disable react/prop-types */
import { useState } from "react";

const ColorSelector = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState("");

  const colors = [
    { name: "White", code: "bg-white" },
    { name: "Gray", code: "bg-gray-400" },
    { name: "Black", code: "bg-black" },
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color.code);
    if (onColorChange) {
      onColorChange(color.name);
    }
  };

  return (
    <div className="color mt-6 ">
      <div className="parent flex items-center">
        <label className="font-semibold text-2xl mr-4">Color</label>
        <div className="colors flex space-x-4">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`w-14 h-14 rounded-full border ${
                selectedColor === color.code
                  ? "border-gray-800"
                  : "border-gray-300"
              } flex items-center justify-center`}
              onClick={() => handleColorChange(color)}
            >
              <span className={`w-10 h-10 rounded-full ${color.code}`}></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
