import NewInitiativeOverlay from "./NewInitiativeOverlay";
import Filters, { type FiltersType } from "./Filters.tsx";
import { getUserRole } from "../../lib/utils.ts";
import { useGetMyUser } from "../../hooks/use-user.ts";
import { MessageSquareWarningIcon } from "lucide-react";
import { useNavigate } from "react-router";

interface InitiativeHeaderProps {
    onFiltersChange: (filters: FiltersType) => void;
}

const InitiativeHeader = ({ onFiltersChange }: InitiativeHeaderProps) => {
    const userRole = getUserRole();
    const currentUser = useGetMyUser().currentUser;

    const navigate = useNavigate();

    const isProfileIncomplete =
        !currentUser?.academicYear ||
        !currentUser?.birthdate ||
        !currentUser?.collegeName ||
        !currentUser?.description ||
        !currentUser?.location ||
        !currentUser?.phone ||
        !currentUser?.studentNumber;
    
    return (
        <div className="flex flex-col w-full justify-start items-center gap-5 pl-10">
            <div className="w-full flex flex-row gap-5">
                {(userRole === "Admin" || userRole === "User") && (!isProfileIncomplete) && (
                    <NewInitiativeOverlay/>
                )}

                <Filters onFiltersChange={onFiltersChange} />
            </div>

            {isProfileIncomplete && (
                <div className="flex h-[4rem] w-full flex-row items-center justify-center gap-5 rounded-xl bg-black text-white">
                    <MessageSquareWarningIcon />

                    <h1>
                    يجب عليك إكمال بيانات{" "}
                    
                    <span
                        className="cursor-pointer font-bold underline text-red-300 hover:text-red-500"
                        onClick={() => {
                            navigate(`/profile/${currentUser?.userId}`);
                        }}
                    >
                        حسابك الشخصي
                    </span>

                    {" "}لكي تتمكن من إنشاء مبادرة أو المشاركة في الأنشطة التطوعية
                    </h1>
                </div>
            )}
        </div>
    );
};

export default InitiativeHeader;