"use client";

import { useMemo, useState } from "react";
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

import studentsData from "../../src/data/studentsUnion.json";
import StudentsUnionFilters from "../components/initiative/StudentsUnionFilter";

const ITEMS_PER_PAGE = 10;

interface StudentUnionMember {
  id: string;
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
}

const StudentsUnion = () => {
  const students = useMemo(
    () =>
      studentsData as StudentUnionMember[],
    []
  );

  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages = Math.ceil(
    students.length / ITEMS_PER_PAGE
  );

  const paginatedStudents = useMemo(() => {
    const start =
      (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return students.slice(start, end);
  }, [currentPage, students]);

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
            {paginatedStudents.map(
              (student, index) => (
                <TableRow
                  key={`${student.id}-${currentPage}-${index}`}
                >
                  <TableCell className="text-center font-[Thamanyah2]">
                    {student.id}
                  </TableCell>

                  <TableCell>
                    <img
                      src={student.photo}
                      alt={student.firstName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.firstName}{" "}
                    {student.lastName}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.sutdentNumber}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.email}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.phoneNumber}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.college}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {student.academicYear}
                  </TableCell>

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