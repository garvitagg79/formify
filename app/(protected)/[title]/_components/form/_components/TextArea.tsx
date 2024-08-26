import { Pencil, Trash } from "lucide-react";
import { useState, useEffect } from "react";

// Define the props type for the component
interface TextAreaProps {
  value: string;
  onSave: (newValue: string) => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function TextArea({
  value,
  onSave,
  onDelete,
  onEdit,
}: TextAreaProps) {
  const [value2, setValue] = useState("");
  const [tempValue, setTempValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Synchronize tempValue with the value prop
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  return (
    <div className="bg-white">
      {/* Title Section */}
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
          <textarea
            value={value2}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter text"
            className="w-full p-2 border rounded"
          />
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
