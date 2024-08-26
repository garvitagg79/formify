import { useState, useEffect } from "react";
import { Star, Pencil, Trash } from "lucide-react";

interface StarRatingProps {
  onEdit: () => void;
  onDelete: () => void;
  value: string;
  onSave: (newValue: string) => void;
}

export default function StarRating({
  onEdit,
  onDelete,
  value,
  onSave,
}: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [tempValue, setTempValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  return (
    <div className=" bg-white ">
      <div className="mb-2">
        {isEditingTitle ? (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            className="w-full p-2 border rounded"
            autoFocus
          />
        ) : (
          <p className="text-lg pb-2">
            {tempValue === "" ? "Add question" : tempValue}
          </p>
        )}
        <div className="flex items-center space-x-2 pb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              onClick={() => setRating(i + 1)}
              className={`cursor-pointer ${
                i < rating ? "text-yellow-500" : "text-gray-400"
              }`}
              size={28}
              fill="currentColor" // This ensures the icon uses the current text color
            />
          ))}
        </div>
        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 hover:bg-gray-100"
          >
            <Pencil className="w-5 h-5 text-gray-500" />
          </button>
          <button onClick={onDelete} className="p-2 hover:bg-gray-100">
            <Trash className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Feedback Section */}
      {isEditing && (
        <div>
          <p className="text-lg pb-2">Edit question</p>
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            placeholder="Enter question"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
