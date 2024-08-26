// app/(protected)/(home)/page.tsx
"use client";
import { useState } from "react";
import FormBox from "../_components/forms-box/page";
import CreateButton from "../_components/create-button/page";
import DialogComponent from "../_components/dialog-box/page";
import MainForm from "./_components/form/form";
import { Button } from "@/components/ui/button";

export default function Create() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = (open: boolean) => setIsDialogOpen(open);

  return (
    <div className="flex-1 w-full flex flex-col bg-white p-4">
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center border-b-2 border-black h-12 p-2 text-black pb-6">
        <div className="text-lg font-semibold flex flex-row items-center justify-between w-full">
          {/* Form on the extreme left */}
          <div className="flex items-center">
            <span>Create Form</span>
          </div>

          {/* Buttons on the extreme right */}
          <div className="flex items-center ml-auto">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Save
            </Button>
            <Button
              className="ml-4 border border-gray-400 text-gray-700 hover:border-gray-500"
              variant="outline"
            >
              Publish
            </Button>
          </div>
        </div>
      </nav>

      <div>
        <MainForm />
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-t-black p-4 flex justify-center text-center text-xs text-black">
        <p>
          Created by{" "}
          <a
            href="https://github.com/garvitagg79?tab=repositories"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Garvit Aggarwal
          </a>
        </p>
      </footer>
    </div>
  );
}
