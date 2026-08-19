"use client";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import StudentsUnionFilters from "../components/initiative/StudentsUnionFilter";
import UserAvatar from "../components/user/UserAvatar";
import { getImageUrl, toArabicNumbers } from "../lib/utils";
import { ALL_COLLEGIES } from "../components/initiative/StudentsUnionFilter";
import { useGetAllStudents } from "../hooks/use-students";

const ITEMS_PER_PAGE = 10;

const StudentsUnion = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    college: ALL_COLLEGIES,
  });

  const {
    students: allStudents,
    isLoading,
    isError,
  } = useGetAllStudents();

  console.log(allStudents);

  /** 1. نأخذ فقط مسؤولي التطوع */
  const adminStudents = useMemo(() => {
    return allStudents.filter(
      (student: any) =>
        student.role === "ROLE_ADMIN"
    );
  }, [allStudents]);

  /** 2. البحث + فلترة الكلية */
  const filteredStudents = useMemo(() => {
    const search = filters.search
      .trim()
      .toLowerCase();

    return adminStudents.filter(
      (student: any) => {
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

        const matchesCollege =
          filters.college === ALL_COLLEGIES ||
          student.collegeName === filters.college;

        return (
          matchesSearch &&
          matchesCollege
        );
      }
    );
  }, [adminStudents, filters]);

  /** 3. Frontend Pagination */
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length /
        ITEMS_PER_PAGE
    )
  );

  /** في حال أصبحت الصفحة الحالية أكبر من عدد الصفحات بعد الفلترة */
  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedStudents = useMemo(() => {
    const start =
      (safeCurrentPage - 1) *
      ITEMS_PER_PAGE;

    const end =
      start + ITEMS_PER_PAGE;

    return filteredStudents.slice(
      start,
      end
    );
  }, [
    filteredStudents,
    safeCurrentPage,
  ]);

  /** عند تغيير الفلاتر نعود للصفحة الأولى */
  const handleFiltersChange = (
    newFilters: Filters
  ) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(page - 1, 1)
    );
  };

  const goToNextPage = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };

  return (
    <div className="flex flex-col gap-5">

      <StudentsUnionFilters
        filters={filters}
        onChange={handleFiltersChange}
      />

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
                الإجراء
              </TableHead>

            </TableRow>
          </TableHeader>

          <TableBody>

            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-8 text-center font-[Thamanyah2]"
                >
                  جاري تحميل البيانات...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-8 text-center text-red-500 font-[Thamanyah2]"
                >
                  حدث خطأ أثناء تحميل البيانات
                </TableCell>
              </TableRow>
            ) : paginatedStudents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-8 text-center text-zinc-500 font-[Thamanyah2]"
                >
                  لا يوجد أي طالب مطابق للبحث
                </TableCell>
              </TableRow>
            ) : (
              paginatedStudents.map(
                (student: any) => (
                  <TableRow
                    key={student.userId}
                  >

                    <TableCell className="text-center font-[Thamanyah2]">
                      {toArabicNumbers(
                        student.userId
                      )}
                    </TableCell>

                    <TableCell>
                      <UserAvatar
                        url={
                          student?.photo
                            ? getImageUrl(
                                student.photo
                              )
                            : ""
                        }
                        width="w-12"
                        height="h-12"
                        firstName={
                          student?.firstName
                        }
                        lastName={
                          student?.lastName
                        }
                      />
                    </TableCell>

                    <TableCell className="font-[Thamanyah2]">
                      {student.firstName}{" "}
                      {student.lastName}
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

                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full font-[Thamanyah2] hover:bg-zinc-200"
                        onClick={() =>
                          navigate(
                            `/profile/${student.userId}`
                          )
                        }
                      >
                        <Eye size={16} />
                        التفاصيل
                      </Button>
                    </TableCell>

                  </TableRow>
                )
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
            onClick={goToPreviousPage}
          >
            <ChevronRight size={16} />
            السابق
          </Button>

          <span className="text-sm text-zinc-600 font-[Thamanyah2]">
            صفحة{" "}
            {safeCurrentPage}{" "}
            من{" "}
            {totalPages}
            {" "}
            ({filteredStudents.length} طالب)
          </span>

          <Button
            variant="outline"
            disabled={
              safeCurrentPage ===
                totalPages ||
              isLoading
            }
            onClick={goToNextPage}
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