import {useState} from "react";
import userData from "../../data/userData.json";
import ImageChangeButton from "../ImageChangeButton.tsx";
import UserAvatar from "./UserAvatar.tsx";
import CVSection from "./CVSection.tsx";

const ProfileAside = () => {
    const user = userData.personalInfo
    const [avatar, setAvatar] = useState(user.avatar)
  return (
      <aside
          className="flex flex-col items-center justify-start rounded-3xl bg-white px-5 py-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-6 lg:h-fit">
          <div className="flex w-full flex-col items-center">
              <UserAvatar url={avatar} width="w-[270px]" height="h-[270px]"/>

              <ImageChangeButton label="تغير الصورة" setImage={setAvatar}/>
              <CVSection cvUrl={user?.cvUrl}/>
          </div>
      </aside>
  );
};

export default ProfileAside;