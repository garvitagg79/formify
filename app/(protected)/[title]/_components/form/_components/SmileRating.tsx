import { Pencil, Trash, Annoyed, Frown, Meh, Smile, Laugh } from "lucide-react";
import { useState, useEffect } from "react";

interface SmileRatingProps {
  onEdit: () => void;
  onDelete: () => void;
  value: string;
  onSave: (newValue: string) => void;
}

export default function SmileRating({
  onEdit,
  onDelete,
  value,
  onSave,
}: SmileRatingProps) {
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

  // Use an array to map rating values to icons
  const iconMap = [
    <Annoyed key={1} size={24} />,
    <Frown key={2} size={24} />,
    <Meh key={3} size={24} />,
    <Smile key={4} size={24} />,
    <Laugh key={5} size={24} />,
  ];

  return (
    <div className="bg-white">
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
          {iconMap.map((icon, index) => (
            <span
              key={index}
              onClick={() => setRating(index + 1)}
              className={`cursor-pointer ${
                index < rating ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              {icon}
            </span>
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
