import {useUploadCV} from "../../hooks/use-user.ts";
import {useUserContext} from "../../context/UserContext.tsx";
import {toast} from "sonner";
import {Upload} from "lucide-react";

const UploadCVButton = () => {
    const {mutate: uploadCV, isPending} = useUploadCV();
    const {currentUser} = useUserContext();
    const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const contentType = file.type;
        if (contentType !== "application/pdf") {
            toast.error("الرجاء رفع ملف PDF فقط");
            return;
        }

        if (!currentUser?.userId) {
            toast.error("لا يمكن تحديد المستخدم الحالي");
            return;
        }

        uploadCV({userId: currentUser.userId.toString(), cvFile: file});
    }
  return (
      <>
          <label
              htmlFor='cv'
              className="flex gap-2 w-1/2 mt-6 items-center text-center cursor-pointer justify-center rounded-xl bg-black px-2 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
              <span>{isPending ? "جاري الرفع..." : "رفع السيرة الذاتية"}</span>
              <Upload size={20}/>
          </label>
          <input
              id="cv"
              className="hidden"
              onChange={handleCVChange}
              accept="application/pdf"
              type="file"
          />
      </>

  );
};

export default UploadCVButton;
