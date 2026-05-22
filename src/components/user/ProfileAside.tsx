import {useEffect, useState} from "react";
import ImageChangeButton from "../ImageChangeButton.tsx";
import UserAvatar from "./UserAvatar.tsx";
import CVSection from "./CVSection.tsx";
import {useUserContext} from "../../context/UserContext.tsx";
import {useGetUserById, useUpdateUser} from "../../hooks/use-user.ts";
import {toast} from "sonner";
import {getCollegeId, getImageUrl} from "../../lib/utils.ts";
import {useParams} from "react-router";
import {useCollegeContext} from "../../context/CollegeContext.tsx";

const ProfileAside = () => {
    const {currentUser} = useUserContext();
    const {id: userId} = useParams()
    const {user} = useGetUserById(userId);
    const {mutate: updateUser, isPending} = useUpdateUser();
    const [avatar, setAvatar] = useState(user?.photo || "");

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
            collegeId: getCollegeId(useCollegeContext().collegeOptions, user.collegeName),
        });
    };

  return (
      <aside
          className="flex flex-col items-center justify-start rounded-3xl bg-white px-5 py-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-6 lg:h-fit">
          <div className="flex w-full flex-col items-center">
              <UserAvatar url={avatar} width="w-[270px]" height="h-[270px]" firstName={user?.firstName} lastName={user?.lastName}/>

              {currentUser?.userId === user?.userId && (
                  <>
                      <ImageChangeButton label={isPending ? "جاري الرفع..." : "تغيير الصورة"} setImage={setAvatar} onUpload={handleUploadPhoto} disabled={isPending}/>
                      <CVSection cvUrl={undefined}/>
                  </>
              )}
          </div>
      </aside>
  );
};

export default ProfileAside;