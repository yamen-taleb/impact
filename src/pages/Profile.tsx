import userData from '../data/userData.json'
import UserAvatar from "../components/user/UserAvatar.tsx";
import ImageChangeButton from "../components/ImageChangeButton.tsx";
import {useState} from "react";
import CVSection from "../components/user/CVSection.tsx";



const Profile = () => {
  const user = userData.personalInfo
  const [avatar, setAvatar] = useState(user.avatar)

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-6 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center justify-start gap-2 text-slate-500">
          <span>الملف الشخصي</span>
          <span>&gt;</span>
          <span>البيانات الشخصية</span>
        </header>

        <div className="grid gap-8 lg:grid-cols-[460px_minmax(0,1fr)]">
          <aside
              className="flex flex-col items-center justify-start rounded-3xl bg-white px-5 py-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-6 lg:h-fit">
            <div className="flex w-full flex-col items-center">
              <UserAvatar url={avatar} width="w-[270px]" height="h-[270px]"/>

              <ImageChangeButton label="تغير الصورة" setImage={setAvatar}/>
              <CVSection cvUrl={user?.cvUrl}/>
            </div>
          </aside>


        </div>
      </div>
    </main>
  );
};

export default Profile;