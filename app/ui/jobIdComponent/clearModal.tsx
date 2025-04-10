"use client"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { formStore } from "@/app/stores/store"

export function BottomModal() {
    const updateUserFunc = formStore((state) => state?.updateData);

  function clearData() {
    console.log("Data cleared")
    updateUserFunc({
        loading: false,
        env_clientKey: "",
        url: "",
        jobId: "",
        status: "",
        data: [],
        error: {
            urlError: false,
            envError: false,
            dataError: false,
            errorText: "",
        },
    })


  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="destructive" className="ml-3">Clear</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Confirmation.</DrawerTitle>
            <DrawerDescription>Are you sure you want to close this?</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="mt-3 h-[120px] flex gap-4">
            <Button variant="destructive" onClick={clearData}>Clear</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
