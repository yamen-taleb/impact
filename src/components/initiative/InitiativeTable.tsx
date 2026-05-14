"use client";

import { Link } from "react-router";

import userData from "../../data/userData.json";
import {type Initiative} from "../../schemas/initiativePageSchema";
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

interface Props {
  initiatives: Initiative[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const InitiativeTable = ({initiatives, page, setPage, totalPages} : Props) => {
  const user = userData.personalInfo

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
          {initiatives?.map(
            (initiative) => {
              const status =
                getInitiativeStatus(
                  initiative.status
                );

              return (
                <TableRow
                  key={initiative.campaignId}
                >
                  <TableCell className="font-medium font-[Thamanyah2] text-center">
                    {initiative.campaignId}
                  </TableCell>

                  <TableCell className="font-medium font-[Thamanyah2]">
                    {initiative.title}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {user?.firstName}{" "}
                    {user?.lastName}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {initiative.collegeName}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {initiative.category}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2]">
                    {initiative.lastProgress?.percentage ?? 0}%
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
                      initiative.createdAt
                    ).toLocaleDateString(
                      "ar-SY"
                    )}
                  </TableCell>

                  <TableCell className="font-[Thamanyah2] text-center">
                    {initiative.maxVolunteers}
                  </TableCell>

                  <TableCell>
                    <Link
                      to={`/initiatives/${initiative.campaignId}`}
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
          disabled={page + 1 === 1}
          onClick={() => {
            if (page + 1 > 1) {
              setPage(page - 1);
            }
          }}
        >
          <ChevronRight size={16} />
          السابق
        </Button>

        <span className="text-sm text-zinc-600">
          صفحة {page+1} من {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={
            page + 1 === totalPages
          }
          onClick={() => {
            if (page + 1 < totalPages) {
              setPage(page + 1);
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