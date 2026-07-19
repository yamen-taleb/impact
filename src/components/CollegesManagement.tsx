"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

import {
  useCreateCollege,
  useDeleteCollege,
  useGetColleges,
} from "../hooks/use-college";

const CollegesManagement = () => {
  const [newCollege, setNewCollege] = useState("");

  const [openAddDialog, setOpenAddDialog] =
    useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] =
    useState(false);

  const [selectedCollege, setSelectedCollege] =
    useState<{
      id: number;
      name: string;
    } | null>(null);

  const { data, isLoading } =
    useGetColleges({
      page: 0,
      size: 50,
    });

  const colleges = data?.content || [];

  const { mutate: createCollege, isPending: isCreating } =
    useCreateCollege();

  const { mutate: deleteCollege, isPending: isDeleting } =
    useDeleteCollege();





  const handleAddCollege = () => {
    createCollege(newCollege, {
      onSuccess: () => {
        setNewCollege("");
        setOpenAddDialog(false);
      },
    });
  };




  const handleDeleteCollege = () => {
    if (!selectedCollege) return;

    deleteCollege(selectedCollege.id, {
      onSuccess: () => {
        setOpenDeleteDialog(false);
        setSelectedCollege(null);
      },
    });
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">
          إدارة الكليات
        </h2>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-[Thamanyah2]">
          {colleges.length} كلية
        </span>
      </div>

      <div className="flex gap-3 mb-5">
        <Input
          value={newCollege}
          onChange={(e) =>
            setNewCollege(e.target.value)
          }
          placeholder="أدخل كلية جديدة"
          className="font-[Thamanyah2]"
        />

        <Button
          disabled={!newCollege.trim()}
          onClick={() =>
            setOpenAddDialog(true)
          }
          className="font-[Thamanyah2]"
        >
          إضافة
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-zinc-500 font-[Thamanyah2]">
          يجاري تحميل الكليات...
        </p>
      ) : colleges.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {colleges.map((college: any) => (
            <div
              key={college.id}
              className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2"
            >
              <span className="font-[Thamanyah2]">
                {college.name}
              </span>

              <button
                onClick={() => {
                  setSelectedCollege({
                    id: college.id,
                    name: college.name,
                  });

                  setOpenDeleteDialog(true);
                }}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-500 font-[Thamanyah2]">
          لا يوجد كليات حالياً
        </p>
      )}






      {/* Add Dialog */}
      <Dialog
        open={openAddDialog}
        onOpenChange={setOpenAddDialog}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="font-[Thamanyah2]">
              هل أنت متأكد من إضافة الكلية:
              {newCollege} ؟
            </DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setOpenAddDialog(false)
              }
              className="font-[Thamanyah2]"
            >
              لا
            </Button>

            <Button
              onClick={
                handleAddCollege
              }
              disabled={
                isCreating
              }
              className="font-[Thamanyah2]"
            >
              {isCreating
                ? "جاري الإضافة..."
                : "نعم"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>






      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="font-[Thamanyah2]">
              هل أنت متأكد من حذف الكلية:
              {selectedCollege?.name} ؟
            </DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setOpenDeleteDialog(false)
              }
              className="font-[Thamanyah2]"
            >
              لا
            </Button>

            <Button
              variant="destructive"
              onClick={
                handleDeleteCollege
              }
              disabled={
                isDeleting
              }
              className="font-[Thamanyah2]"
            >
              {isDeleting
                ? "جاري الحذف..."
                : "نعم"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollegesManagement;