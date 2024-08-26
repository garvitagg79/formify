import { Button } from "@/components/ui/button";

export default function FormBox() {
  return (
    <div className="w-60 h-auto border-2 border-gray-300 rounded-lg shadow-md p-3 mr-4">
      <div className="bg-black h-10 w-full flex items-center justify-center rounded-t-lg">
        <h2 className="text-white text-md font-bold">Delivery</h2>
      </div>
      <div className="p-3">
        <div className="flex justify-between py-1 border-b text-sm">
          <p className="font-semibold">Submitted</p>
          <p>400</p>
        </div>
        <div className="flex justify-between py-1 border-b text-sm">
          <p className="font-semibold">Viewed</p>
          <p>400</p>
        </div>
        <div className="flex justify-between py-1 text-sm">
          <p className="font-semibold">Date Published</p>
          <p>400</p>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <Button className="w-full py-1 px-2 text-xs bg-blue-500 hover:bg-blue-600">
            View Submission
          </Button>
          <div className="flex gap-2">
            <Button
              className="w-1/2 py-1 px-2 text-xs border-2 border-gray-400 text-gray-600 hover:bg-gray-100"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              className="w-1/2 py-1 px-2 text-xs border-2 border-gray-400 text-red-600 hover:bg-red-100"
              variant="outline"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
