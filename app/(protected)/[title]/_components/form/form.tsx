import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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

const ITEM_TYPE = "FORM_COMPONENT";

interface ComponentProps {
  component: any;
  index: number;
  moveComponent: (fromIndex: number, toIndex: number) => void;
  children: React.ReactNode;
}

interface DragItem {
  index: number;
}

const DraggableComponent: React.FC<ComponentProps> = ({
  component,
  index,
  moveComponent,
  children,
}) => {
  const [, ref] = useDrag<DragItem>({
    type: ITEM_TYPE,
    item: { index },
  });

  const [, drop] = useDrop<DragItem>({
    accept: ITEM_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveComponent(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="p-4 border rounded">
      {children}
    </div>
  );
};

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
      value: "",
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

  const moveComponent = (fromIndex: number, toIndex: number) => {
    setComponents((prev) => {
      const updatedComponents = [...prev];
      const [movedComponent] = updatedComponents.splice(fromIndex, 1);
      updatedComponents.splice(toIndex, 0, movedComponent);
      return updatedComponents;
    });
  };

  const renderComponent = (component: any, index: number) => {
    const commonProps = {
      key: index,
      value: component.value,
      onSave: (newValue: string) => handleEditComponent(index, newValue),
      onEdit: () => handleEditComponent(index, component.value),
      onDelete: () => handleDeleteComponent(index),
    };

    switch (component.type) {
      case "textArea":
        return <TextArea {...commonProps} />;
      case "numericRating":
        return <NumericRating {...commonProps} />;
      case "starRating":
        return <StarRating {...commonProps} />;
      case "smileRating":
        return <SmileRating {...commonProps} />;
      case "singleLineInput":
        return <SingleLineInput {...commonProps} />;
      case "radioButton":
        return <RadioButton {...commonProps} />;
      case "categories":
        return <Categories {...commonProps} />;
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
    <DndProvider backend={HTML5Backend}>
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
              <DraggableComponent
                key={index}
                component={component}
                index={index}
                moveComponent={moveComponent}
              >
                {renderComponent(component, index)}
              </DraggableComponent>
            ))}
          </div>
        </div>

        {/* Right side: Options menu */}
        <div className="w-1/4 p-4 bg-white border-l flex flex-col justify-between min-h-screen">
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
              {/* Component Add Buttons */}
              <div>
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
              </div>

              {/* Place "Drag and drop components onto the form" at the bottom */}
              <div className="flex flex-col items-center justify-end h-full">
                <div className="text-gray-600 text-sm mt-auto">
                  Drag and drop components onto the form
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
