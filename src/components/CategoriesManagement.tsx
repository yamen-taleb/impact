"use client";

import { useState } from "react";
import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategories,
} from "../hooks/use-category";

const CategoriesManagement = () => {
  const [newCategory, setNewCategory] =
    useState("");

  const [openAddDialog, setOpenAddDialog] =
    useState(false);

  const [
    openDeleteDialog,
    setOpenDeleteDialog,
  ] = useState(false);

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState<number | null>(null);

  const [
    selectedCategoryName,
    setSelectedCategoryName,
  ] = useState("");

  /**
   * Get categories
   */
  const {
    data,
    isLoading,
  } = useGetCategories({
    page: 0,
    size: 50,
  });

  const categories =
    data?.content ?? data ?? [];

  /**
   * Create category
   */
  const {
    mutate: createCategory,
    isPending: isCreating,
  } = useCreateCategory();

  /**
   * Delete category
   */
  const {
    mutate: deleteCategory,
    isPending: isDeleting,
  } = useDeleteCategory();

  /**
   * Add category
   */
  const handleAddCategory = () => {
    createCategory(newCategory, {
      onSuccess: () => {
        setNewCategory("");
        setOpenAddDialog(false);
      },
    });
  };

  /**
   * Delete category
   */
  const handleDeleteCategory = () => {
    if (!selectedCategoryId) return;

    deleteCategory(selectedCategoryId, {
      onSuccess: () => {
        setOpenDeleteDialog(false);
        setSelectedCategoryId(null);
        setSelectedCategoryName("");
      },
    });
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          إدارة التصنيفات
        </h2>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-[Thamanyah2]">
          {categories.length} تصنيف
        </span>
      </div>

      {/* Add category */}
      <div className="mb-5 flex gap-3">
        <Input
          value={newCategory}
          onChange={(e) =>
            setNewCategory(e.target.value)
          }
          placeholder="أدخل تصنيف جديد"
          className="font-[Thamanyah2]"
        />

        <Button
          disabled={!newCategory.trim()}
          onClick={() =>
            setOpenAddDialog(true)
          }
          className="font-[Thamanyah2]"
        >
          إضافة
        </Button>
      </div>

      {/* Categories list */}
      {isLoading ? (
        <p className="text-sm text-zinc-500 font-[Thamanyah2]">
          جاري تحميل التصنيفات...
        </p>
      ) : categories.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {categories.map(
            (category: any) => (
              <div
                key={
                  category.categoryId
                }
                className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2"
              >
                <span className="font-[Thamanyah2]">
                  {category.name}
                </span>

                <button
                  onClick={() => {
                    setSelectedCategoryId(
                      category.categoryId
                    );

                    setSelectedCategoryName(
                      category.name
                    );

                    setOpenDeleteDialog(
                      true
                    );
                  }}
                >
                  <X
                    size={16}
                    className="text-red-500"
                  />
                </button>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-sm text-zinc-500 font-[Thamanyah2]">
          لا يوجد تصنيفات حالياً
        </p>
      )}

      {/* Add Dialog */}
      <Dialog
        open={openAddDialog}
        onOpenChange={
          setOpenAddDialog
        }
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="font-[Thamanyah2]">
              هل أنت متأكد من إضافة
              التصنيف:
              {" "}
              {newCategory}
              ؟
            </DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setOpenAddDialog(
                  false
                )
              }
              className="font-[Thamanyah2]"
            >
              لا
            </Button>

            <Button
              onClick={
                handleAddCategory
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
        onOpenChange={
          setOpenDeleteDialog
        }
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="font-[Thamanyah2]">
              هل أنت متأكد من حذف
              التصنيف:
              {" "}
              {
                selectedCategoryName
              }
              ؟
            </DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setOpenDeleteDialog(
                  false
                )
              }
              className="font-[Thamanyah2]"
            >
              لا
            </Button>

            <Button
              variant="destructive"
              onClick={
                handleDeleteCategory
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

export default CategoriesManagement;