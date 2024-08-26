import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TextArea from "./_components/TextArea";
import NumericRating from "./_components/NumericRating";
import StarRating from "./_components/StarRating";
import SmileRating from "./_components/SmileRating";
import SingleLineInput from "./_components/SingleLineInput";
import RadioButton from "./_components/RadioButton";
import Categories from "./_components/Categories";
import {
  ArrowUp01,
  ChevronLeft,
  ClipboardType,
  FileType2,
  List,
  Logs,
  Pencil,
  PlusIcon,
  Smile,
  Star,
} from "lucide-react";

export default function MainForm() {
  const { title } = useParams();
  const router = useRouter();
  const [formattedTitle, setFormattedTitle] = useState<string | null>(null);
  const [components, setComponents] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (Array.isArray(title)) {
      setFormattedTitle(title[0].replace(/-/g, " ") || null);
    } else {
      setFormattedTitle(title?.replace(/-/g, " ") || null);
    }
  }, [title]);

  useEffect(() => {
    const storedComponents = sessionStorage.getItem(formattedTitle || "");
    if (storedComponents) {
      setComponents(JSON.parse(storedComponents));
    }
  }, [formattedTitle]);

  useEffect(() => {
    sessionStorage.setItem(formattedTitle || "", JSON.stringify(components));
  }, [components, formattedTitle]);

  if (!formattedTitle) return <div>Loading...</div>;

  const handleAddComponent = (type: string) => {
    const newComponent = {
      type: type,
      value: "", // Initialize value if needed
    };
    setComponents((prev) => [...prev, newComponent]);
  };

  const handleEditComponent = (index: number, newValue: string) => {
    setComponents((prev) => {
      const updatedComponents = [...prev];
      updatedComponents[index] = {
        ...updatedComponents[index],
        value: newValue,
      };
      return updatedComponents;
    });
  };

  const renderComponent = (component: any, index: number) => {
    switch (component.type) {
      case "textArea":
        return (
          <TextArea
            key={index}
            value={component.value}
            onSave={(newValue) => handleEditComponent(index, newValue)}
            onDelete={() => handleDeleteComponent(index)}
            onEdit={() => handleEditComponent(index, component.value)}
          />
        );
      case "numericRating":
        return (
          <NumericRating
            key={index}
            value={component.value}
            onSave={(newValue) => handleEditComponent(index, newValue)}
            onEdit={() => handleEditComponent(index, component.value)}
            onDelete={() => handleDeleteComponent(index)}
          />
        );
      case "starRating":
        return (
          <StarRating
            key={index}
            value={component.value}
            onSave={(newValue) => handleEditComponent(index, newValue)}
            onEdit={() => handleEditComponent(index, component.value)}
            onDelete={() => handleDeleteComponent(index)}
          />
        );
      case "smileRating":
        return (
          <SmileRating
            key={index}
            value={component.value}
            onSave={(newValue) => handleEditComponent(index, newValue)}
            onEdit={() => handleEditComponent(index, component.value)}
            onDelete={() => handleDeleteComponent(index)}
          />
        );
      case "singleLineInput":
        return (
          <SingleLineInput
            key={index}
            value={component.value}
            onSave={(newValue) => handleEditComponent(index, newValue)}
            onDelete={() => handleDeleteComponent(index)}
            onEdit={() => handleEditComponent(index, component.value)}
          />
        );
      case "radioButton":
        return (
          <RadioButton
            key={index}
            value={component.value}
            onSave={(newValue) => handleEditComponent(index, newValue)}
            onEdit={() => handleEditComponent(index, component.value)}
            onDelete={() => handleDeleteComponent(index)}
          />
        );
      case "categories":
        return (
          <Categories
            key={index}
            value={component.value}
            onSave={(newValue) => handleEditComponent(index, newValue)}
            onEdit={() => handleEditComponent(index, component.value)}
            onDelete={() => handleDeleteComponent(index)}
          />
        );
      default:
        return null;
    }
  };

  const handleDeleteComponent = (index: number) => {
    setComponents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTitleEdit = () => {
    setIsEditing(true);
    setNewTitle(formattedTitle || "");
  };

  const handleTitleSave = () => {
    const updatedTitle = newTitle.replace(/\s+/g, "-").toLowerCase();
    sessionStorage.setItem(updatedTitle, JSON.stringify(components));
    sessionStorage.removeItem(formattedTitle || "");
    setFormattedTitle(newTitle);
    setIsEditing(false);
    router.push(`/${updatedTitle}`);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewTitle("");
  };

  return (
    <div className="flex justify-between items-start min-h-screen">
      <div className="w-[40%] ml-60 border mt-6 mb-6 border-gray-400 rounded">
        <div className="space-y-4">
          <div className="flex flex-row font-bold text-lg bg-blue-500 items-center text-white p-3 justify-between">
            <div className="flex flex-row items-center">
              <ChevronLeft className="w-6 h-6 mr-2" />
              {formattedTitle}
            </div>
            <Pencil
              className="w-5 h-5 mr-4 cursor-pointer"
              onClick={handleTitleEdit}
            />
          </div>
          {components.map((component, index) => (
            <div className="p-4 border rounded" key={index}>
              {renderComponent(component, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Options menu */}
      <div className="w-1/4 p-4 bg-white border-l">
        {isEditing ? (
          <div className="">
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="ghost"
                onClick={handleCancelEdit}
                className="flex items-center"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </Button>

              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleTitleSave}
              >
                Save
              </Button>
            </div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter new form name"
            />
          </div>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => handleAddComponent("textArea")}
              className="w-full mb-4 justify-between items-center"
            >
              <div className="flex flex-row items-center justify-center">
                <ClipboardType className="w-5 h-5 mr-4" />
                Add TextArea
              </div>
              <PlusIcon className="w-6 h-6 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleAddComponent("numericRating")}
              className="w-full mb-4 justify-between items-center"
            >
              <div className="flex flex-row items-center justify-center">
                <ArrowUp01 className="w-5 h-5 mr-4" />
                Add Numeric Rating
              </div>
              <PlusIcon className="w-6 h-6 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleAddComponent("starRating")}
              className="w-full mb-4 justify-between items-center"
            >
              <div className="flex flex-row items-center justify-center">
                <Star className="w-5 h-5 mr-4" />
                Add Star Rating
              </div>
              <PlusIcon className="w-6 h-6 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleAddComponent("smileRating")}
              className="w-full mb-4 justify-between items-center"
            >
              <div className="flex flex-row items-center justify-center">
                <Smile className="w-5 h-5 mr-4" />
                Add Smile Rating
              </div>
              <PlusIcon className="w-6 h-6 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleAddComponent("singleLineInput")}
              className="w-full mb-4 justify-between items-center"
            >
              <div className="flex flex-row items-center justify-center">
                <FileType2 className="w-5 h-5 mr-4" />
                Add Single Line Input
              </div>
              <PlusIcon className="w-6 h-6 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleAddComponent("radioButton")}
              className="w-full mb-4 justify-between items-center"
            >
              <div className="flex flex-row items-center justify-center">
                <List className="w-5 h-5 mr-4" />
                Add Radio Button
              </div>
              <PlusIcon className="w-6 h-6 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleAddComponent("categories")}
              className="w-full mb-4 justify-between items-center"
            >
              <div className="flex flex-row items-center justify-center">
                <Logs className="w-5 h-5 mr-4" />
                Add Categories
              </div>
              <PlusIcon className="w-6 h-6 text-blue-600" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
