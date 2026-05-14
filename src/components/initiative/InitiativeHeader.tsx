import NewInitiativeOverlay from "./NewInitiativeOverlay";
import type {FiltersType} from "./Filters.tsx";
import Filters from "./Filters.tsx";
import { getUserRole } from "../../lib/utils.ts";

interface InitiativeHeaderProps {
    onFiltersChange?: (filters: FiltersType) => void;
}

const InitiativeHeader = ({ onFiltersChange }: InitiativeHeaderProps) => {

    const userRole = getUserRole();

    return (
        <div className="flex w-full justify-start items-center gap-5 pl-10">
            {(userRole === "Admin" || userRole === "User") && (
                <NewInitiativeOverlay/>
            )}
            <Filters onFiltersChange={onFiltersChange} />
        </div>
    );
};

export default InitiativeHeader;