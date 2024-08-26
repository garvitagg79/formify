"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DialogComponentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogComponent({
  isOpen,
  onOpenChange,
}: DialogComponentProps) {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    // Trim the title and remove spaces
    const formattedTitle = title.trim().replace(/\s+/g, "-");
    if (formattedTitle) {
      // Redirect to the create page with the formatted title in the URL path
      router.push(`/${encodeURIComponent(formattedTitle)}`);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Create Feedback Form
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill out the form details and click "Create" to create a new
            feedback form.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label htmlFor="title" className="mb-4">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
                placeholder="Enter form title"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
          >
            Create
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-2 border-gray-400"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
