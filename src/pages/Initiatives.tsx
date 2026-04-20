import InitiativeHeader from "../components/initiative/InitiativeHeader";

const Initiatives = () => {



    return (
        <div className="flex flex-col gap-6 pr-10 mb-25">
            <InitiativeHeader/>



            {/* Render filteredInitiatives list/cards here */}
        </div>
    );
};

export default Initiatives;