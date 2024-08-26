import { Pencil, Trash, Plus } from "lucide-react";
import { useState, useEffect } from "react";

interface RadioButtonProps {
  onEdit: (categories: string[]) => void; // Expect an array of strings for editing
  onDelete: (value: string) => void; // Expect a string value for deleting
  value: string;
  onSave: (newValue: string) => void;
}

export default function RadioButton({
  onEdit,
  onDelete,
  value,
  onSave,
}: RadioButtonProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState(value);
  const [tempValueCategories, setTempValueCategories] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [isEditingCategories, setIsEditingCategories] = useState(false);
  const [currEdit, setCurrEdit] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    if (selected) {
      const updatedCategories = categories.map((cat) =>
        cat === selected ? tempValueCategories : cat
      );
      setCategories(updatedCategories);
      onEdit(updatedCategories);
    }
    setIsEditing(false);
    setIsEditingCategories(false);
    setIsEditingTitle(false);
    onSave(tempValue);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    setTempValueCategories(option); // Set the selected category as the temp value for editing
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setNewCategory("");
      onEdit(updatedCategories);
    }
  };

  const handleDeleteCategory = (category: string) => {
    const updatedCategories = categories.filter((cat) => cat !== category);
    setCategories(updatedCategories);
    if (selected === category) {
      setSelected(null);
      setIsEditingTitle(false);
    }
  };

  const handleEditCategory = (curr: string) => {
    setCurrEdit(curr);
    setTempValueCategories(curr);
    setIsEditingCategories(true);
  };

  const handleSaveCategory = () => {
    const updatedCategories = categories.map((cat) =>
      cat === currEdit ? tempValueCategories : cat
    );
    setCategories(updatedCategories);
    setIsEditingCategories(false);
    setSelected(null); // Clear selection after editing
    onEdit(updatedCategories);
  };

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

        {/* Categories Section */}
        <div className="mb-4">
          {categories.map((option) => (
            <div key={option} className="flex items-center mb-2">
              <label
                onClick={() => handleSelect(option)}
                className="flex items-center space-x-2"
              >
                <input
                  type="radio"
                  value={option}
                  checked={selected === option}
                  onChange={() => handleSelect(option)}
                  className={`p-2 border rounded flex-1 text-left ${
                    selected === option ? "bg-blue-500 text-white" : "bg-white"
                  }`}
                />
                <span>{option}</span>
              </label>

              <button
                onClick={() => handleEditCategory(option)}
                className="ml-2 p-2 hover:bg-gray-100"
              >
                <Pencil className="w-5 h-5 text-gray-500" />
              </button>
              <button
                onClick={() => handleDeleteCategory(option)}
                className="ml-2 p-2 hover:bg-gray-100"
              >
                <Trash className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Category Section */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new option"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleAddCategory}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Title Section */}
        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 hover:bg-gray-100"
          >
            <Pencil className="w-5 h-5 text-gray-500" />
          </button>
          <button
            onClick={() => onDelete(value)}
            className="p-2 hover:bg-gray-100"
          >
            <Trash className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Edit Category Section */}
      {isEditingCategories && (
        <div>
          <textarea
            value={tempValueCategories}
            onChange={(e) => setTempValueCategories(e.target.value)}
            placeholder="Enter option"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSaveCategory}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditingCategories(false)}
              className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Feedback Section */}
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
