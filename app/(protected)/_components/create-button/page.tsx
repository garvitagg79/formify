"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface CreateButtonProps {
  onClick: () => void;
}

export default function CreateButton({ onClick }: CreateButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-60 h-auto border-2 border-gray-300 rounded-lg shadow-md p-4 mr-4 flex flex-col items-center justify-center gap-2 transition-colors duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        <PlusIcon className="w-16 h-16 text-black" />
      </div>
      <p className="text-black text-lg font-semibold">New Form</p>
    </Button>
  );
}
