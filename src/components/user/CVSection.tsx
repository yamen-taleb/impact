import { FileText } from "lucide-react";
import UploadCVButton from "./UploadCVButton.tsx";

interface Props {
    cvUrl?: string;
}

const CVSection = ({ cvUrl }: Props) => {
    return (
        <div className="w-full flex flex-row justify-between items-center gap-5 mt-10">
            {cvUrl && (
                <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white w-1/2 text-center h-1/2 px-4 py-[0.65rem] mt-5 rounded-xl hover:bg-zinc-800 flex flex-row justify-between items-center"
                >
                    <h3 className="text-sm">عرض السيرة الذاتية</h3>
                    <FileText />
                </a>
            )}
            <UploadCVButton/>
        </div>
    );
};

export default CVSection;
