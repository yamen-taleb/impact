"use client";

import { useMemo, useState } from "react";
import { Link } from "react-router";

import initiativesData from "../../data/initiatives.json";
import userData from "../../data/userData.json";
import { initiativesSchema } from "../../schemas/initiativePageSchema";
import { getInitiativeStatus } from "../../lib/initiativeStatus";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

const InitiativeTable = () => {
  const initiatives = useMemo(() => {
    return initiativesSchema.parse(initiativesData);
  }, []);

  const user = userData.personalInfo;

  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages = Math.ceil(
    initiatives.length / ITEMS_PER_PAGE
  );

  const paginatedInitiatives = useMemo(() => {
    const start =
      (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return initiatives.slice(start, end);
  }, [currentPage, initiatives]);

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold text-center">
          جدول المبادرات
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">المعرف</TableHead>
            <TableHead>اسم المبادرة</TableHead>
            <TableHead>صاحب المبادرة</TableHead>
            <TableHead>الكلية</TableHead>
            <TableHead>التصنيف</TableHead>
            <TableHead>النسبة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>تاريخ الإرسال</TableHead>
            <TableHead className="text-center">عدد المتطوعين</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedInitiatives.map(
            (initiative) => {
              const status =
                getInitiativeStatus(
                  initiative.status
                );

              return (
                <TableRow
                  key={initiative.id}
                >
                  <TableCell className="font-medium font-[Thamanyah2] text-center">
                    {initiative.id}
                  </TableCell>

                  <TableCell className="font-medium font-[Thamanyah2]">
                    {initiative.title}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {user.firstName}{" "}
                    {user.lastName}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {initiative.college}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {initiative.category}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {initiative.percentage}%
                  </TableCell>

                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${status.className} font-[Thamanyah2]`}
                    >
                      {status.label}
                    </span>
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {new Date(
                      initiative.submissionDate
                    ).toLocaleDateString(
                      "ar-SY"
                    )}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2] text-center">
                    {initiative.maxVolunteers}
                  </TableCell>

                  <TableCell>
                    <Link
                      to={`/initiatives/${initiative.id}`}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full hover:bg-zinc-200 font-[Thamanyah2]"
                      >
                        <Eye size={16} />
                        التفاصيل
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            }
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
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          <ChevronRight size={16} />
          السابق
        </Button>

        <span className="text-sm text-zinc-600">
          صفحة {currentPage} من {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={
            currentPage === totalPages
          }
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          التالي
          <ChevronLeft size={16} />
        </Button>
      </div>
    </div>
  );
};

export default InitiativeTable;