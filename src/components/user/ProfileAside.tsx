import {useEffect, useState} from "react";
import ImageChangeButton from "../ImageChangeButton.tsx";
import UserAvatar from "./UserAvatar.tsx";
import {useUserContext} from "../../context/UserContext.tsx";
import {useGetCVUrl, useGetUserById, useUpdateUser} from "../../hooks/use-user.ts";
import {toast} from "sonner";
import {getCollegeId, getImageUrl} from "../../lib/utils.ts";
import {useParams} from "react-router";
import {useCollegeContext} from "../../context/CollegeContext.tsx";
import {Copy} from "lucide-react";
import CVSection from "./CVSection.tsx";

const ProfileAside = () => {
    const {currentUser} = useUserContext();
    const {id: userId} = useParams()
    const {user} = useGetUserById(userId);
    const {mutate: updateUser, isPending} = useUpdateUser();
    const { collegeOptions } = useCollegeContext()
    const [avatar, setAvatar] = useState(user?.photo || "");
    const {data: cvUrl} = useGetCVUrl(user?.userId.toString() ?? "");
    const canEdit = currentUser?.userId === user?.userId;
    console.log("CV URL in ProfileAside:", cvUrl);

    useEffect(() => {
        if (!user?.photo) return;

        const fullUrl = getImageUrl(user.photo);

        setAvatar(fullUrl);
    }, [user?.photo]);

    const handleUploadPhoto = (file: File) => {
        if (!user?.userId) {
            toast.error("بيانات المستخدم غير مكتملة");
            return;
        }

        updateUser({
            userId: user.userId,
            photoFile: file,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            collegeId: getCollegeId(collegeOptions, user.collegeName),
        });
    };

    const copyStudentNumber = () => {
        if (!user?.studentNumber) {
            toast.error("رقم الطالب غير متوفر");
            return;
        }

        navigator.clipboard.writeText(user.studentNumber)
            .then(() => {
                toast.success("تم نسخ رقم الطالب");
            })
            .catch(() => {
                toast.error("فشل نسخ رقم الطالب");
            });
    }
  return (
      <aside
          className="flex flex-col items-center justify-start rounded-3xl bg-white px-5 py-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-6 lg:h-fit">
          <div className="flex w-full flex-col items-center">
              <UserAvatar url={avatar} width="w-[270px]" height="h-[270px]" firstName={user?.firstName} lastName={user?.lastName}/>

              {user?.studentNumber && (
                      <button onClick={copyStudentNumber} className={"font-[Thamanyah2] mt-4 bg-slate-100 text-slate-800 inline-flex gap-1 shrink-0 items-center rounded-full border px-3 py-1 text-xs"}>
                          <span>{user?.studentNumber}</span>
                          <Copy size={14}/>
                      </button>
              )}
              {currentUser?.userId === user?.userId && (
                  <ImageChangeButton label={isPending ? "جاري الرفع..." : "تغيير الصورة"} setImage={setAvatar} onUpload={handleUploadPhoto} disabled={isPending}/>
              )}
              <CVSection cvUrl={cvUrl} canEdit={canEdit}/>
          </div>
      </aside>
  );
};

export default ProfileAside;
