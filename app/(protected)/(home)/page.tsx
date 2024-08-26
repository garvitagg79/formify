// app/(protected)/(home)/page.tsx
"use client";
import { useState } from "react";
import FormBox from "../_components/forms-box/page";
import CreateButton from "../_components/create-button/page";
import DialogComponent from "../_components/dialog-box/page";

export default function ProtectedPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = (open: boolean) => setIsDialogOpen(open);

  return (
    <div className="flex-1 w-full flex flex-col bg-white p-4">
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center border-b-2 border-black h-12 p-2 text-black pb-6">
        <a href="/home" className="text-lg font-semibold">
          Home
        </a>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-start gap-6 mt-4 mb-8">
        <div className="flex flex-wrap gap-4">
          <CreateButton onClick={handleDialogOpen} />
          <DialogComponent
            isOpen={isDialogOpen}
            onOpenChange={handleDialogClose}
          />
          <FormBox />
          <FormBox />
          <FormBox />
          <FormBox />
          <FormBox />
          <FormBox />
          <FormBox />
        </div>
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
