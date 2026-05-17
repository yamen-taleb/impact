import NewInitiativeOverlay from "./NewInitiativeOverlay";
import Filters from "./Filters.tsx";
import { getUserRole } from "../../lib/utils.ts";
import {useInitiativesContext} from "../../context/InitiativeContext.tsx";

const InitiativeHeader = () => {
    const {handleFiltersChange: onFiltersChange} = useInitiativesContext()
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