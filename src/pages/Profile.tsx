import ProfileHeader from "../components/user/ProfileHeader.tsx";
import ProfileAside from "../components/user/ProfileAside.tsx";
import PersonalInfoSection from "../components/user/PersonalInfoSection.tsx";
import {Link, useParams} from "react-router";
import {ArrowUpRight, BadgeCheck} from "lucide-react";



const Profile = () => {
    const {userId} = useParams()
  return (
      <main className="min-h-screen bg-[#f8fafc] px-4 py-2 text-slate-900 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
            <div className={"flex justify-between items-center mb-6"}>
                <ProfileHeader/>
                <Link
                    to={`/student-initiatives-participation/${userId}`}
                    className="group inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100/70 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2">
                    <BadgeCheck size={16} className="text-emerald-700"/>
                    <span>مبادرات الطالب</span>
                    <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
                </Link>
            </div>
            <div className="grid gap-8 lg:grid-cols-[460px_minmax(0,1fr)]">
                <ProfileAside/>
                <PersonalInfoSection/>
            </div>
        </div>
      </main>
  );
};

export default Profile;
