import { Link } from "react-router";
import {Clock, Calendar, Lightbulb, FileText, FileCheck, CheckCircle, Clock as ClockIcon, XCircle} from "lucide-react";
import statsData from "../data/studentStats.json";

const Statistics = () => {
    const stats = statsData;
    const isStudent = true; // This should be determined based on the user's role in a real application
    return isStudent && (
        <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">الإحصائيات</h1>
                    <p className="mt-2 text-zinc-600">ملخص نشاطك التطوعي</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link
                        to="/student-initiatives-participation/1"
                        className="group relative rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-zinc-300"
                    >
                        <div className="absolute top-4 right-4 rounded-lg bg-blue-100 p-3">
                            <Clock className="h-6 w-6 text-blue-600"/>
                        </div>
                        <div className="mt-12">
                            <p className="text-sm text-zinc-600 font-medium">ساعات التطوع</p>
                            <p className="mt-1 text-4xl font-bold text-zinc-900">
                                {stats.volunteerHours}
                            </p>
                            <p className="mt-2 text-xs text-blue-600 group-hover:text-blue-700">
                                اضغط لعرض السجل الكامل →
                            </p>
                        </div>
                    </Link>

                    <div className="group relative rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="absolute top-4 right-4 rounded-lg bg-green-100 p-3">
                            <Calendar className="h-6 w-6 text-green-600"/>
                        </div>
                        <div className="mt-12">
                            <p className="text-sm text-zinc-600 font-medium">أيام الحضور</p>
                            <p className="mt-1 text-4xl font-bold text-zinc-900">
                                {stats.attendanceDays}
                            </p>
                            <p className="mt-2 text-xs text-zinc-400">
                                يوم
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/my-initiatives"
                        className="group relative rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-zinc-300"
                    >
                        <div className="absolute top-4 right-4 rounded-lg bg-purple-100 p-3">
                            <Lightbulb className="h-6 w-6 text-purple-600"/>
                        </div>
                        <div className="mt-12">
                            <p className="text-sm text-zinc-600 font-medium">المبادرات المقترحة</p>
                            <p className="mt-1 text-4xl font-bold text-zinc-900">
                                {stats.proposedInitiatives}
                            </p>
                            <p className="mt-2 text-xs text-purple-600 group-hover:text-purple-700">
                                اضغط لعرض مبادراتك →
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="/my-applications"
                        className="group relative rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-zinc-300"
                    >
                        <div className="absolute top-4 right-4 rounded-lg bg-orange-100 p-3">
                            <FileText className="h-6 w-6 text-orange-600"/>
                        </div>
                        <div className="mt-12">
                            <p className="text-sm text-zinc-600 font-medium">الطلبات المقدمة</p>
                            <p className="mt-1 text-4xl font-bold text-zinc-900">
                                {stats.submittedApplications}
                            </p>
                            <p className="mt-2 text-xs text-orange-600 group-hover:text-orange-700">
                                اضغط لعرض أنشطتك →
                            </p>
                        </div>
                    </Link>
                </div>

                <p className="mt-2 text-zinc-600">ملخص طلبات التطوع</p>
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"}>
                    <div className="rounded-lg relative border border-zinc-200 bg-white p-4 shadow-sm">
                        <div className="absolute top-4 right-4 rounded-lg bg-zinc-50 p-3">
                            <FileCheck className="h-6 w-6 text-zinc-600"/>
                        </div>
                        <div className={"mt-14"}>
                            <p className="text-sm font-medium text-zinc-600">إجمالي الطلبات</p>
                            <p className="mt-2 text-3xl font-bold text-zinc-900">{statsData.totalApplications}</p>
                        </div>
                    </div>

                    <div className="rounded-lg relative border border-zinc-200 bg-white p-4 shadow-sm">
                        <div className="absolute top-4 right-4 rounded-lg bg-green-100 p-3">
                            <CheckCircle className="h-6 w-6 text-green-600"/>
                        </div>
                        <div className={"mt-14"}>
                            <p className="text-sm font-medium text-green-700">مقبول</p>
                            <p className="mt-2 text-3xl font-bold text-green-800">{statsData.acceptedApplications}</p>
                        </div>
                    </div>

                    <div className="rounded-lg relative border border-zinc-200 bg-white p-4 shadow-sm">
                        <div className="absolute top-4 right-4 rounded-lg bg-yellow-100 p-3">
                            <ClockIcon className="h-6 w-6 text-yellow-600"/>
                        </div>
                        <div className={"mt-14"}>
                            <p className="text-sm font-medium text-yellow-700">قيد الانتظار</p>
                            <p className="mt-2 text-3xl font-bold text-yellow-800">{statsData.pendingApplications}</p>
                        </div>
                    </div>

                    <div className="rounded-lg relative border border-zinc-200 bg-white p-4 shadow-sm">
                        <div className="absolute top-4 right-4 rounded-lg bg-red-100 p-3">
                            <XCircle className="h-6 w-6 text-red-600"/>
                        </div>
                        <div className={"mt-14"}>
                            <p className="text-sm font-medium text-red-700">مرفوض</p>
                            <p className="mt-2 text-3xl font-bold text-red-800">{statsData.rejectedApplications}</p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Statistics;
