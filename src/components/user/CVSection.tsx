import { FileText } from "lucide-react";
import UploadCVButton from "./UploadCVButton.tsx";

interface Props {
    cvUrl?: string;
}

const CVSection = ({ cvUrl }: Props) => {
    return (
        <div className="flex flex-col justify-center items-center mt-10">
            {cvUrl && (
                <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white w-full text-center px-4 py-2 rounded-lg hover:bg-zinc-800 hover:underline flex flex-row justify-between"
                >
                    <h3>عرض السيرة الذاتية</h3>
                    <FileText />
                </a>
            )}
            <UploadCVButton/>
        </div>
    );
};

export default CVSection;
