import {Clock, Calendar, Lightbulb, FileText, FileCheck, CheckCircle, Clock as ClockIcon, XCircle} from "lucide-react";
import statsData from "../data/studentStats.json";
import StatCard from "../components/StatCard";
import StatSummaryCard from "../components/StatSummaryCard";
import CategoriesManagement from "../components/CategoriesManagement";
import CollegesManagement from "../components/CollegesManagement";
import { getUserRole } from "../lib/utils";

const Statistics = () => {
    const stats = statsData;
    const isStudent = true; // This should be determined based on the user's role in a real application
    const userRole = getUserRole();

    return isStudent && (
        <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">الإحصائيات</h1>
                    <p className="mt-2 text-zinc-600">ملخص نشاطك التطوعي</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={Clock}
                        label="ساعات التطوع"
                        value={stats.volunteerHours}
                        description="اضغط لعرض السجل الكامل →"
                        href="/student-initiatives-participation/1"
                        bgColor="bg-blue-100"
                        iconColor="text-blue-600"
                        hoverTextColor="text-blue-600"
                    />
                    
                    <StatCard
                        icon={Calendar}
                        label="أيام الحضور"
                        disabled={true}
                        value={stats.attendanceDays}
                        description="يوم"
                        href="#"
                        bgColor="bg-green-100"
                        iconColor="text-green-600"
                        hoverTextColor="text-zinc-400"
                    />
                    
                    <StatCard
                        icon={Lightbulb}
                        label="المبادرات المقترحة"
                        value={stats.proposedInitiatives}
                        description="اضغط لعرض مبادراتك →"
                        href="/my-initiatives"
                        bgColor="bg-purple-100"
                        iconColor="text-purple-600"
                        hoverTextColor="text-purple-600"
                    />
                    
                    <StatCard
                        icon={FileText}
                        label="الطلبات المقدمة"
                        value={stats.submittedApplications}
                        description="اضغط لعرض أنشطتك →"
                        href="/my-applications"
                        bgColor="bg-orange-100"
                        iconColor="text-orange-600"
                        hoverTextColor="text-orange-600"
                    />
                </div>

            <p className="mt-2 text-zinc-600">ملخص طلبات التطوع</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatSummaryCard
                        icon={FileCheck}
                        label="إجمالي الطلبات"
                        value={statsData.totalApplications}
                        bgColor="bg-zinc-50"
                        iconColor="text-zinc-600"
                        textColor="text-zinc-600"
                    />

                    <StatSummaryCard
                        icon={CheckCircle}
                        label="مقبول"
                        value={statsData.acceptedApplications}
                        bgColor="bg-green-100"
                        iconColor="text-green-600"
                        textColor="text-green-700"
                    />

                    <StatSummaryCard
                        icon={ClockIcon}
                        label="قيد الانتظار"
                        value={statsData.pendingApplications}
                        bgColor="bg-yellow-100"
                        iconColor="text-yellow-600"
                        textColor="text-yellow-700"
                    />

                    <StatSummaryCard
                        icon={XCircle}
                        label="مرفوض"
                        value={statsData.rejectedApplications}
                        bgColor="bg-red-100"
                        iconColor="text-red-600"
                        textColor="text-red-700"
                    />
                </div>

                {(userRole === "Manager") && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <CategoriesManagement />
                        <CollegesManagement />
                    </div>
                )}
            </div>
    );
};

export default Statistics;
