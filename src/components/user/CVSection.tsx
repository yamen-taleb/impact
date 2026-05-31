import { FileText } from "lucide-react";
import UploadCVButton from "./UploadCVButton.tsx";

interface Props {
    cvUrl?: string;
    canEdit?: boolean;
}

const CVSection = ({ cvUrl, canEdit }: Props) => {
    console.log("CV URL:", cvUrl);
    return (
        <div className="flex flex-col gap-1 mt-1 items-center w-full">
            {cvUrl && (
                <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white mx-auto w-1/2 text-center px-2 py-[0.65rem] mt-5 rounded-xl hover:bg-zinc-800 flex flex-row justify-center gap-2 items-center"
                >
                    <h3 className="text-sm">عرض السيرة الذاتية</h3>
                    <FileText size={20} />
                </a>
            )}
            {canEdit && (
                <UploadCVButton/>
            )}
        </div>
    );
};

export default CVSection;
