import NewInitiativeOverlay from "./NewInitiativeOverlay";
import Filters from "./Filters";
import userData from "../../data/userData.json";

const InitiativeHeader = () => {

    const userRole = userData.additionalInfo.role;

    return (
        <div className="flex w-full justify-start items-center gap-5 pl-10">
            {(userRole === "Admin" || userRole === "User") && (
                <NewInitiativeOverlay/>
            )}
            <Filters/>
        </div>
    );
};

export default InitiativeHeader;