import NewInitiativeOverlay from "./NewInitiativeOverlay";
import Filters from "./Filters";

const InitiativeHeader = () => {
    return (
        <div className="flex w-full justify-start items-center gap-5 pl-10">
            <NewInitiativeOverlay/>
            <Filters/>
        </div>
    );
};

export default InitiativeHeader;