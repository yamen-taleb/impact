"use client";

import { Button } from "../components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

import StudentsUnionFilters from "../components/initiative/StudentsUnionFilter";
import { useNavigate } from "react-router";

import { useMemo, useState } from "react";
import { useGetStudents } from "../hooks/use-students";
import UserAvatar from "../components/user/UserAvatar";
import { getImageUrl, toArabicNumbers } from "../lib/utils";

const ITEMS_PER_PAGE = 10;


const StudentsUnion = () => {

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] =
    useState(1);

  const {
    data,
    isLoading,
  } = useGetStudents({
    page: currentPage - 1,
    size: ITEMS_PER_PAGE,
  });

  const students = useMemo(() => {
    return (data?.content || []).filter(
      (student: any) => student.role === "ROLE_ADMIN"
    );
  }, [data]);



  const totalPages = data?.totalPages || 1;


  console.log(data);

  return (
    <div className="flex flex-col gap-5">
      <StudentsUnionFilters />

      <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b p-5">
          <h2 className="text-center text-lg font-semibold">
            مسؤولو التطوع في الهيئات الطلابية
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
                الاسم الكامل
              </TableHead>

              <TableHead>
                الرقم الجامعي
              </TableHead>

              <TableHead>
                البريد الإلكتروني
              </TableHead>

              <TableHead>
                رقم الهاتف
              </TableHead>

              <TableHead>
                الكلية
              </TableHead>

              <TableHead>
                السنة
              </TableHead>

              <TableHead>
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-8 font-[Thamanyah2]"
                >
                  جاري تحميل البيانات...
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-8 text-zinc-500 font-[Thamanyah2]"
                >
                  لا يوجد أي طالب هيئة حالياً
                </TableCell>
              </TableRow>
            ) : (
            students.map((student: any, index: any) => (
                <TableRow
                  key={`${student.userId}-${currentPage}-${index}`}
                >
                  <TableCell className="text-center font-[Thamanyah2]">
                    {toArabicNumbers(student.userId)}
                  </TableCell>

                  <TableCell>
                    {/* <img
                      src={student.photo}
                      alt={student.firstName}
                      className="h-12 w-12 rounded-full object-cover"
                    /> */}
                    <UserAvatar 
                      url={student?.photo ? getImageUrl(student.photo) : ""} 
                      width="w-12" 
                      height="h-12" 
                      firstName={student?.firstName} 
                      lastName={student?.lastName}
                    />
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.firstName}{" "}
                    {student.lastName}
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
                    {student.collegeName}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.academicYear}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full font-[Thamanyah2] hover:bg-zinc-200"
                      onClick={() => navigate(`/profile/${student.userId}`)}
                    >
                      <Eye size={16} />
                      التفاصيل
                    </Button>
                  </TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t p-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(
                  currentPage - 1
                );
              }
            }}
          >
            <ChevronRight size={16} />
            السابق
          </Button>

          <span className="text-sm text-zinc-600 font-[Thamanyah2]">
            صفحة {currentPage} من {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={
              currentPage === totalPages
            }
            onClick={() => {
              if (
                currentPage < totalPages
              ) {
                setCurrentPage(
                  currentPage + 1
                );
              }
            }}
          >
            التالي
            <ChevronLeft size={16} />
          </Button>
        </div>
      </div>

    </div>
  );
};

export default StudentsUnion;