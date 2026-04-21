import ProfileHeader from "../components/user/ProfileHeader.tsx";
import ProfileAside from "../components/user/ProfileAside.tsx";
import PersonalInfoSection from "../components/user/PersonalInfoSection.tsx";



const Profile = () => {
  return (
      <main className="min-h-screen bg-[#f8fafc] px-4 py-2 text-slate-900 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <ProfileHeader/>
          <div className="grid gap-8 lg:grid-cols-[460px_minmax(0,1fr)]">
            <ProfileAside/>
            <PersonalInfoSection/>
          </div>
        </div>
      </main>
  );
};

export default Profile;