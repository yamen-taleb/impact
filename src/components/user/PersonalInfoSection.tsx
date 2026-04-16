import MainPersonalInformationForm from "../../forms/user/MainPersonalInformationForm.tsx";
import SecondaryPersonalInformationForm from "../../forms/user/SecondaryPersonalInformationForm.tsx";
import {AccountDeleteOverlay} from "./AccountDeleteOverlay.tsx";

const PersonalInfoSection = () => {
  return (
      <section className="relative rounded-4xl bg-white px-5 py-6 shadow-sm ring-1 ring-slate-200 sm:px-7 lg:px-8">
          <div className="flex items-start justify-between gap-5 border-b border-slate-200 pb-5">
              <div>
                  <p className="mb-3 text-sm font-medium text-slate-500">الملف الشخصي</p>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">البيانات الشخصية</h1>
              </div>

              <button
                  type="button"
                  className="inline-flex items-center gap-4 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                  <span aria-hidden="true">‹</span>
                  تغيير كلمة المرور
              </button>
          </div>

          <div className="mt-9 space-y-8">
              <MainPersonalInformationForm/>


              <div className="border-t border-slate-201"/>

              <SecondaryPersonalInformationForm/>

              <AccountDeleteOverlay/>
          </div>
      </section>
  );
};

export default PersonalInfoSection;