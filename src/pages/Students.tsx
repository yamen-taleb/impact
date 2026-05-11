"use client";

import { useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { Button } from "../components/ui/button";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import VolunteerFilters from "../components/initiative/VolunteerFilters";
import { useGetStudents, useToggleStudentBan } from "../hooks/use-students";
import UserAvatar from "../components/user/UserAvatar";
import { toArabicNumbers } from "../lib/utils";

const ITEMS_PER_PAGE = 10;

interface Student {
  userId: number;
  sutdentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photo: string;
  birthDate: string;
  college: string;
  academicYear: string;
  role: string;
  isBanned: boolean;
}

const Students = () => {
  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [openDialog, setOpenDialog] = useState(false);


  const {
    data,
    isLoading,
  } = useGetStudents({
    page: currentPage - 1,
    size: ITEMS_PER_PAGE,
  });

  const students = data?.content || [];

  const totalPages = data?.totalPages || 1;

  const { mutate: toggleStudentBan } = useToggleStudentBan();


  const handleToggleStudentStatus = () => {
    if (!selectedStudent) return;

    console.log(selectedStudent);

    toggleStudentBan(
      {
        userId:
          selectedStudent.userId,
        isBanned:
          !selectedStudent.isBanned,
      },
      {
        onSuccess: () => {
          setOpenDialog(false);
          setSelectedStudent(null);
        },
      }
    );
  };

  console.log(students);

  return (
    <div className="flex flex-col gap-5">
      <VolunteerFilters />

      <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b p-5">
          <h2 className="text-center text-lg font-semibold font-[Thamanyah2]">
            جدول الطلاب
          </h2>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">
                المعرف
              </TableHead>

              <TableHead>
                الصورة
              </TableHead>

              <TableHead>
                الاسم
              </TableHead>

              <TableHead>
                الرقم الجامعي
              </TableHead>

              <TableHead>
                البريد
              </TableHead>

              <TableHead>
                الهاتف
              </TableHead>

              <TableHead>
                الكلية
              </TableHead>

              <TableHead>
                السنة
              </TableHead>

              <TableHead>
                الحالة
              </TableHead>

              <TableHead>
                الإجراء
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((student: any, index: number) => (
                <TableRow
                  key={`${student.userId}-${currentPage}-${index}`}
                >
                  <TableCell className="text-center font-[Thamanyah2]">
                    {toArabicNumbers(student.userId)}
                  </TableCell>

                  <TableCell>
                    {/* <img
                      src={student.photo}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover"
                    /> */}
                    <UserAvatar
                      url={student?.photo}
                      width="w-10"
                      height="h-10"
                      letterSize={"text-lg"}
                      firstName={student?.firstName}
                      lastName={student?.lastName}
                  />
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.firstName}{" "}{student.lastName}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.studentNumber}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.email}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.phone}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.college}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {toArabicNumbers(student.academicYear)}
                  </TableCell>


                  {/* الحالة */}
                  <TableCell>
                    <Button
                      variant={
                        student.isBanned
                          ? "outline"
                          : "destructive"
                      }
                      size="sm"
                      className="font-[Thamanyah2] rounded-full hover:bg-zinc-200"
                      onClick={() => {
                        setSelectedStudent(student);
                        setOpenDialog(true);
                      }}
                    >
                      {student.isBanned
                        ? "إعادة الطالب"
                        : "فصل الطالب"}
                    </Button>
                  </TableCell>

                  {/* الإجراء */}
                  <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full font-[Thamanyah2] hover:bg-zinc-200"
                      >
                        <Eye size={16} />
                        التفاصيل
                      </Button>
                    </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t p-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            <ChevronRight size={16} />
            السابق
          </Button>

          <span className="text-sm text-zinc-600 font-[Thamanyah2]">
            صفحة {currentPage} من{" "}
            {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            التالي
            <ChevronLeft size={16} />
          </Button>
        </div>

        {/* Dialog */}
        <Dialog
          open={openDialog}
          onOpenChange={setOpenDialog}
        >s
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>
                {selectedStudent?.isBanned
                  ? `هل أنت متأكد من إعادة الطالب ${selectedStudent?.firstName} ${selectedStudent?.lastName} ؟`
                  : `هل أنت متأكد من فصل الطالب ${selectedStudent?.firstName} ${selectedStudent?.lastName} ؟`}
              </DialogTitle>
            </DialogHeader>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setOpenDialog(
                    false
                  )
                }
              >
                إلغاء
              </Button>

              <Button
                variant={
                  selectedStudent?.isBanned
                    ? "default"
                    : "destructive"
                }
                onClick={
                  handleToggleStudentStatus
                }
              >
                تأكيد
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Students;