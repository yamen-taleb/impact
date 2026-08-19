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
import { useGetAllStudents, useGetStudents, useToggleStudentBan } from "../hooks/use-students";
import UserAvatar from "../components/user/UserAvatar";
import { getImageUrl, toArabicNumbers } from "../lib/utils";
import { useRole } from "../hooks/use-role";
import { useNavigate } from "react-router";

import {
  ALL_STATUSES,
  ALL_COLLEGIES,
  ACTIVE_STATUS,
  BANNED_STATUS,
  ALL_PROFILE_STATUSES,
  COMPLETE_PROFILE_STATUS,
  INCOMPLETE_PROFILE_STATUS,
} from "../components/initiative/VolunteerFilters";

import type { VolunteerFiltersType } from "../components/initiative/VolunteerFilters";

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


const isStudentProfileComplete = (student: any) => {
  const requiredFields = [
    student.firstName,
    student.lastName,
    student.email,
    student.phone,
    student.collegeName,
    student.location,
    student.birthdate,
    student.academicYear,
    student.description,
  ];

  return requiredFields.every((value) => {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === "string") {
      return value.trim().length > 0;
    }

    return true;
  });
};

const Students = () => {
  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  const { updateRole } = useRole();
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [roleTargetStudent, setRoleTargetStudent] = useState<Student | null>(null);
  const [roleAction, setRoleAction] = useState<"add" | "remove">("add");

  const [filters, setFilters] =
    useState<VolunteerFiltersType>({
      search: "",
      status: ALL_STATUSES,
      college: ALL_COLLEGIES,
      profileStatus: ALL_PROFILE_STATUSES,
    });
  

  const handleFiltersChange = (
    newFilters: VolunteerFiltersType
  ) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const navigate = useNavigate();


  const {
    students: allStudents,
    isLoading,
    isError,
  } = useGetAllStudents();

const students = useMemo(() => {
  const search = filters.search
    .trim()
    .toLowerCase();

  return allStudents.filter((student: any) => {
    // البحث
    const matchesSearch =
      !search ||
      [
        student.firstName,
        student.lastName,
        student.studentNumber,
        student.email,
        student.phone,
        student.collegeName,
        student.academicYear,
        student.userId,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(search)
        );

    // فلترة الكلية
    const matchesCollege =
      filters.college === ALL_COLLEGIES ||
      student.collegeName === filters.college;

    // فلترة حالة الطالب
    const matchesStatus =
      filters.status === ALL_STATUSES ||
      (filters.status === ACTIVE_STATUS &&
        student.isBanned === false) ||
      (filters.status === BANNED_STATUS &&
        student.isBanned === true);

    // فلترة اكتمال الحساب
    const isComplete =
      isStudentProfileComplete(student);

    const matchesProfileStatus =
      filters.profileStatus ===
        ALL_PROFILE_STATUSES ||
      (filters.profileStatus ===
        COMPLETE_PROFILE_STATUS &&
        isComplete) ||
      (filters.profileStatus ===
        INCOMPLETE_PROFILE_STATUS &&
        !isComplete);

    return (
      matchesSearch &&
      matchesCollege &&
      matchesStatus &&
      matchesProfileStatus
    );
  });
}, [allStudents, filters]);


  const totalPages = Math.max(
    1,
    Math.ceil(
      students.length /
        ITEMS_PER_PAGE
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedStudents = useMemo(() => {
    const start =
      (safeCurrentPage - 1) *
      ITEMS_PER_PAGE;

    return students.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [
    students,
    safeCurrentPage,
  ]);


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

  const handleRoleConfirm = () => {
    if (!roleTargetStudent) return;

    const isAdmin =
      roleTargetStudent.role === "ROLE_ADMIN";

    updateRole.mutate(
      {
        userId: roleTargetStudent.userId,
        role: isAdmin
          ? "ROLE_USER"
          : "ROLE_ADMIN",
      },
      {
        onSuccess: () => {
          setRoleDialogOpen(false);
          setRoleTargetStudent(null);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {/* <VolunteerFilters /> */}
      <VolunteerFilters
        filters={filters}
        onFiltersChange={
          handleFiltersChange
        }
      />

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
                البريد الإلكتروني
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
                الطالب
              </TableHead>

              <TableHead>
                الحساب
              </TableHead>

              <TableHead>الدور</TableHead>

              <TableHead>
                {/* الإجراء */}
                التفاصيل
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedStudents.map((student: any, index: number) => (
                <TableRow
                  key={`${student.userId}-${currentPage}-${index}`}
                >
                  <TableCell className="text-center font-[Thamanyah2]">
                    {toArabicNumbers(student.userId)}
                  </TableCell>

                  <TableCell>
                    <UserAvatar 
                      url={student?.photo ? getImageUrl(student.photo) : ""} 
                      width="w-12" 
                      height="h-12" 
                      firstName={student?.firstName} 
                      lastName={student?.lastName}
                    />
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.firstName}{" "}{student.lastName}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {toArabicNumbers(student.studentNumber)}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.email}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {toArabicNumbers(student.phone)}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.collegeName}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {toArabicNumbers(student.academicYear)}
                  </TableCell>


                  {/* الطالب */}
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

                  {/* الحساب */}
                  <TableCell>
                    {isStudentProfileComplete(student) ? (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-[Thamanyah2] text-emerald-500">
                        مكتمل
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-[Thamanyah2] text-red-500">
                        غير مكتمل
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      size="sm"
                      className={`rounded-full font-[Thamanyah2] text-white ${
                        student.role === "ROLE_ADMIN"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-emerald-500 hover:bg-emerald-600"
                      }`}
                      onClick={() => {
                        setRoleTargetStudent(student);

                        const isAdmin =
                          student.role === "ROLE_ADMIN";

                        setRoleAction(
                          isAdmin ? "remove" : "add"
                        );

                        setRoleDialogOpen(true);
                      }}
                    >
                      {student.role === "ROLE_ADMIN"
                        ? "إزالة عضو هيئة"
                        : "إضافة عضو هيئة"}
                    </Button>
                  </TableCell>

                  {/* الإجراء */}
                  <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full font-[Thamanyah2] hover:bg-zinc-200"
                        onClick={() => navigate(`/profile/${student.userId}`)}
                      >
                        <Eye size={16} />
                        {/* التفاصيل */}
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
            disabled={
              safeCurrentPage === 1 ||
              isLoading
            }
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(page - 1, 1)
              )
            }
          >
            <ChevronRight size={16} />
            السابق
          </Button>

          <span className="text-sm text-zinc-600 font-[Thamanyah2]">
            صفحة {safeCurrentPage} من{" "}
            {totalPages} ({students.length} طالب)
          </span>

          <Button
            variant="outline"
            disabled={
              safeCurrentPage === totalPages ||
              isLoading
            }
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(
                  page + 1,
                  totalPages
                )
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
        >
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

        <Dialog
          open={roleDialogOpen}
          onOpenChange={setRoleDialogOpen}
        >
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>
                {roleAction === "add"
                  ? `هل أنت متأكد من تعيين الطالب ${roleTargetStudent?.firstName} ${roleTargetStudent?.lastName} كعضو هيئة طلابية؟`
                  : `هل أنت متأكد من إزالة الطالب ${roleTargetStudent?.firstName} ${roleTargetStudent?.lastName} من الهيئة الطلابية؟`}
              </DialogTitle>
            </DialogHeader>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRoleDialogOpen(false)}
              >
                إلغاء
              </Button>

              <Button
                variant={roleAction === "add" ? "default" : "destructive"}
                onClick={handleRoleConfirm}
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